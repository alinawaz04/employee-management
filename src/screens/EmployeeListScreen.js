import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Switch,
} from "react-native";

const mockEmployees = [
  {
    id: "32f5aa55-a1c0-4ddc-8a16-c9cab86a4cc9",
    firstName: "Mei",
    lastName: "Ever",
    email: "mever0@vk.com",
    tasks: [
      {
        title: "Task 94",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 35",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 44",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 84",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
    ],
  },
  {
    id: "604923c6-e670-40cd-b8c6-91ba10124310",
    firstName: "Collen",
    lastName: "Hrishchenko",
    email: "chrishchenko1@pinterest.com",
    tasks: [
      {
        title: "Task 9",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 93",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
    ],
  },
  {
    id: "a119ebfc-366c-458a-826c-59811d1b180a",
    firstName: "Matelda",
    lastName: "Frier",
    email: "mfrier2@sciencedaily.com",
    tasks: [
      {
        title: "Task 33",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 9",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 81",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 70",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
    ],
  },
  {
    id: "112b971f-34f9-4a27-9e48-016f43d936b8",
    firstName: "Dacia",
    lastName: "Whiff",
    email: "dwhiff3@ed.gov",
    tasks: [
      {
        title: "Task 59",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 44",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 43",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 62",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
    ],
  },
  {
    id: "94692560-027d-484f-9d68-e69f80885d7d",
    firstName: "Alessandra",
    lastName: "Johnke",
    email: "ajohnke4@google.co.uk",
    tasks: [],
  },
  {
    id: "d4c39d89-8d28-471d-9025-a83e487b0972",
    firstName: "Jenelle",
    lastName: "Odam",
    email: "jodam5@timesonline.co.uk",
    tasks: [
      {
        title: "Task 21",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
    ],
  },
  {
    id: "1948a3cc-a0a1-4739-8abc-7599bc700676",
    firstName: "Cheri",
    lastName: "Colquitt",
    email: "ccolquitt6@yahoo.co.jp",
    tasks: [
      {
        title: "Task 46",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 46",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 100",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 28",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 84",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
    ],
  },
  {
    id: "8c45d205-3f66-4409-9dda-5f50efebe7ee",
    firstName: "Salim",
    lastName: "Dohmer",
    email: "sdohmer7@a8.net",
    tasks: [
      {
        title: "Task 81",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 86",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 28",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 58",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 26",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
    ],
  },
  {
    id: "bfad906c-955f-4755-85ac-dc782cee20c4",
    firstName: "Verina",
    lastName: "Tirrey",
    email: "vtirrey8@amazon.com",
    tasks: [
      {
        title: "Task 46",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 24",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
    ],
  },
  {
    id: "2b9af648-f0d8-40c6-9736-f7aa296c4630",
    firstName: "Lavinia",
    lastName: "Heaseman",
    email: "lheaseman9@businesswire.com",
    tasks: [
      {
        title: "Task 61",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 49",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 21",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 9",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
      {
        title: "Task 72",
        startDate: "2024-07-15",
        endDate: "2024-07-20",
        description: "Description of the task.",
      },
    ],
  },
];

const EmployeeListScreen = ({ navigation }) => {
  // manage state for switch that filters employees for whether they have incomplete tasks or not
  const [showIncompleteOnly, setShowIncompleteOnly] = useState(false);
  const [employees, setEmployees] = useState(mockEmployees);

  const toggleSwitch = () => {
    setShowIncompleteOnly((prevState) => !prevState);
  };

  // list of employees with incomplete tasks
  const incompleteTaskEmployees = employees.filter((employee) => {
    return employee.tasks.length > 0;
  });

  return (
    <View>
      <Switch value={showIncompleteOnly} onValueChange={toggleSwitch} />
      {showIncompleteOnly ? (
        <FlatList
          data={incompleteTaskEmployees}
          renderItem={({ item }) => (
            <View style={styles.employee}>
              <Text>
                {item.firstName} {item.lastName}
              </Text>
              {/* if employee has 5 or more active tasks: add red text color */}
              <Text style={item.tasks.length >= 5 ? styles.alertTasks : null}>
                Tasks: {item.tasks.length}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      ) : (
        <FlatList
          data={employees}
          renderItem={({ item }) => (
            <View style={styles.employee}>
              <Text>
                {item.firstName} {item.lastName}
              </Text>
              {/* if employee has 5 or more active tasks: add red text color */}
              <Text style={item.tasks.length >= 5 ? styles.alertTasks : null}>
                Tasks: {item.tasks.length}
              </Text>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  employee: {
    borderColor: "black",
    borderWidth: 2,
    flexDirection: "row",
    margin: 5,
    padding: 5,
    justifyContent: "space-between",
  },

  // style for 5 or more active tasks:
  alertTasks: {
    color: "red",
  },
});

export default EmployeeListScreen;
