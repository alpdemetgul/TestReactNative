import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, SafeAreaView,TextInput,Button,Alert } from 'react-native';
import { SvgUri } from 'react-native-svg';


export default function App() {
  return (
    <SafeAreaView style={styles.container}>
   <SvgUri
    width={200}
    height={200}
    uri="https://www.gelecekvarlik.com.tr/slider/9443bd65dc8fd7623a5e54350fa31e41.svg"
/>
<Text style={styles.title}>Gelecek Varlık</Text>

      <Text style={styles.text}>Kullanıcı Adı:</Text>
      <TextInput style={styles.input}></TextInput>
      <Text style={styles.text}>Şifre:</Text>
      <TextInput style={styles.input}></TextInput>
      <StatusBar style="auto" />
      <Button title='Enter' color="#f5a623"
      onPress={() => Alert.alert('Simple Button pressed')}/>
            <Button title='Sign Up!' color="#f5a623"
      onPress={() => Alert.alert('Simple Button pressed')}/>
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
    width:300,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'#fff',
    borderRadius:50
  },
  button:{
    
  },
  title:{
    fontSize:30,
    color:'#fff',
    marginBottom:40

  },
  text:{
    color:'#fff'
  },
  logo: {
    width: 100,
    height:100,
    marginBottom:40
  },
});
