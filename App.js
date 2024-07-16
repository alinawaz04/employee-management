import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import EmployeeDetailsScreen from "./src/screens/EmployeeDetailsScreen";
import EmployeeListScreen from "./src/screens/EmployeeListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="EmployeeList"
          component={EmployeeListScreen}
          options={{ title: "Employee List" }}
        />
        <Stack.Screen
          name="EmployeeDetails"
          component={EmployeeDetailsScreen}
          options={{ title: "Employee Details" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
