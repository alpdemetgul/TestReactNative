import { View, Text, TextInput } from 'react-native';
import React from 'react';

const Autofill = () => {
  return (
    <View
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
        margin: 50,
      }}
    >
      <TextInput
        textContentType='oneTimeCode'
        autoComplete='sms-otp'
        style={{
          borderWidth: 1,
          borderColor: 'black',
          backgroundColor: 'white',
          width: '100%',
        }}
      />
    </View>
  );
};

export default Autofill;
