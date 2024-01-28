import React, { useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CameraComponent from './CameraComponent';
import FilteredImageView from './FilteredImageView';
import PhotoAlbumScreen from './PhotoAlbumScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const [capturedPhotos, setCapturedPhotos] = useState([]);
  const [isRetroFilterActive, setRetroFilterActive] = useState(false); 

  const handleCapture = (photoUri) => {
    const newPhoto = { id: capturedPhotos.length + 1, uri: photoUri };
    setCapturedPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
  };

  const toggleRetroFilter = () => {
    setRetroFilterActive((prevValue) => !prevValue);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="PhotoAlbum" options={{ title: 'Photo Album' }}>
          {() => <PhotoAlbumScreen photos={capturedPhotos} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );

  function HomeScreen({ navigation }) {
    return (
      <View style={styles.container}>
        <CameraComponent onCapture={handleCapture} />
        {capturedPhotos.length > 0 && (
          <View style={styles.filterContainer}>
            {isRetroFilterActive ? (
              <FilteredImageView filteredImage={capturedPhotos[capturedPhotos.length - 1].uri} />
            ) : (
              <Image source={{ uri: capturedPhotos[capturedPhotos.length - 1].uri }} style={styles.albumImage} />
            )}
          </View>
        )}
        <Button
          title="Toggle Retro Filter"
          onPress={toggleRetroFilter}
        />
        <Button
          title="View Photo Album"
          onPress={() => navigation.navigate('PhotoAlbum')}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  filterContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  albumImage: {
    width: 100,
    height: 100,
    marginRight: 10,
    borderRadius: 5,
  },
});
