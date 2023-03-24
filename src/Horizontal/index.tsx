import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";
import { useEffect, useState } from "react";
export const Horizontal = () => {
  const [orientation, setOrientation] = useState<String | null>(null);
  useEffect(() => {
    checkOrientation();
    const subscription = ScreenOrientation.addOrientationChangeListener(
      handleOrientationChange
    );
    return () => {
      ScreenOrientation.removeOrientationChangeListeners(subscription);
    };
  }, []);
  const checkOrientation = async () => {
    const orientation = await ScreenOrientation.getOrientationAsync();
    setOrientation(orientation);
  };
  const changeOrientation = async (newOrientation) => {
    console.log("newOrientation: ", newOrientation);
    await ScreenOrientation.lockAsync(newOrientation);
  };
  const handleOrientationChange = (o) => {
    setOrientation(o.orientationInfo.orientation);
  };
  console.log(orientation);
  return (
    <View style={styles.container}>
      <Text>ORIENTATION: {orientation}</Text>
      <TouchableOpacity
        style={[styles.btn, { marginTop: 15 }]}
        onPress={() =>
          changeOrientation(ScreenOrientation.OrientationLock.PORTRAIT_UP)
        }
      >
        <Text style={styles.txt}>Tap to Portrait orientation</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.btn}
        onPress={() =>
          changeOrientation(ScreenOrientation.OrientationLock.LANDSCAPE_RIGHT)
        }
      >
        <Text style={styles.txt}>Tap to Landscape orientation</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  btn: {
    padding: 10,
  },
  txt: {
    fontSize: 16,
    color: "blue",
  },
});
