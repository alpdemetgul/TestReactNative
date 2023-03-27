import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { useRoute, useTheme } from '@react-navigation/native';
const TestMain = () => {
  const route = useRoute();
  const { colors } = useTheme();
  const styles = makeStyles(colors);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to your dashboard {route.params.user.username}</Text>
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
    },
    text: {
      color: colors.text
    }
  });

export default TestMain;
