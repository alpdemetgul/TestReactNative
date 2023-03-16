import { NavigationContainer } from "@react-navigation/native";
import { useColorScheme, Appearance } from "react-native";
import Routes from "./src/Routes";
import { Theme } from "./src/Theme";

export default function App() {
  const scheme = useColorScheme();

  return (
    <NavigationContainer theme={Theme(scheme)}>
      <Routes />
    </NavigationContainer>
  );
}
