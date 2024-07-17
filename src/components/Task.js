import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const Task = ({ task, overdue, complete, editCallback, completeCallback }) => {
  return (
    <View
      style={
        complete
          ? [styles.completeTask, styles.task]
          : overdue
          ? [styles.overdueTask, styles.task]
          : [styles.activeTask, styles.task]
      }
    >
      <View style={styles.taskInfo}>
        {overdue ? <Text style={styles.overdueText}>TASK OVERDUE</Text> : null}
        <Text>{task.title}</Text>
        <Text>{task.description}</Text>
        <Text>
          {task.startDate} - {task.endDate}
        </Text>
      </View>
      {complete ? (
        <View>
          <Text>Rating: {task.rating}/5</Text>
        </View>
      ) : (
        <View>
          <Pressable
            style={styles.taskButton}
            onPress={() => editCallback(task)}
          >
            <Text style={styles.taskButtonText}>Edit Task</Text>
          </Pressable>

          <Pressable
            style={styles.taskButton}
            onPress={() => completeCallback(task)}
          >
            <Text style={styles.taskButtonText}>Complete Task</Text>
          </Pressable>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  taskContainer: {
    marginBottom: 50,
  },
  taskButton: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: 125,
    margin: 10,
    alignItems: "center",
  },
  taskButtonText: {
    color: "black",
  },
  task: {
    marginVertical: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  completeTask: {
    borderColor: "green",
    borderWidth: 2,
  },
  activeTask: {
    borderColor: "black",
    borderWidth: 2,
  },
  overdueTask: {
    borderColor: "red",
    borderWidth: 2,
  },
  overdueText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Task;
