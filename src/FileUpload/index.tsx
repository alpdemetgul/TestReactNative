import * as MediaLibrary from "expo-media-library";
import React from "react";
import { Button, View } from "react-native";

export default function FileUpload() {
  const mediaLibraryAsync = async () => {
    let { status } = await MediaLibrary.requestPermissionsAsync();
    let media = await MediaLibrary.getAssetsAsync({
      mediaType: ["photo", "video"],
    });
    let video = await MediaLibrary.getAssetInfoAsync(media.assets[0]);

    console.log(video);
  };

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Button
        onPress={() => mediaLibraryAsync()}
        title="Do MediaLibrary Stuff"
      />
    </View>
  );
}
