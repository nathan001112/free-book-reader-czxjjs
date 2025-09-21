
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { useBooks } from '../hooks/useBooks';
import BookCard from '../components/BookCard';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import Icon from '../components/Icon';
import { useFonts, OpenSans_400Regular, OpenSans_500Medium, OpenSans_600SemiBold, OpenSans_700Bold } from '@expo-google-fonts/open-sans';

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const { books, loading, searchBooks } = useBooks();
  
  let [fontsLoaded] = useFonts({
    OpenSans_400Regular,
    OpenSans_500Medium,
    OpenSans_600SemiBold,
    OpenSans_700Bold,
  });

  const filteredBooks = searchBooks(searchQuery, selectedCategory);

  const handleBookPress = (bookId: string) => {
    console.log('Opening book:', bookId);
    router.push(`/book/${bookId}`);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  if (!fontsLoaded || loading) {
    return (
      <SafeAreaView style={commonStyles.container}>
        <View style={[commonStyles.content, { justifyContent: 'center' }]}>
          <ActivityIndicator size="large" color={colors.primary} />
          <Text style={[commonStyles.text, { marginTop: 16 }]}>
            Loading books...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={commonStyles.container}>
      <View style={{ flex: 1 }}>
        {/* Header */}
        <View style={{ paddingHorizontal: 20, paddingTop: 20, paddingBottom: 10 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <View>
              <Text style={commonStyles.title}>BookReader</Text>
              <Text style={commonStyles.textSecondary}>
                Discover free educational books
              </Text>
            </View>
            <TouchableOpacity
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: colors.backgroundAlt,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => router.push('/library')}
            >
              <Icon name="library-outline" size={24} color={colors.text} />
            </TouchableOpacity>
          </View>
        </View>

        {/* Search */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onClear={clearSearch}
        />

        {/* Category Filter */}
        <CategoryFilter
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Books List */}
        <ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 20 }}
          showsVerticalScrollIndicator={false}
        >
          {filteredBooks.length === 0 ? (
            <View style={{ alignItems: 'center', marginTop: 40 }}>
              <Icon name="book-outline" size={64} color={colors.textSecondary} />
              <Text style={[commonStyles.subtitle, { marginTop: 16, textAlign: 'center' }]}>
                No books found
              </Text>
              <Text style={[commonStyles.textSecondary, { textAlign: 'center', marginTop: 8 }]}>
                Try adjusting your search or category filter
              </Text>
            </View>
          ) : (
            filteredBooks.map((book) => (
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
