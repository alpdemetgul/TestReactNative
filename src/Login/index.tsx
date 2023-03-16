import axios from "axios";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
} from "react-native";
import { SvgUri } from "react-native-svg";
import { useTheme } from "@react-navigation/native";

interface request {
  data: Object;
}

interface logState {
  username: String;
  password: String;
}

export default function Login({ navigation }) {
  const [loginFields, setLoginFields] = useState<logState>({
    username: "",
    password: "",
  });

  const { colors } = useTheme();
  const styles = makeStyles(colors);

  const handleSubmit = async () => {
    const config = {
      headers: {
        "App-Company": "GLC",
        "App-Branch": "MRK",
        "Accept-Language": "tr-TR",
        "Content-Type": "application/json",
        externalRequest: 1,
      },
    };

    axios
      .post(
        "https://colarxapi.gelecekvarlik.com.tr/api/auth/login",
        loginFields,
        config
      )
      .then((response: request) => {
        navigation.navigate("MainPage");

        console.log(response.data);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <SafeAreaView style={styles.container}>
      <SvgUri
        width={200}
        height={200}
        uri="https://www.gelecekvarlik.com.tr/slider/9443bd65dc8fd7623a5e54350fa31e41.svg"
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
        secureTextEntry
        style={styles.input}
        onChangeText={(text) =>
          setLoginFields({ ...loginFields, password: text })
        }
      />
      <StatusBar style="auto" />
      <Button title="Giris" color={colors.primary} onPress={handleSubmit} />
    </SafeAreaView>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
    },
    input: {
      height: 40,
      margin: 12,
      width: 300,
      borderWidth: 1,
      padding: 10,
      backgroundColor: colors.text,
      borderRadius: 50,
    },
    title: {
      fontSize: 30,
      color: colors.text,
      marginBottom: 40,
    },
    text: {
      color: colors.text,
    },
    textColor: { color: colors.primary, marginTop: 5 },
    logo: {
      width: 100,
      height: 100,
      marginBottom: 40,
    },
  });
