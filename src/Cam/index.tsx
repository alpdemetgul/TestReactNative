import { CameraType, Camera } from 'expo-camera';
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, Image, Alert, Linking } from 'react-native';
import * as MediaLibrary from 'expo-media-library';
import CameraButton from './CameraButton';

const Cam = () => {
  const [hasCameraPermission, setHasCameraPermission] =
    useState<Boolean | null>(null);
  const [image, setImage] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [flash, setFlash] = useState(Camera.Constants.FlashMode.off);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      MediaLibrary.requestPermissionsAsync();
      const cameraStatus = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(cameraStatus.status === 'granted');
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef) {
      try {
        const data = await cameraRef.current.takePictureAsync();
        console.log(data);
        setImage(data.uri);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const saveImage = async () => {
    if (image) {
      try {
        await MediaLibrary.createAssetAsync(image);
        Alert.alert('Picture Saved.');
        setImage(null);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const _openAppSetting = useCallback(async () => {
    await Linking.openSettings();
  }, []);

  if (hasCameraPermission === false) {
    return (
      <View
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flex: 1,
        }}
      >
        <Text style={{ fontSize: 24, textAlign: 'center' }}>
          Go settings and allow to camera permissions.
        </Text>
        <View
          style={{
            backgroundColor: 'gray',
            borderRadius: 15,
            padding: 15,
            marginTop: 15,
          }}
        >
          <CameraButton
            title={`Go To Settings`}
            icon='folder'
            onPress={_openAppSetting}
          />
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!image && hasCameraPermission ? (
        <Camera
          style={styles.camera}
          type={type}
          flashMode={flash}
          ref={cameraRef}
          ratio='4:3'
        >
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
            }}
          >
            <CameraButton
              title={`Take a picture`}
              icon='camera'
              onPress={takePicture}
            />
          </View>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end',
              gap: 20,
            }}
          >
            <CameraButton
              icon='retweet'
              onPress={() => {
                setType(
                  type === CameraType.back ? CameraType.front : CameraType.back
                );
              }}
            />
            <CameraButton
              icon='flash'
              onPress={() => {
                setFlash(
                  flash === Camera.Constants.FlashMode.torch
                    ? Camera.Constants.FlashMode.on
                    : Camera.Constants.FlashMode.torch
                );
              }}
            />
          </View>
        </Camera>
      ) : (
        <View style={styles.imageContainer}>
          <Image source={{ uri: image }} style={styles.image} />
          <View style={styles.buttonContainer}>
            <CameraButton
              title={`Re-Take`}
              icon='retweet'
              onPress={() => setImage(null)}
            />
            <CameraButton title={`Save`} icon='check' onPress={saveImage} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  camera: {
    height: 500,
    display: 'flex',
    flexDirection: 'column-reverse',
  },
  image: {
    flex: 9,
  },
  imageContainer: {
    height: '100%',
    position: 'relative',
  },
  buttonContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
});

export default Cam;
