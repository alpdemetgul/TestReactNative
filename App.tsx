import Login from "./src/Login";
import { NavigationContainer,DefaultTheme,DarkTheme  } from '@react-navigation/native';
import { useColorScheme } from 'react-native';
import Routes from "./src/Routes";



const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'rgb(255, 45, 85)',
  },
};

export default function App() {

  const scheme = useColorScheme();
  console.log(scheme);

 
  return (
    <NavigationContainer theme={scheme === 'dark' ? DarkTheme : MyTheme}>
    <Routes/>
    </NavigationContainer>

    );
}


