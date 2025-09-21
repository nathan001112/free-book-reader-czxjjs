
import { useState, useEffect } from 'react';
import { ReadingSettings } from '../types/Book';

const defaultSettings: ReadingSettings = {
  fontSize: 16,
  fontFamily: 'OpenSans_400Regular',
  lineHeight: 1.6,
  backgroundColor: '#ffffff',
  textColor: '#1f2937',
};

export const useReadingSettings = () => {
  const [settings, setSettings] = useState<ReadingSettings>(defaultSettings);

  const updateSettings = (newSettings: Partial<ReadingSettings>) => {
    setSettings(prev => ({ ...prev, ...newSettings }));
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
  };

  return {
    settings,
    updateSettings,
    resetSettings,
  };
};
