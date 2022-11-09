import { StatusBar } from "expo-status-bar";
import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
const Stack = createNativeStackNavigator();

import Main from "./Components/Screens/Main";
import gallery from "./Components/Screens/Gallery";

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="main" component={Main} />
        <Stack.Screen name="gallery" component={gallery} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
