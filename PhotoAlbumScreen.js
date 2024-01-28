// PhotoAlbumScreen.js
import React from 'react';
import { View, Text } from 'react-native';
import PhotoAlbum from './PhotoAlbum';

const PhotoAlbumScreen = ({ photos }) => {
  return (
    <View>
      <Text>Photo Album Screen</Text>
      <PhotoAlbum photos={photos} />
    </View>
  );
};

export default PhotoAlbumScreen;
