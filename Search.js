import React, { useContext, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, TextInput } from 'react-native';
import { FontContext } from './FontContext';

const Search = ({ onSearchResults }) => {
  const { fontLoaded } = useContext(FontContext);
  const [searchQuery, setSearchQuery] = useState('');

  // Make sure the font is loaded, else return null or a placeholder
  if (!fontLoaded) {
    return null; // Could replace this with a loading indicator like a spinner
  }

  const handleSearch = async () => {
    const apiUrl = `http://ws.audioscrobbler.com/2.0/?method=track.search&track=${encodeURIComponent(searchQuery)}&api_key=76945e9ce3e987bb4d1109d01f5679ef&format=json`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();

      if (data?.results?.trackmatches?.track) {
        const tracks = await Promise.all(
          data.results.trackmatches.track.map(async (track) => {
            const trackInfoUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=76945e9ce3e987bb4d1109d01f5679ef&artist=${encodeURIComponent(track.artist)}&track=${encodeURIComponent(track.name)}&format=json`;
            const trackInfoResponse = await fetch(trackInfoUrl);
            const trackInfoData = await trackInfoResponse.json();

            const albumImage = trackInfoData?.track?.album?.image?.[2]?.['#text'] || ''; // Check for the image

            return {
              name: track.name || 'Unknown Title', // Ensure valid fallback values
              artist: track.artist || 'Unknown Artist',
              url: track.url || '',
              albumImage, // Either the image or empty string
            };
          })
        );
        onSearchResults(tracks); // Pass results back
      } else {
        console.warn("No tracks found in the response.");
        onSearchResults([]); // Pass an empty array if no tracks found
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search..."
        value={searchQuery}
        onChangeText={setSearchQuery}
        style={styles.searchBar}
        placeholderTextColor="#888"
      />
      <TouchableOpacity style={styles.iconButton} onPress={handleSearch}>
        <Image source={require('./assets/butterfly.png')} style={styles.butterflyIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginTop:20
  },
  searchBar: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ED83B5',
    padding: 10,
    backgroundColor: '#fefff7',
    fontFamily: 'YourFontName', // Ensure this font is properly loaded in the FontContext
  },
  iconButton: {
    marginLeft: 10,
    padding: 3,
  },
  butterflyIcon: {
    width: 30,
    height: 30,
  },
});

export default Search;
