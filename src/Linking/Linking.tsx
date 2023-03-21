import React from "react";
import { Pressable, View, StyleSheet, Platform, Text } from "react-native";
import * as Linking from "expo-linking";

export const LinkingTest = () => {
  const handlePress = () => {
    return Linking.openURL(
      Platform.OS === `android` ? "tel:05394245176" : "telprompt:05394245176"
    );
  };
  const handlePress1 = () => {
    return Linking.openURL("mailto://alpdemetgul@hotmail.com");
  };
  return (
    <View style={styles.container}>
      <Pressable onPress={() => handlePress()} style={styles.button}>
        <Text>Telephone </Text>
      </Pressable>
      <Pressable onPress={() => handlePress1()} style={styles.button}>
        <Text>Mail </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginVertical: 10,
    marginTop: 10,
  },
});
