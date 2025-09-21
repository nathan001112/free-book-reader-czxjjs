
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  value, 
  onChangeText, 
  placeholder = "Search books, authors, topics...",
  onClear 
}) => {
  return (
    <View style={commonStyles.searchContainer}>
      <Icon name="search-outline" size={20} color={colors.textSecondary} />
      <TextInput
        style={commonStyles.searchInput}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textSecondary}
      />
      {value.length > 0 && onClear && (
        <TouchableOpacity onPress={onClear}>
          <Icon name="close-circle" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default SearchBar;
