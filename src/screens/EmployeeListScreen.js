import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Switch,
  TextInput,
  Button,
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
    <View>
      <AddEmployeeModal
        modalVisible={showAddEmployeeModal}
        setModalVisible={setShowAddEmployeeModal}
      />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Search Employees..."
        style={styles.search}
      />

      <View style={styles.switchContainer}>
        <Text> Show employees with incomplete tasks only: </Text>
        <Switch value={showIncompleteOnly} onValueChange={toggleSwitch} />
      </View>

      {/* render different list based on 'showIncompleteOnly' state */}
      {showIncompleteOnly ? (
        <EmployeeList data={incompleteTaskEmployees} />
      ) : (
        <EmployeeList data={filteredEmployees} />
      )}

      <Button
        title="Add Employee"
        onPress={() => setShowAddEmployeeModal(true)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#ACE4AA",
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },

  search: {
    color: "black",
    borderWidth: 1,
    height: 40,
    margin: 5,
    padding: 5,
  },
});

export default EmployeeListScreen;
