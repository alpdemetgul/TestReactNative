import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface formData {
  username: String;
  password: String;
}

const RememberMe = () => {
  const [formData, setFormData] = useState<formData>({
    username: '',
    password: '',
  });
  const [rememberBe, setRememberMe] = useState<Boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

  const mockData = {
    username: 'testUser',
    password: 'Test1234',
  };

  const validate = (formData: formData) => {
    if (
      formData.username === mockData.username &&
      formData.password === mockData.password
    ) {
      return true;
    }
    return false;
  };

  const saveAsync = async (formData: formData) => {
    try {
      const jsonValue = JSON.stringify(formData);
      await AsyncStorage.setItem('user', jsonValue);
    } catch (e) {
      console.log(e);
    }
  };

  const getAsyncData = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      if (user !== null) {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const onChange = (event: String, name: String) => {
    setFormData({ ...formData, [name]: event });
  };

  const loggedOut = async () => {
    try {
      await AsyncStorage.removeItem('user');
      setIsLoggedIn(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = () => {
    if (validate(formData)) {
      Alert.alert('Logged In');
      if (rememberBe) {
        saveAsync(formData);
      }
      setIsLoggedIn(true);
    } else {
      Alert.alert('Wrong username or password.');
    }
  };

  useEffect(() => {
    getAsyncData();
  }, [isLoggedIn]);

  return (
    <View style={styles.container}>
      {isLoggedIn ? (
        <View style={{ display: 'flex', justifyContent: 'center', gap: 20 }}>
          <Text style={{ textAlign: 'center' }}>User logged in.</Text>
          <TouchableOpacity style={styles.button} onPress={loggedOut}>
            <Text style={{ textAlign: 'center' }}>Log Out</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={{ display: 'flex', gap: 20 }}>
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
          <View style={styles.checkbox}>
            <Text>Remember Me</Text>
            <Checkbox
              value={rememberBe}
              onValueChange={setRememberMe}
              style={styles.checkbox}
              color='orange'
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={{ textAlign: 'center' }}>Login</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    padding: 50,
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
  button: {
    backgroundColor: 'orange',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  checkbox: {
    display: 'flex',
    flexDirection: 'row-reverse',
    justifyContent: 'center',
    gap: 20,
  },
});

export default RememberMe;
