import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

const PhotoAlbum = ({ photos }) => {
  return (
    <View style={styles.albumContainer}>
      <Text style={styles.albumTitle}>Photo Album</Text>
      <FlatList
        data={photos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.imageContainer}>
            <Image source={{ uri: item.uri }} style={styles.albumImage} />
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  albumContainer: {
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  albumTitle: {
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
    alignItems: 'flex-end', 
  },
  albumImage: {
    width: 100,
    height: 100,
    borderRadius: 5,
  },
});

export default PhotoAlbum;
