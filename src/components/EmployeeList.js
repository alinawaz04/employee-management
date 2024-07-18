import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

/**
 * Render list of employees
 * @param data - list of employees to be rendered
 */

const EmployeeList = ({ data }) => {
  const navigation = useNavigation();

  const checkOverdueTasks = (tasks) => {
    let overdue;
    tasks.forEach((task) => {
      if (!task.completed) {
        const today = new Date();
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
        const activeTasks = employee.tasks.filter((task) => !task.completed);
        return (
          <TouchableOpacity
            key={employee.id}
            onPress={() =>
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
                  activeTasks.length >= 5 ? styles.alertTasks : styles.textStyle
                }
              >
                Active Tasks: {activeTasks.length}
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
