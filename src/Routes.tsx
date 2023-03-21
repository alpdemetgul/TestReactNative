import Login from './Login';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainPage } from './Main';
import { useTheme } from '@react-navigation/native';
import {
  useColorScheme,
  Button,
  Modal,
  View,
  Alert,
  StyleSheet,
  Switch,
} from "react-native";
import { useState } from "react";
import Home from "./Home";
import Mic from "./Mic";
import FileUpload from "./FileUpload";
import Share from "./Share";
import Cam from "./Cam";
import Location from "./Location";
import { CopyText } from "./CopyText";
import { Horizontal } from "./Horizontal";
import { Auth } from "./Auth";
import { LinkingTest } from "./Linking/Linking";
} from 'react-native';
import { useState } from 'react';
import Home from './Home';
import Mic from './Mic';
import FileUpload from './FileUpload';
import Share from './Share';
import Cam from './Cam';
import Location from './Location';
import { CopyText } from './CopyText';
import Autofill from './Autofill';
import Mail from './Mail';
import RememberMe from './RememberMe';

export default function Routes() {
  const scheme = useColorScheme();
  const { colors } = useTheme();
  const styles = makeStyles(colors);
  const Stack = createNativeStackNavigator();
  console.log(scheme);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} />
        <Stack.Screen name='Camera' component={Cam} />
        <Stack.Screen name='Mic' component={Mic} />
        <Stack.Screen name='FileUpload' component={FileUpload} />
        <Stack.Screen name='Share' component={Share} />
        <Stack.Screen name='Location' component={Location} />
        <Stack.Screen name='CopyText' component={CopyText} />
        <Stack.Screen name='Autofill' component={Autofill} />
        <Stack.Screen name='RememberMe' component={RememberMe} />
        <Stack.Screen name="Horizontal" component={Horizontal} />
        <Stack.Screen name="Auth" component={Auth} />
        <Stack.Screen name="LinkingTest" component={LinkingTest} />

        {/* <Stack.Screen
          name="Login"
          component={Login}
          options={{
            headerRight: () => (
              <Icon
                onPress={() => setModalVisible(true)}
                name="cog"
                style={styles.text}
                size={18}
              />
            ),
          }}
        />
        <Stack.Screen name="MainPage" component={MainPage} /> */}
      </Stack.Navigator>
      {/* <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Switch
              trackColor={{ false: "#767577", true: "#81b0ff" }}
              thumbColor={isEnabled ? "#f5a623" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
            />

            <Button
              title="Exit"
              // color="primary"
              onPress={() => setModalVisible(false)}
            />
          </View>
        </View>
      </Modal> */}
    </>
  );
}

const makeStyles = (colors: any) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: colors.background,
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    text: { color: colors.text },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });
