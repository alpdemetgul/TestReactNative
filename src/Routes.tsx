import Login from "./Login";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MainPage } from "./Main";
import { DefaultTheme  } from '@react-navigation/native';
import { useColorScheme,Button,Modal, View, Pressable, Alert, StyleSheet,Switch } from 'react-native';
import { useState } from 'react';
// import Icon from 'react-native-vector-icons/FontAwesome';





const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

export default function Routes() {

  const scheme = useColorScheme();
  const Stack = createNativeStackNavigator();
  console.log(scheme);
  const [modalVisible, setModalVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const toggleSwitch = () => setIsEnabled(previousState => !previousState);

  return (
    <>
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={Login} options={{
          headerRight: () => (
            <Button
              onPress={() =>setModalVisible(true) }
              title="Info"
              color="#fff"
            />
          ),
        }}   />
      <Stack.Screen name="MainPage" component={MainPage} />
    </Stack.Navigator>  
    <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert('Modal has been closed.');
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
          <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={toggleSwitch}
        value={isEnabled}
      />
      <Button title="Exit"  onPress={()=>setModalVisible(false)}/>
          </View>
        </View>
      </Modal>
    </>
    );
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
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
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });


