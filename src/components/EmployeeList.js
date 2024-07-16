import React from "react";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

/**
 * Render list of employees
 * @param data - list of employees to be rendered
 */

const EmployeeList = ({ data }) => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("EmployeeDetails", { employee: item })
          }
        >
          <View style={styles.employee}>
            <Text>
              {item.firstName} {item.lastName}
            </Text>
            {/* if employee has 5 or more active tasks: add red text color */}
            <Text style={item.tasks.length >= 5 ? styles.alertTasks : null}>
              Tasks: {item.tasks.length}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  employee: {
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "row",
    margin: 5,
    marginHorizontal: 20,
    padding: 5,
    justifyContent: "space-between",
  },

  // style for 5 or more active tasks:
  alertTasks: {
    color: "red",
  },
});

export default EmployeeList;
