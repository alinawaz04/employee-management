import EmployeeDetailsScreen from "./src/screens/EmployeeDetailsScreen";
import EmployeeListScreen from "./src/screens/EmployeeListScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { EmployeeProvider } from "./src/context/EmployeeContext";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <EmployeeProvider>
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
    </EmployeeProvider>
  );
}
