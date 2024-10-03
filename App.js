import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { FontProvider } from './FontContext';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Container from './Container';
import Search from './Search';
import SimilarSongsPage from './SimilarSongsScreen';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const Stack = createStackNavigator();

export default function App() {
  const [searchResults, setSearchResults] = useState([]);

  const handleSearchResults = (results) => {
    setSearchResults(results);
  };

  return (
    <FontProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {() => (
              <KeyboardAvoidingView 
                style={styles.container} 
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Handle keyboard avoidance
                keyboardVerticalOffset={Platform.OS === 'ios' ? 40 : 0} // Adjust as needed
              >
                <View style={styles.backgroundContainer}>
                  <LinearGradient
                    colors={['#fefff7', '#fefff7']} // Beige background color
                    style={styles.background}
                  >
                    <View style={styles.gridContainer}>
                      {/* Generating horizontal lines */}
                      {Array.from({ length: 40 }).map((_, rowIndex) => (
                        <View key={rowIndex} style={styles.gridRow}>
                          {/* Generating vertical lines */}
                          {Array.from({ length: 40 }).map((_, colIndex) => (
                            <View key={colIndex} style={styles.gridCell} />
                          ))}
                        </View>
                      ))}
                    </View>
                  </LinearGradient>
                </View>

                <Search onSearchResults={handleSearchResults} />
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                  <Container searchResults={searchResults} />
                </ScrollView>
              </KeyboardAvoidingView>
            )}
          </Stack.Screen>

          <Stack.Screen
            name="Similar songs :"
            component={SimilarSongsPage}
            options={{
              headerStyle: styles.headerStyle,
              headerTitleStyle: styles.headerTitleStyle,
              headerTintColor: '#763F2D',
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      <StatusBar style="auto" />
    </FontProvider>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: '#FFE4E2',
    elevation: 0,
    shadowOpacity: 0,
  },
  headerTitleStyle: {
    fontSize: 20,
    fontFamily: 'YourFontName',
    color: '#763F2D',
  },
  container: {
    flex: 1,
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  background: {
    flex: 1,
    backgroundColor: '#f4f4f4', // Beige color
  },
  gridContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  gridCell: {
    width: '5%', // Adjust width for grid cells
    height: 20, // Adjust height for grid cells
    borderColor: '#D3D3D3', // Light gray for grid lines
    borderWidth: 1,
  },
});
