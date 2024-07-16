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
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useEmployees } from "../context/EmployeeContext";

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

  useEffect(() => {
    setTasks(employee.tasks);
  }, [employee.tasks]);

  // helper function to check if end date of task is past today
  const checkDate = (date) => {
    const today = new Date();
    const parsedDate = new Date(Date.parse(date));
    // return true if date passed is before today
    return parsedDate < today;
  };

  const formatDate = (date) => {
    return date.toISOString().slice(0, 10);
  };

  const addTask = (title, startDate, endDate, description) => {
    const formattedStart = formatDate(startDate);
    const formattedEnd = formatDate(endDate);
    const newTasks = [
      ...tasks,
      {
        title,
        description,
        startDate: formattedStart,
        endDate: formattedEnd,
      },
    ];
    setTasks(newTasks);
    updateEmployeeTasks(employee.id, newTasks); // Update tasks in parent component
  };

  const onStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTaskStartDate(currentDate);
  };

  const onEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate;
    setTaskEndDate(currentDate);
  };

  return (
    <View>
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
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>X</Text>
            </Pressable>
            <Text style={styles.modalHeaderText}>Add Employee</Text>

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
              onPress={() => {
                if (
                  taskTitle &&
                  taskStartDate &&
                  taskEndDate &&
                  taskDescription
                ) {
                  addTask(
                    taskTitle,
                    taskStartDate,
                    taskEndDate,
                    taskDescription
                  );
                  setModalVisible(!modalVisible);
                } else {
                  Alert.alert("All field must be filled!");
                }
              }}
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

      {tasks.map((task) => {
        const overdue = checkDate(task.endDate);
        return (
          <View
            key={task.title}
            style={overdue ? styles.overdueTask : styles.task}
          >
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
      <Button
        title="Add Custom Task"
        onPress={() => setModalVisible(!modalVisible)}
      />
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
