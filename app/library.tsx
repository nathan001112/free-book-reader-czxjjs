
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import Icon from '../components/Icon';

export default function LibraryScreen() {
  const { books } = useBooks();
  const [activeTab, setActiveTab] = useState<'all' | 'reading' | 'completed'>('all');

  // For demo purposes, we'll simulate some reading progress
  const readingBooks = books.slice(0, 2);
  const completedBooks = books.slice(2, 4);

  const getDisplayBooks = () => {
    switch (activeTab) {
      case 'reading':
        return readingBooks;
      case 'completed':
        return completedBooks;
      default:
        return books;
    }
  };

  const handleBookPress = (bookId: string) => {
    console.log('Opening book from library:', bookId);
    router.push(`/book/${bookId}`);
  };

  const displayBooks = getDisplayBooks();

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          <Text style={commonStyles.title}>My Library</Text>
          <View style={{ width: 44 }} />
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'all' && styles.activeTab]}
            onPress={() => setActiveTab('all')}
          >
            <Text style={[styles.tabText, activeTab === 'all' && styles.activeTabText]}>
              All Books ({books.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'reading' && styles.activeTab]}
            onPress={() => setActiveTab('reading')}
          >
            <Text style={[styles.tabText, activeTab === 'reading' && styles.activeTabText]}>
              Reading ({readingBooks.length})
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, activeTab === 'completed' && styles.activeTabText]}>
              Completed ({completedBooks.length})
            </Text>
          </TouchableOpacity>
        </View>

        {/* Books List */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {displayBooks.length === 0 ? (
            <View style={styles.emptyState}>
              <Icon name="library-outline" size={64} color={colors.textSecondary} />
              <Text style={[commonStyles.subtitle, { marginTop: 16, textAlign: 'center' }]}>
                {activeTab === 'reading' ? 'No books in progress' :
                 activeTab === 'completed' ? 'No completed books' :
                 'No books in library'}
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
                {activeTab === 'all' ? 'Start reading to build your library' :
                 'Books will appear here as you read them'}
              </Text>
            </View>
          ) : (
            displayBooks.map((book) => (
              <BookCard
                key={book.id}
                book={book}
                onPress={() => handleBookPress(book.id)}
              />
            ))
          )}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginHorizontal: 4,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: colors.primary,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    fontFamily: 'OpenSans_500Medium',
  },
  activeTabText: {
    color: colors.background,
  },
  emptyState: {
    alignItems: 'center',
    marginTop: 60,
  },
});
