import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as LocalAuthentication from 'expo-local-authentication';
import { useNavigation, useTheme } from '@react-navigation/native';

interface formData {
  username: String;
  password: String;
}

const BioLogin = () => {
  const [formData, setFormData] = useState<formData>({
    username: '',
    password: '',
  });
  const [user, setUser] = useState(null);
  const { navigate } = useNavigation();

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  useEffect(() => {
    (async () => {
      const loggedInUser = await AsyncStorage.getItem('user');
      if (loggedInUser !== null) setUser(JSON.parse(loggedInUser));
    })();
    console.log('render');
  }, []);

  const handle = async () => {
    try {
      const biometricAuth = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Login with Biometrics',
        disableDeviceFallback: true,
        cancelLabel: 'Cancel',
      });
      if (biometricAuth.success) {
        navigate('TestMain', { user: user });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (event: String, name: String) => {
    setFormData({ ...formData, [name]: event });
  };

  const saveAsync = async (formData: formData) => {
    try {
      const jsonValue = JSON.stringify(formData);
      await AsyncStorage.setItem('user', jsonValue);
      navigate('TestMain', { user: formData });
    } catch (e) {
      console.log(e);
    }
  };

  const logOut = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
  };

  return (
    <View style={styles.container}>
      {user !== null && (
        <>
          <Text style={styles.text}>
            Welcome to Gelecek Varlık {user?.username}
          </Text>
          <TouchableOpacity style={styles.button} onPress={handle}>
            <Text>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={logOut}>
            <Text>Log Out</Text>
          </TouchableOpacity>
        </>
      )}
      {user === null && (
        <>
          <View style={{ display: 'flex', gap: 20, width: '100%' }}>
            <View style={styles.usernameContainer}>
              <Text style={styles.label}>Username</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(e) => onChange(e, 'username')}
              />
            </View>
            <View style={styles.usernameContainer}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.textInput}
                onChangeText={(e) => onChange(e, 'password')}
                secureTextEntry
              />
            </View>
            <TouchableOpacity
              style={styles.button}
              onPress={() => saveAsync(formData)}
            >
              <Text style={[{ textAlign: 'center' }, styles.text]}>Login</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flex: 1,
      gap: 25,
      margin: 50,
    },
    button: {
      borderColor: 'orange',
      borderWidth: 2,
      backgroundColor: 'orange',
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 25,
    },
    usernameContainer: {
      width: '100%',
    },
    textInput: {
      borderWidth: 2,
      borderColor: 'orange',
      paddingHorizontal: 15,
      paddingVertical: 5,
      borderRadius: 15,
    },
    label: {
      marginLeft: 5,
    },
    text: {
      color: colors.text,
    },
  });

export default BioLogin;
