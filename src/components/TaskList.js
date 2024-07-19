import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Task from "./Task";

// helper function to check if end date of task is past today
const checkDate = (date) => {
  const today = new Date();
  // parse date given into format of "today"
  const parsedDate = new Date(Date.parse(date));
  // return true if date passed is before today
  return parsedDate < today;
};

const TaskList = ({ tasks, type, editCallback, completeCallback }) => {
  return (
    <View style={styles.taskListContainer}>
      <Text style={styles.labelTextStyle}>{type} Tasks: </Text>
      {/* map over each task and render a Task component */}
      {tasks.map((task) => {
        // render for incomplete status
        if (type === "Active" && !task.completed) {
          const overdue = checkDate(task.endDate);
          return (
            <Task
              key={task.id}
              task={task}
              overdue={overdue}
              editCallback={editCallback}
              completeCallback={completeCallback}
            />
          );
        }

        // render for complete status
        if (type === "Completed" && task.completed) {
          return <Task key={task.id} complete={true} task={task} />;
        }

        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  taskListContainer: {
    marginBottom: 30,
  },
  labelTextStyle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#FFFAFA",
  },
});

export default TaskList;
