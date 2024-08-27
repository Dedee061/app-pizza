import { StyleSheet, Text, View, StatusBar } from "react-native";
import SignIn from "./src/pages/SignIn";
import { NavigationContainer } from "@react-navigation/native";
import Router from "./src/routes";
import { AuthProvider } from "./src/contexts/AuthContext";

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar
          backgroundColor={"#1f1f2e"}
          barStyle={"light-content"}
          translucent={false}
        />
        <Router />
      </AuthProvider>
    </NavigationContainer>
  );
}
