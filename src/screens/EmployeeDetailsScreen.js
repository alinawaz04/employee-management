import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  Alert,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import dayjs from "dayjs";
import {
  saveEmployeesToStorage,
  useEmployees,
} from "../context/employeesSlice";
import DateTimePicker from "@react-native-community/datetimepicker";
import RatingModal from "../components/RatingModal";
import TaskList from "../components/TaskList";
import { useDispatch, useSelector } from "react-redux";
import { updateEmployeeTasks } from "../context/employeesSlice";

const EmployeeDetailsScreen = ({ route }) => {
  const { id } = route.params; // get employee id from route params

  const dispatch = useDispatch(); // dispatch to call actions
  const employees = useSelector((state) => state.employees.employees);

  const employee = employees.find((emp) => emp.id === id); // find employee by id

  // local state for tasks
  const [tasks, setTasks] = useState(employee?.tasks || []);

  // state for modal visibility
  const [modalVisible, setModalVisible] = useState(false);

  // state for modal inputs
  const [taskTitle, setTaskTitle] = useState("");
  const [taskStartDate, setTaskStartDate] = useState(new Date());
  const [taskEndDate, setTaskEndDate] = useState(new Date());
  const [taskDescription, setTaskDescription] = useState("");

  // state for editing task
  const [isEditing, setIsEditing] = useState(false);
  const [editingTaskId, setEditingTaskId] = useState(null);

  // state fro completing task
  const [completeTaskId, setCompleteTaskId] = useState(null);

  // state for rating modal
  const [ratingModalVisible, setRatingModalVisible] = useState(false);
  const [rating, setRating] = useState(null);

  // sync local state "tasks" with global state "employee.tasks"
  // whenever "employee.tasks" changes.
  useEffect(() => {
    if (employee?.tasks) {
      setTasks(employee.tasks);
    }
  }, [employee?.tasks]);

  // function to reset modal state to defaults
  const resetModalState = () => {
    setModalVisible(false);
    setIsEditing(false);
    setEditingTaskId(null);
    setTaskTitle("");
    setTaskStartDate(new Date());
    setTaskEndDate(new Date());
    setTaskDescription("");
  };

  // function to pre-fill modal with task data
  const openEditModal = (task) => {
    setIsEditing(true);
    setEditingTaskId(task.id);
    setTaskTitle(task.title);
    setTaskStartDate(new Date(task.startDate));
    setTaskEndDate(new Date(task.endDate));
    setTaskDescription(task.description);
    setModalVisible(true);
  };

  // function to format date to match global data
  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  // function to add data from modal to tasks state and global state in context
  const addTask = (title, startDate, endDate, description) => {
    const formattedStart = startDate.toString();
    const formattedEnd = endDate.toString();
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
    updateEmployeeAndStorage(newTasks);
  };

  // function to handle updating the employee's tasks and save to storage
  const updateEmployeeAndStorage = (updatedTasks) => {
    dispatch(updateEmployeeTasks({ id: employee.id, newTasks: updatedTasks }));
    dispatch(
      saveEmployeesToStorage(
        employees.map((emp) =>
          emp.id === employee.id ? { ...emp, tasks: updatedTasks } : emp
        )
      )
    );
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

  // handler function for DatePicker component
  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTaskStartDate(currentDate);
  };

  // handler function for DatePicker component
  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTaskEndDate(currentDate);
  };

  // update task in screen state and global state
  const updateTask = (taskId, title, startDate, endDate, description) => {
    const formattedStart = startDate.toString();
    const formattedEnd = endDate.toString();
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
    updateEmployeeAndStorage(newTasks);
  };

  // function to open completion modal for a task
  const openCompleteModal = (task) => {
    setCompleteTaskId(task.id);
    setRatingModalVisible(true);
  };

  // function to mark task as completed in global state with rating
  const completeTask = (taskId, taskRating) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId
        ? {
            ...task,
            completed: true,
            rating: taskRating,
          }
        : task
    );
    setTasks(updatedTasks);
    updateEmployeeAndStorage(updatedTasks);
  };

  return (
    <ScrollView style={styles.container}>
      <RatingModal
        ratingModalVisible={ratingModalVisible}
        setRatingModalVisible={setRatingModalVisible}
        // receive rating from component and use to set local state and complete task
        setRating={(rating) => {
          setRating(rating);
          completeTask(completeTaskId, rating);
          setRatingModalVisible(false);
        }}
      />
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
              <Text style={styles.modalTextStyle}>x</Text>
            </Pressable>
            {isEditing ? (
              <Text style={styles.modalHeaderText}>Edit Task</Text>
            ) : (
              <Text style={styles.modalHeaderText}>Add Task</Text>
            )}

            <Text>Task title:</Text>
            <TextInput
              style={styles.modalInput}
              value={taskTitle}
              onChangeText={setTaskTitle}
            />

            <Text>Task start date:</Text>
            <DateTimePicker
              mode="date"
              display="default"
              value={taskStartDate}
              onChange={onStartDateChange}
              style={{ marginBottom: 10 }}
            />

            <Text>Task end date:</Text>
            <DateTimePicker
              mode="date"
              display="default"
              value={taskEndDate}
              onChange={onEndDateChange}
              style={{ marginBottom: 10 }}
            />

            <Text>Task description:</Text>
            <TextInput
              style={styles.modalInput}
              value={taskDescription}
              onChangeText={setTaskDescription}
            />

            <Pressable
              style={[styles.modalButton, styles.buttonClose]}
              onPress={handleSaveTask}
            >
              <Text style={styles.modalTextStyle}>Submit</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.employeeInfo}>
        <Text style={styles.headerText}>
          <Text style={styles.bold}> Employee:</Text> {employee.firstName}{" "}
          {employee.lastName}
        </Text>
        <Text style={styles.headerText}>
          <Text style={styles.bold}>Employee Email:</Text> {employee.email}{" "}
        </Text>
      </View>

      <TaskList
        tasks={tasks}
        type={"Active"}
        editCallback={openEditModal}
        completeCallback={openCompleteModal}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(!modalVisible)}
        >
          <Text>Add Custom Task</Text>
        </TouchableOpacity>
      </View>

      <TaskList tasks={tasks} type={"Completed"} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#232323",
    flex: 1,
  },
  textStyle: {
    color: "#FFFAFA",
  },
  bold: {
    fontWeight: "bold",
    color: "#B9C6AE",
  },
  labelTextStyle: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#FFFAFA",
  },
  buttonContainer: {
    flex: 1,
    alignItems: "center",
  },
  button: {
    backgroundColor: "#FFFAFA",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginVertical: 15,
    width: "auto",
    alignItems: "center",
  },
  employeeInfo: {
    alignItems: "center",
    padding: 10,
    borderRadius: 15,
  },
  headerText: {
    fontSize: 16,
    color: "#FFFAFA",
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
    borderRadius: 5,
    width: 200,
    borderColor: "black",
    borderWidth: 1,
  },
  modalButton: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginBottom: 10,
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#B9C6AE",
  },
  closeModal: {
    position: "absolute",
    top: 5,
    left: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  modalTextStyle: {
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
