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
        <Text style={styles.textStyle}>{task.title}</Text>
        <Text style={styles.textStyle}>{task.description}</Text>
        <Text style={styles.textStyle}>
          {task.startDate} - {task.endDate}
        </Text>
      </View>
      {complete ? (
        <View>
          <Text style={styles.textStyle}>Rating: {task.rating}/5</Text>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <Pressable
            style={[styles.taskButton, styles.editButtonStyle]}
            onPress={() => editCallback(task)}
          >
            <Text style={styles.taskButtonText}>Edit Task</Text>
          </Pressable>

          <Pressable
            style={[styles.taskButton, styles.completeButtonStyle]}
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
  textStyle: {
    color: "#FFFAFA",
  },
  buttonContainer: {
    flex: 1,
  },
  taskButton: {
    padding: 10,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
    width: "auto",
    margin: 10,
    alignItems: "center",
  },
  editButtonStyle: {
    backgroundColor: "#FFB",
  },
  completeButtonStyle: {
    backgroundColor: "#3DDC97",
  },
  taskButtonText: {
    color: "black",
  },
  task: {
    marginVertical: 5,
    marginHorizontal: 15,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  completeTask: {
    borderColor: "#3DDC97",
    borderWidth: 2,
  },
  activeTask: {
    borderColor: "#B9C6AE",
    borderWidth: 2,
  },
  overdueTask: {
    borderColor: "#FF7E6B",
    borderWidth: 2,
  },
  overdueText: {
    color: "#FF7E6B",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Task;
