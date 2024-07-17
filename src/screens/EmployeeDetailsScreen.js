import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Button,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEmployees } from "../context/EmployeeContext";
import Task from "../components/Task";

const EmployeeDetailsScreen = ({ route }) => {
  const { id } = route.params;
  const { employees, updateEmployeeTasks } = useEmployees();

  const employee = employees.find((emp) => emp.id === id);

  const [tasks, setTasks] = useState(employee.tasks);
  const [modalVisible, setModalVisible] = useState(false);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStartDate, setTaskStartDate] = useState(new Date());
  const [taskEndDate, setTaskEndDate] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  useEffect(() => {
    setTasks(employee.tasks);
  }, [employee.tasks]);

  const resetModalState = () => {
    setModalVisible(false);
    setIsEditing(false);
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskStartDate(new Date());
    setTaskEndDate(new Date());
    setTaskDescription("");
  };

  // pre-fill modal  with task data
  const openEditModal = (task) => {
    setIsEditing(true);
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskStartDate(new Date(task.startDate));
    setTaskEndDate(new Date(task.endDate));
    setTaskDescription(task.description);
    setModalVisible(true);
  };

  // add data from modal to tasks state and global state in context
  const addTask = (title, startDate, endDate, description) => {
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);
    const newTasks = [
      ...tasks,
      {
        id: String(new Date().getTime()),
        title,
        description,
        startDate: formattedStart,
        endDate: formattedEnd,
      },
    ];

    // set screen state
    setTasks(newTasks);

    // set global state
    updateEmployeeTasks(employee.id, newTasks);
  };

  // handle different scenarios of saving a task
  const handleSaveTask = () => {
    // verify all fields are filled
    if (taskTitle && taskStartDate && taskEndDate && taskDescription) {
      // check if we are currently in editing task state
      if (isEditing) {
        updateTask(
          editingTaskId,
          taskTitle,
          taskStartDate,
          taskEndDate,
          taskDescription
        );
      } else {
        // not in editing task state, so add task
        addTask(taskTitle, taskStartDate, taskEndDate, taskDescription);
      }
      // resetting modal state
      resetModalState();
    } else {
      Alert.alert("All fields must be filled!");
    }
  };

  // helper function to check if end date of task is past today
  const checkDate = (date) => {
    const today = new Date();
    const parsedDate = new Date(Date.parse(date));
    // return true if date passed is before today
    return parsedDate < today;
  };

  // helper to format date to match global data
  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  // update task in screen state and global state
  const updateTask = (taskId, title, startDate, endDate, description) => {
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);
    const newTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            title,
            description,
            startDate: formattedStart,
            endDate: formattedEnd,
          }
        : task
    );
    // update screen tasks state
    setTasks(newTasks);
    // update global tasks state in context
    updateEmployeeTasks(employee.id, newTasks);
  };

  // handler function necessary for DatePicker component state management
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTaskStartDate(currentDate);
  };

  // handler function necessary for DatePicker component state management
  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTaskEndDate(currentDate);
  };

  return (
    <ScrollView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Pressable
              style={[styles.closeModal, styles.buttonClose]}
              onPress={() => {
                resetModalState();
              }}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            {isEditing ? (
              <Text style={styles.modalHeaderText}>Edit Task</Text>
            ) : (
              <Text style={styles.modalHeaderText}>Add Task</Text>
            )}

            <Text>Task title::</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Task title"
              value={taskTitle}
              onChangeText={setTaskTitle}
            />

            <Text>Task start date:</Text>
            <DateTimePicker
              mode="date"
              display="default"
              value={taskStartDate}
              onChange={onStartDateChange}
            />

            <Text>Task end date:</Text>
            <DateTimePicker
              mode="date"
              display="default"
              value={taskEndDate}
              onChange={onEndDateChange}
            />

            <Text>Task description:</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Task description"
              value={taskDescription}
              onChangeText={setTaskDescription}
            />

            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={handleSaveTask}
            >
              <Text style={styles.textStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.employeeInfo}>
        <Text style={styles.headerText}>
          Employee: {employee.firstName} {employee.lastName}
        </Text>
        <Text style={styles.headerText}>Employee Email: {employee.email} </Text>
      </View>

      <View style={styles.taskContainer}>
        {tasks.map((task) => {
          const overdue = checkDate(task.endDate);
          return (
            <Task task={task} overdue={overdue} editCallback={openEditModal} />
          );
        })}

        <Button
          title="Add Custom Task"
          onPress={() => setModalVisible(!modalVisible)}
        />
      </View>
    </ScrollView>
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
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginB: 20,
    backgroundColor: "white",
    borderRadius: 20,

    paddingHorizontal: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalInput: {
    padding: 10,
    marginTop: 5,
    marginBottom: 10,
    width: 200,
    borderColor: "black",
    borderWidth: 1,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#ACE4AA",
  },
  closeModal: {
    position: "absolute",
    top: 5,
    left: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    justifyContent: "flex-start",
  },
  textStyle: {
    fontWeight: "medium",
    textAlign: "center",
  },
  modalHeaderText: {
    fontWeight: "bold",
    fontSize: 16,
    margin: 10,
    textAlign: "center",
  },
});

export default EmployeeDetailsScreen;
