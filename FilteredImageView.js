// FilteredImageView.js
import React from 'react';
import RetroFilter from './RetroFilter';
import { Image, StyleSheet } from 'react-native';


const FilteredImageView = ({ filteredImage }) => {
  return (
    <RetroFilter>
      <Image source={{ uri: filteredImage }} style={styles.albumImage} />
    </RetroFilter>
  );
};

const styles = StyleSheet.create({
  albumImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default FilteredImageView;
