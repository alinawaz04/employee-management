import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";

const Task = ({ task, overdue, editCallback, completeCallback }) => {
  return (
    <View key={task.id} style={overdue ? styles.overdueTask : styles.task}>
      <View style={styles.taskInfo}>
        {overdue ? <Text style={styles.overdueText}>TASK OVERDUE</Text> : null}
        <Text>{task.title}</Text>
        <Text>{task.description}</Text>
        <Text>
          {task.startDate} - {task.endDate}
        </Text>
      </View>
      <View>
        <Pressable style={styles.taskButton} onPress={() => editCallback(task)}>
          <Text style={styles.taskButtonText}>Edit Task</Text>
        </Pressable>

        <Pressable style={styles.taskButton}>
          <Text style={styles.taskButtonText}>Complete Task</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskInfo: {
    marginBottom: 10,
  },
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
    borderColor: "green",
    borderWidth: 2,
    marginVertical: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overdueTask: {
    borderColor: "red",
    borderWidth: 2,
    marginVertical: 5,
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  overdueText: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Task;
