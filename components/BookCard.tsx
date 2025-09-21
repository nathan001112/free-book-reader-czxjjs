
import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { Book } from '../types/Book';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface BookCardProps {
  book: Book;
  onPress: () => void;
}

const BookCard: React.FC<BookCardProps> = ({ book, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Image source={{ uri: book.coverImage }} style={styles.coverImage} />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>
          {book.title}
        </Text>
        <Text style={styles.author} numberOfLines={1}>
          by {book.author}
        </Text>
        <Text style={styles.description} numberOfLines={3}>
          {book.description}
        </Text>
        <View style={styles.footer}>
          <View style={styles.metadata}>
            <Icon name="time-outline" size={14} color={colors.textSecondary} />
            <Text style={styles.readingTime}>{book.readingTime} min</Text>
          </View>
          <View style={styles.difficulty}>
            <Text style={[styles.difficultyText, { 
              backgroundColor: book.difficulty === 'Beginner' ? colors.success : 
                              book.difficulty === 'Intermediate' ? colors.warning : colors.error 
            }]}>
              {book.difficulty}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.bookCard,
    flexDirection: 'row',
    width: '100%',
    marginHorizontal: 0,
  },
  coverImage: {
    width: 80,
    height: 120,
    borderRadius: 8,
    marginRight: 16,
  },
  content: {
    flex: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 4,
    fontFamily: 'OpenSans_600SemiBold',
  },
  author: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 8,
    fontFamily: 'OpenSans_400Regular',
  },
  description: {
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
    fontFamily: 'OpenSans_400Regular',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  metadata: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  readingTime: {
    fontSize: 12,
    color: colors.textSecondary,
    marginLeft: 4,
    fontFamily: 'OpenSans_400Regular',
  },
  difficulty: {
    alignItems: 'flex-end',
  },
  difficultyText: {
    fontSize: 10,
    color: colors.background,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
});

export default BookCard;
