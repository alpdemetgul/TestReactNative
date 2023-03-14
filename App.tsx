import axios from 'axios';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import {
  Alert,
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from 'react-native';
import { SvgUri } from 'react-native-svg';

export default function App() {
  const [loginFields, setLoginFields] = useState<Object>({
    username: '',
    password: '',
  });

  const handleSubmit = async () => {

    const config = {
      headers: {
        'App-Company': 'GLC',
        'App-Branch': 'MRK',
        'Accept-Language': 'tr-TR',
        'Content-Type': 'application/json',
        externalRequest: 1,
      },
    };

    axios
      .post(
        'https://colarxapi.gelecekvarlik.com.tr/api/auth/login',
        loginFields,
        config
      )
      .then((response:Object) => {
        console.log(response);
      })
      .catch((error) => console.log('zorttt', error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SvgUri
        width={200}
        height={200}
        uri='https://www.gelecekvarlik.com.tr/slider/9443bd65dc8fd7623a5e54350fa31e41.svg'
      />
      <Text style={styles.title}>Gelecek Varlık</Text>

      <Text style={styles.text}>Kullanıcı Adı:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) =>
          setLoginFields({ ...loginFields, username: text })
        }
      />
      <Text style={styles.text}>Şifre:</Text>
      <TextInput
        style={styles.input}
        onChangeText={(text) =>
          setLoginFields({ ...loginFields, password: text })
        }
      />
      <StatusBar style='auto' />
      <Button title='Enter' color='#f5a623' onPress={handleSubmit} />
      <Text
        style={styles.textColor}
        onPress={() => Alert.alert('Simple Button pressed')}
      >Sign Up!</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#575757',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    width: 300,
    borderWidth: 1,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
  },
  button: {},
  title: {
    fontSize: 30,
    color: '#fff',
    marginBottom: 40,
  },
  text: {
    color: '#fff',
  },
  textColor:{color:'#f5a623'},
  logo: {
    width: 100,
    height: 100,
    marginBottom: 40,
  },
});
