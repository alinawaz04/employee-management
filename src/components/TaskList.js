import React from "react";
import { Text, View, StyleSheet } from "react-native";
import Task from "./Task";

// helper function to check if end date of task is past today
const checkDate = (date) => {
  const today = new Date();
  const parsedDate = new Date(Date.parse(date));
  // return true if date passed is before today
  return parsedDate < today;
};

const TaskList = ({ tasks, type, editCallback, completeCallback }) => {
  return (
    <View>
      <Text style={styles.labelTextStyle}>{type} Tasks: </Text>

      {tasks.map((task) => {
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

        if (type === "Completed" && task.completed) {
          return <Task key={task.id} complete={true} task={task} />;
        }

        return null;
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  labelTextStyle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#FFFAFA",
  },
});

export default TaskList;
