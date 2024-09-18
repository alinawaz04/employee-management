import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EmployeeList = ({ data }) => {
  // gain access to navigation from within component
  const navigation = useNavigation();

  // AsyncStorage.clear();

  // function to check id an employee has incomplete and overdue tasks
  const checkOverdueTasks = (tasks = []) => {
    let overdue = false;
    tasks.forEach((task) => {
      // check incomplete tasks only
      if (!task.completed) {
        const today = new Date();
        // parse end date of task to be in same format as "today"
        const parsedDate = new Date(Date.parse(task.endDate));
        // return true if date parsed is before today
        if (parsedDate < today) {
          overdue = true;
        }
      }
    });
    return overdue;
  };

  return (
    <View>
      {data.map((employee) => {
        const overdue = checkOverdueTasks(employee.tasks);
        const activeTasks = employee.tasks?.filter((task) => !task.completed);
        return (
          <TouchableOpacity
            key={employee.id}
            onPress={() =>
              // navigate to EmployeeDetails screen and pass employee id as param
              navigation.navigate("EmployeeDetails", {
                id: employee.id,
              })
            }
          >
            <View
              style={
                overdue
                  ? [styles.employee, styles.overdueEmployee]
                  : styles.employee
              }
            >
              <Text style={styles.textStyle}>
                {employee.firstName} {employee.lastName}
              </Text>
              {/* if employee has 5 or more active tasks: add red text color */}
              <Text
                style={
                  activeTasks?.length >= 5
                    ? styles.alertTasks
                    : styles.textStyle
                }
              >
                Active Tasks: {activeTasks ? activeTasks.length : 0}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  textStyle: {
    color: "#FFFAFA",
  },
  employee: {
    borderColor: "#B9C6AE",
    borderWidth: 2,
    borderRadius: 10,
    flexDirection: "row",
    margin: 5,
    marginHorizontal: 20,
    padding: 15,
    justifyContent: "space-between",
  },

  overdueEmployee: {
    borderColor: "red",
  },

  // style for 5 or more active tasks:
  alertTasks: {
    color: "red",
  },
});

export default EmployeeList;
