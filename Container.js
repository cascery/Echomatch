import React from 'react';
import { StyleSheet, View, ScrollView, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get('window'); // Get screen width

const Container = ({ searchResults = [] }) => {
  const navigation = useNavigation();
  const containerWidth = width * 0.8; // Set container width to 80% of screen width

  const handlePress = async (song) => {
    const { name, artist } = song;

    // Fetch similar songs from Last.fm API
    const similarSongsUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getsimilar&api_key=76945e9ce3e987bb4d1109d01f5679ef&artist=${encodeURIComponent(artist)}&track=${encodeURIComponent(name)}&format=json`;

    try {
      const response = await fetch(similarSongsUrl);
      const data = await response.json();

      if (data?.similartracks?.track) {
        const similarTracks = await Promise.all(
          data.similartracks.track.map(async (track) => {
            const trackInfoUrl = `http://ws.audioscrobbler.com/2.0/?method=track.getInfo&api_key=76945e9ce3e987bb4d1109d01f5679ef&artist=${encodeURIComponent(track.artist.name)}&track=${encodeURIComponent(track.name)}&format=json`;
            const trackInfoResponse = await fetch(trackInfoUrl);
            const trackInfoData = await trackInfoResponse.json();

            const albumImage = trackInfoData?.track?.album?.image?.[2]?.['#text'] || ''; // Check for the image

            return {
              name: track.name || 'Unknown Title',
              artist: track.artist?.name || 'Unknown Artist',
              albumImage, // Use the fetched album image
            };
          })
        );

        // Navigate to the SimilarSongsPage with the similar tracks
        navigation.navigate('Similar songs :', { similarTracks });
      }
    } catch (error) {
      console.error('Error fetching similar songs:', error);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <ScrollView
        contentContainerStyle={styles.scrollViewContainer}
        style={styles.scrollView}
      >
        {searchResults.length > 0 ? (
          searchResults.map((song, index) => {
            const songName = song.name || 'Unknown Song';
            const songArtist = song.artist || 'Unknown Artist';
            const albumImage = song.albumImage && song.albumImage !== '' 
              ? { uri: song.albumImage } 
              : { uri: 'https://lastfm.freetls.fastly.net/i/u/300x300/2a96cbd8b46e442fc41c2b86b821562f.png' }; // Fallback image
            
            console.log(`Rendering song: ${songName}, artist: ${songArtist}, albumImage: ${albumImage.uri || 'local image'}`);

            return (
              <TouchableOpacity key={index} onPress={() => handlePress(song)}>
                <View style={[styles.container, { width: containerWidth }]}>
                  <View style={styles.iconHeader}>
                    <Image source={require('./assets/butterfly.png')} style={styles.butterflyIcon} />
                    <Text style={styles.titleText}>Similar to: </Text>
                  </View>
                  <View style={styles.songDetails}>
                    <Image
                      source={albumImage} // Correctly pass the image source
                      style={styles.songImage}
                    />
                    <View style={styles.textGroup}>
                      <Text style={styles.songTitle}>{songName}</Text>
                      <Text style={styles.songArtist}>{songArtist}</Text>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          <Text style={styles.noResultsText}>No results found. Please search for a song.</Text>
        )}
        <View style={styles.extra}></View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  extra: {
    height: 30
  },
  outerContainer: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  scrollViewContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  container: {
    backgroundColor: '#FFE4E2',
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#ED83B5',
    padding: 16,
    marginVertical: 10,
  },
  iconHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  butterflyIcon: {
    width: 30,
    height: 30,
  },
  titleText: {
    fontSize: 18,
    fontFamily: 'YourFontName',
    paddingLeft: 20,
    color: '#763F2D',
  },
  songDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  songImage: {
    width: 60,
    height: 60,
    borderRadius: 10,
    borderWidth: 3,
    borderColor: '#ED83B5',
    marginRight: 10,
  },
  textGroup: {
    flex: 1,
  },
  songTitle: {
    fontSize: 16,
    fontFamily: 'YourFontName',
    padding: 3,
  },
  songArtist: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'YourFontName',
    padding: 3,
  },
  noResultsText: {
    fontSize: 16,
    color: '#555',
    padding: 20,
    fontFamily: 'YourFontName',
  },
});

export default Container;
