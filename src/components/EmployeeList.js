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
      const today = new Date();
      const parsedDate = new Date(Date.parse(task.endDate));
      // return true if date parsed is before today
      if (parsedDate < today) {
        overdue = true;
      }
    });
    return overdue;
  };

  return (
    <View>
      {data.map((employee) => {
        const overdue = checkOverdueTasks(employee.tasks);
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
              <Text>
                {employee.firstName} {employee.lastName}
              </Text>
              {/* if employee has 5 or more active tasks: add red text color */}
              <Text
                style={employee.tasks.length >= 5 ? styles.alertTasks : null}
              >
                Tasks: {employee.tasks.length}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
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

  overdueEmployee: {
    borderColor: "red",
  },

  // style for 5 or more active tasks:
  alertTasks: {
    color: "red",
  },
});

export default EmployeeList;
