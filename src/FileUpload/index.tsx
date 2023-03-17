// ...rest of the import statements remain unchanged

import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as DocumentPicker from "expo-document-picker";
import { View, Image, StyleSheet, StatusBar } from "react-native";
import Button from "./Button";

export default function FileUpload() {
  const [selectedImage, setSelectedImage] = useState(null);

  function ImageViewer({ selectedImage }: Object) {
    const imageSource =
      selectedImage !== null
        ? { uri: selectedImage }
        : {
            uri: "https://blog.petibom.com/wp-content/uploads/2021/12/shar-pei-kopegi.jpg",
          };

    return <Image source={imageSource} style={styles1.image} />;
  }

  const styles1 = StyleSheet.create({
    image: {
      width: 320,
      height: 440,
      borderRadius: 18,
    },
  });

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    } else {
      alert("You did not select any image.");
    }
  };

  const pickFileAsync = async () => {
    let result = await DocumentPicker.getDocumentAsync({});
    alert(result.uri);
    console.log(result);
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          //placeholderImageSource={PlaceholderImage}
          selectedImage={selectedImage}
        />
      </View>
      <View style={styles.footerContainer}>
        <Button
          theme="primary"
          label="Choose a photo"
          onPress={pickImageAsync}
        />
        <Button theme="primary" label="Choose a file" onPress={pickFileAsync} />
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  imageContainer: {
    flex: 1,
    paddingTop: 58,
  },
  footerContainer: {
    flex: 1 / 2,
    alignItems: "center",
  },
});
