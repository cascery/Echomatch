import React from 'react';
import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; // Import LinearGradient

const SimilarSongsPage = ({ route }) => {
  const { similarTracks } = route.params; // Get similar tracks from params

  return (
    <View style={styles.container}>
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
        
        <ScrollView contentContainerStyle={styles.scrollViewContainer}>
          {similarTracks.map((track, index) => (
            <View key={index} style={styles.trackContainer}>
             
              <View style={styles.trackDetails}>
                <Image source={{ uri: track.albumImage }} style={styles.trackImage} />
                <View style={styles.textGroup}>
                  <Text style={styles.trackName}>{track.name}</Text>
                  <Text style={styles.trackArtist}>{track.artist}</Text>
                </View>
              </View>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  gridContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
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
  scrollViewContainer: {
    alignItems: 'center',
    paddingBottom: 20,
  },
  trackContainer: {
    backgroundColor: 'rgba(255, 228, 226, 0.9)', // Slightly transparent for overlay effect
    borderRadius: 20,
    borderWidth: 5,
    borderColor: '#ED83B5',
    padding: 16,
    marginVertical: 10,
    width: '80%', // Set width to 80% for consistency
  },
  iconHeader: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  butterflyIcon: {
    width: 30,
    height: 30,
  },
  trackDetails: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trackImage: {
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
  trackName: {
    fontSize: 16,
    fontFamily: 'YourFontName',
    padding: 3,
  },
  trackArtist: {
    fontSize: 16,
    color: '#555',
    fontFamily: 'YourFontName',
    padding: 3,
  },
});

export default SimilarSongsPage;
