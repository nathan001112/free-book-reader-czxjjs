
import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles } from '../../styles/commonStyles';
import { useBooks } from '../../hooks/useBooks';
import { useReadingSettings } from '../../hooks/useReadingSettings';
import ReadingSettingsSheet from '../../components/ReadingSettingsSheet';
import Icon from '../../components/Icon';
import { Book } from '../../types/Book';

const { width } = Dimensions.get('window');

export default function BookReaderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { getBookById } = useBooks();
  const { settings, updateSettings } = useReadingSettings();
  const [book, setBook] = useState<Book | null>(null);
  const [isSettingsVisible, setIsSettingsVisible] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (id) {
      const foundBook = getBookById(id);
      if (foundBook) {
        setBook(foundBook);
        console.log('Loaded book:', foundBook.title);
      } else {
        console.log('Book not found:', id);
        router.back();
      }
    }
  }, [id]);

  if (!book) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.content, { justifyContent: 'center' }]}>
          <Text style={commonStyles.text}>Loading book...</Text>
        </View>
      </SafeAreaView>
    );
  }

  // Split content into pages (approximate)
  const wordsPerPage = 300;
  const words = book.content.split(' ');
  const totalPages = Math.ceil(words.length / wordsPerPage);
  
  const getPageContent = (pageNumber: number) => {
    const startIndex = (pageNumber - 1) * wordsPerPage;
    const endIndex = startIndex + wordsPerPage;
    return words.slice(startIndex, endIndex).join(' ');
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const pageContent = getPageContent(currentPage);

  return (
    <View style={[styles.container, { backgroundColor: settings.backgroundColor }]}>
      <SafeAreaView style={{ flex: 1 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => router.back()}
          >
            <Icon name="arrow-back" size={24} color={colors.text} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {book.title}
            </Text>
            <Text style={styles.headerSubtitle}>
              Page {currentPage} of {totalPages}
            </Text>
          </View>

          <TouchableOpacity
            style={styles.headerButton}
            onPress={() => setIsSettingsVisible(true)}
          >
            <Icon name="settings-outline" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        {/* Reading Content */}
        <ScrollView
          style={styles.contentContainer}
          contentContainerStyle={styles.contentPadding}
          showsVerticalScrollIndicator={false}
        >
          <Text
            style={[
              styles.bookContent,
              {
                fontSize: settings.fontSize,
                lineHeight: settings.fontSize * settings.lineHeight,
                color: settings.textColor,
                fontFamily: settings.fontFamily,
              },
            ]}
          >
            {pageContent}
          </Text>
        </ScrollView>

        {/* Navigation Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[styles.navButton, currentPage === 1 && styles.navButtonDisabled]}
            onPress={goToPreviousPage}
            disabled={currentPage === 1}
          >
            <Icon 
              name="chevron-back" 
              size={20} 
              color={currentPage === 1 ? colors.textSecondary : colors.text} 
            />
            <Text style={[
              styles.navButtonText,
              currentPage === 1 && styles.navButtonTextDisabled
            ]}>
              Previous
            </Text>
          </TouchableOpacity>

          <View style={styles.progressContainer}>
            <View style={styles.progressBar}>
              <View 
                style={[
                  styles.progressFill, 
                  { width: `${(currentPage / totalPages) * 100}%` }
                ]} 
              />
            </View>
          </View>

          <TouchableOpacity
            style={[styles.navButton, currentPage === totalPages && styles.navButtonDisabled]}
            onPress={goToNextPage}
            disabled={currentPage === totalPages}
          >
            <Text style={[
              styles.navButtonText,
              currentPage === totalPages && styles.navButtonTextDisabled
            ]}>
              Next
            </Text>
            <Icon 
              name="chevron-forward" 
              size={20} 
              color={currentPage === totalPages ? colors.textSecondary : colors.text} 
            />
          </TouchableOpacity>
        </View>

        {/* Reading Settings Sheet */}
        <ReadingSettingsSheet
          isVisible={isSettingsVisible}
          onClose={() => setIsSettingsVisible(false)}
          settings={settings}
          onUpdateSettings={updateSettings}
        />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundAlt,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 16,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    fontFamily: 'OpenSans_600SemiBold',
  },
  headerSubtitle: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
    fontFamily: 'OpenSans_400Regular',
  },
  contentContainer: {
    flex: 1,
  },
  contentPadding: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  bookContent: {
    textAlign: 'left',
    fontFamily: 'OpenSans_400Regular',
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.text,
    marginHorizontal: 4,
    fontFamily: 'OpenSans_500Medium',
  },
  navButtonTextDisabled: {
    color: colors.textSecondary,
  },
  progressContainer: {
    flex: 1,
    marginHorizontal: 20,
  },
  progressBar: {
    height: 4,
    backgroundColor: colors.backgroundAlt,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: colors.primary,
    borderRadius: 2,
  },
});
