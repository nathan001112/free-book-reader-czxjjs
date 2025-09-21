
import React from 'react';
import { ScrollView, TouchableOpacity, Text } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { categories } from '../data/booksData';

interface CategoryFilterProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({ 
  selectedCategory, 
  onSelectCategory 
}) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 20, paddingVertical: 8 }}
    >
      {categories.map((category) => {
        const isSelected = selectedCategory === category;
        return (
          <TouchableOpacity
            key={category}
            style={[
              commonStyles.categoryChip,
              isSelected && commonStyles.categoryChipActive,
            ]}
            onPress={() => onSelectCategory(category)}
          >
            <Text
              style={[
                commonStyles.categoryText,
                isSelected && commonStyles.categoryTextActive,
              ]}
            >
              {category}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
};

export default CategoryFilter;
