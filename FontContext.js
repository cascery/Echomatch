import React, { createContext, useState, useEffect } from 'react';
import * as Font from 'expo-font';

export const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [fontLoaded, setFontLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'YourFontName': require('./assets/fonts/NunitoHeavy-Regular.ttf'),
      });
      setFontLoaded(true);
    };

    loadFonts();
  }, []);

  return (
    <FontContext.Provider value={{ fontLoaded }}>
      {children}
    </FontContext.Provider>
  );
};
