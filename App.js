import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";

const Stack = createNativeStackNavigator();

import Main from "./Components/Screens/Main";
import Gallery from "./Components/Screens/Gallery";
import CameraScreen from "./Components/Screens/Camera";
import BigPhoto from "./Components/Screens/BigPhoto";
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="gallery" component={Gallery} />
        <Stack.Screen
          name="camera"
          component={CameraScreen}
          options={{ ...styles, headerShown: false }}
        />
        <Stack.Screen name="bigphoto" component={BigPhoto} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: "#ff0055",
  },
  headerTintColor: "#ffffff",
  headerTitleStyle: {
    fontWeight: "bold",
    color: "#eeeeee",
  },
});
