import React, { useRef, useState, useEffect } from 'react';
import { Camera } from 'expo-camera';
import { View, TouchableOpacity, Text, StyleSheet, Image } from 'react-native'; // Add this import
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';

const CameraComponent = ({ onCapture }) => {
    const cameraRef = useRef(null);
    const [isCameraReady, setCameraReady] = useState(false);
  
    const takePicture = async () => {
      if (cameraRef.current && isCameraReady) {
        try {
          const photo = await cameraRef.current.takePictureAsync();
          onCapture(photo.uri);
  
          // Save the photo to the app's directory
          const savedPhoto = await saveToAppDirectory(photo.uri);
  
          // Save the photo to the camera roll
          await saveToCameraRoll(savedPhoto.uri);
  
          // Notify the parent component about the saved photo
          onCapture(savedPhoto.uri);
        } catch (error) {
          console.error('Error taking picture:', error);
        }
      } else {
        console.warn("Camera is not ready yet. Wait for 'onCameraReady' callback.");
      }
      
    };

  const saveToAppDirectory = async (uri) => {
    const fileName = uri.split('/').pop();
    const appDirectory = FileSystem.documentDirectory + 'photos/';
    const filePath = appDirectory + fileName;

    await FileSystem.makeDirectoryAsync(appDirectory, { intermediates: true });

    // Copy the photo to the app's directory
    await FileSystem.copyAsync({ from: uri, to: filePath });

    return { uri: filePath };
  };

  const saveToCameraRoll = async (uri) => {
    try {
      await MediaLibrary.saveToLibraryAsync(uri);
      console.log('Photo saved to camera roll');
    } catch (error) {
      console.error('Error saving photo to camera roll:', error);
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      if (status === 'granted') {
        setCameraReady(true);
      }
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Camera
        ref={cameraRef}
        style={styles.camera}
        type={Camera.Constants.Type.back}
        onCameraReady={() => setCameraReady(true)}
      />
      <View style={styles.overlay}>
        <TouchableOpacity style={styles.captureButton} onPress={takePicture}>
          <Text style={styles.captureButtonText}>Capture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%', // Set explicit width
    height: '100%', // Set explicit height
  },
  overlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    padding: 20,
  },
  captureButton: {
    backgroundColor: 'transparent',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#fff',
    padding: 15,
    paddingHorizontal: 20,
  },
  captureButtonText: {
    fontSize: 16,
    color: '#fff',
  },
});

export default CameraComponent;
