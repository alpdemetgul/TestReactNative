import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const Home = ({ navigation: { navigate } }) => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        gap: 10,
        marginHorizontal: 50,
      }}
    >
      <Button title='Camera' onPress={() => navigate('Camera')} />
      <Button title='Mic' onPress={() => navigate('Mic')} />
      <Button title='FileUpload' onPress={() => navigate('FileUpload')} />
      <Button title='Share' onPress={() => navigate('Share')} />
      <Button title='Location' onPress={() => navigate('Location')} />
    </View>
  );
};

export default Home;
