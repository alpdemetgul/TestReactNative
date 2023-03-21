import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Button } from "react-native";
import * as ScreenOrientation from "expo-screen-orientation";

export const Horizontal = () => {
  const foo = async () => {
    await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE_LEFT
    );
  };

  return (
    <View style={styles.container}>
      <Text style={{ paddingTop: 50 }}>
        Open up App.js to start working on your app!
      </Text>
      <Button title="Rotate" onPress={foo} />
      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#cccccc",
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
