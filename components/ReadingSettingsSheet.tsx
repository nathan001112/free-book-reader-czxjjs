
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
import { ReadingSettings } from '../types/Book';
import SimpleBottomSheet from './BottomSheet';
import Icon from './Icon';

interface ReadingSettingsSheetProps {
  isVisible: boolean;
  onClose: () => void;
  settings: ReadingSettings;
  onUpdateSettings: (settings: Partial<ReadingSettings>) => void;
}

const ReadingSettingsSheet: React.FC<ReadingSettingsSheetProps> = ({
  isVisible,
  onClose,
  settings,
  onUpdateSettings,
}) => {
  const fontSizes = [12, 14, 16, 18, 20, 22, 24];
  const themes = [
    { name: 'Light', backgroundColor: '#ffffff', textColor: '#1f2937' },
    { name: 'Sepia', backgroundColor: '#f7f3e9', textColor: '#5d4e37' },
    { name: 'Dark', backgroundColor: '#1f2937', textColor: '#f9fafb' },
  ];

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={commonStyles.subtitle}>Reading Settings</Text>
          <TouchableOpacity onPress={onClose}>
            <Icon name="close" size={24} color={colors.text} />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Font Size</Text>
          <View style={styles.fontSizeContainer}>
            {fontSizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[
                  styles.fontSizeButton,
                  settings.fontSize === size && styles.fontSizeButtonActive,
                ]}
                onPress={() => onUpdateSettings({ fontSize: size })}
              >
                <Text
                  style={[
                    styles.fontSizeText,
                    settings.fontSize === size && styles.fontSizeTextActive,
                    { fontSize: size > 18 ? 16 : size },
                  ]}
                >
                  Aa
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Theme</Text>
          <View style={styles.themeContainer}>
            {themes.map((theme) => (
              <TouchableOpacity
                key={theme.name}
                style={[
                  styles.themeButton,
                  { backgroundColor: theme.backgroundColor },
                  settings.backgroundColor === theme.backgroundColor && styles.themeButtonActive,
                ]}
                onPress={() => onUpdateSettings({ 
                  backgroundColor: theme.backgroundColor, 
                  textColor: theme.textColor 
                })}
              >
                <Text style={[styles.themeText, { color: theme.textColor }]}>
                  {theme.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </SimpleBottomSheet>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 12,
    fontFamily: 'OpenSans_600SemiBold',
  },
  fontSizeContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  fontSizeButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.backgroundAlt,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fontSizeButtonActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  fontSizeText: {
    fontWeight: '600',
    color: colors.text,
  },
  fontSizeTextActive: {
    color: colors.background,
  },
  themeContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  themeButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
  },
  themeButtonActive: {
    borderColor: colors.primary,
  },
  themeText: {
    fontSize: 14,
    fontWeight: '600',
    fontFamily: 'OpenSans_600SemiBold',
  },
});

export default ReadingSettingsSheet;
