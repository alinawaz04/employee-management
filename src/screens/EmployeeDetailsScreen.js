import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";

const EmployeeDetailsScreen = ({ route }) => {
  const { employee } = route.params;

  // helper function to check if end date of task is past today
  const checkDate = (date) => {
    const today = new Date();
    const parsedDate = new Date(Date.parse(date));
    // return true if date passed is before today
    return parsedDate < today;
  };

  return (
    <View>
      <View style={styles.employeeInfo}>
        <Text style={styles.headerText}>
          Employee: {employee.firstName} {employee.lastName}
        </Text>
        <Text style={styles.headerText}>Employee Email: {employee.email} </Text>
      </View>

      {employee.tasks.map((task) => {
        const overdue = checkDate(task.endDate);
        return (
          <View style={overdue ? styles.overdueTask : styles.task}>
            {overdue ? (
              <Text style={styles.overdueText}>TASK OVERDUE</Text>
            ) : null}
            <Text>{task.title}</Text>
            <Text>{task.description}</Text>
            <Text>
              {task.startDate} - {task.endDate}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  employeeInfo: {
    alignItems: "center",
    padding: 10,
  },
  headerText: {
    fontSize: 16,
  },
  task: {
    borderColor: "green",
    borderWidth: 2,
    marginVertical: 5,
    padding: 5,
  },
  overdueTask: {
    borderColor: "red",
    borderWidth: 2,
    marginVertical: 5,
    padding: 5,
  },
  overdueText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EmployeeDetailsScreen;
