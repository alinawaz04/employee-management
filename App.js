import EmployeeDetailsScreen from "./src/screens/EmployeeDetailsScreen";
import EmployeeListScreen from "./src/screens/EmployeeListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Provider } from "react-redux";
import store from "./src/store";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    // Redux provider
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="EmployeeList"
            component={EmployeeListScreen}
            options={{
              title: "Employee List",
              headerStyle: {
                backgroundColor: "#232323",
              },
              headerTitleStyle: {
                color: "#FFFAFA",
              },
            }}
          />
          <Stack.Screen
            name="EmployeeDetails"
            component={EmployeeDetailsScreen}
            options={{
              title: "Employee Details",
              headerStyle: {
                backgroundColor: "#232323",
              },
              headerTitleStyle: {
                color: "#FFFAFA",
              },
              headerBackTitleVisible: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
