import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TextInput,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";

import EmployeeList from "../components/EmployeeList";
import AddEmployeeModal from "../components/AddEmployeeModal";
import { useEmployees } from "../context/EmployeeContext";

const EmployeeListScreen = () => {
  const { employees } = useEmployees();
  const [query, setQuery] = useState("");
  const [showAddEmployeeModal, setShowAddEmployeeModal] = useState(false);
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);

  const toggleSwitch = () => {
    setShowIncompleteOnly((prevState) => !prevState);
  };

  // filter employees by search query
  const filteredEmployees = employees.filter((employee) => {
    const name = (employee.firstName + employee.lastName).toLowerCase();
    return name.toLowerCase().includes(query.toLowerCase());
  });

  // list of employees with incomplete and active tasks
  const incompleteTaskEmployees = filteredEmployees.filter((employee) => {
    const activeTasks = employee.tasks.filter((task) => !task.completed);
    return activeTasks.length > 0;
  });

  return (
    <View style={styles.container}>
      <AddEmployeeModal
        modalVisible={showAddEmployeeModal}
        setModalVisible={setShowAddEmployeeModal}
      />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search Employees..."
        placeholderTextColor="#FFFAFA"
        style={styles.search}
      />

      <View style={styles.switchContainer}>
        <Text>Show incomplete tasks only: </Text>
        <Switch value={showIncompleteOnly} onValueChange={toggleSwitch} />
      </View>

      {/* render different list based on 'showIncompleteOnly' state */}
      {showIncompleteOnly ? (
        <EmployeeList data={incompleteTaskEmployees} />
      ) : (
        <EmployeeList data={filteredEmployees} />
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setShowAddEmployeeModal(true)}
        >
          <Text>Add Employee</Text>
        </TouchableOpacity>
      </View>
    </View>
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
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#B9C6AE",
    margin: 5,
    marginHorizontal: 20,
    padding: 5,
    borderRadius: 10,
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
    justifyContent: "center",
    alignItems: "center",
  },
  search: {
    backgroundColor: "#808080",
    borderRadius: 10,
    color: "#FFFAFA",
    height: 40,
    margin: 5,
    padding: 5,
  },
});

export default EmployeeListScreen;
