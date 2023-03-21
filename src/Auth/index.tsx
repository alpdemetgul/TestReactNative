import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import * as LocalAuthentication from "expo-local-authentication";

export const Auth = () => {
  const [isBiometricSupported, setIsBiometricSupported] = React.useState(false);
  const [fingerprint, setFingerprint] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
      const enroll = await LocalAuthentication.isEnrolledAsync();
      if (enroll) {
        setFingerprint(true);
      }
    })();
  }, []);

  const handle = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: "Login with Biometrics",
        disableDeviceFallback: true,
        cancelLabel: "Cancel",
      });
      if (biometricAuth.success) {
        console.log("zort");
      }
    } catch (error) {
      console.log(error);
    }
  };

  console.log(isBiometricSupported);

  return (
    <View style={styles.start}>
      <View style={{ justifyContent: "center", flex: 1, alignItems: "center" }}>
        {isBiometricSupported && fingerprint ? (
          <TouchableOpacity onPress={handle}>
            <Text style={styles.button}>Go to home</Text>
          </TouchableOpacity>
        ) : (
          <View>
            <Text>fingerprint not supported/ allocated</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  heading: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    alignItems: "center",
    justifyContent: "center",
  },
  headingtext: {
    fontSize: 40,
  },
  start: {
    flex: 1,
    color: "black",
    backgroundColor: "#FFDFD3",
  },
  button: {
    borderColor: "grey",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 20,
  },
});
