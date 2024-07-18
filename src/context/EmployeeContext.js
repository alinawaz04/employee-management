import { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import uuid from "react-native-uuid";

// const mockEmployees = [
//   {
//     id: "32f5aa55-a1c0-4ddc-8a16-c9cab86a4cc9",
//     firstName: "Mei",
//     lastName: "Ever",
//     email: "mever0@vk.com",
//     tasks: [
//       {
//         id: "6b1e569a-b9f4-4d0f-bd0b-750e72f4b88d",
//         title: "Task 94",
//         startDate: "2024-07-10",
//         endDate: "2024-07-15",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "e1d30a8f-48e8-4e89-8c08-67e3202543d6",
//         title: "Task 35",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: true,
//         rating: 5,
//       },
//       {
//         id: "8f3c3b99-1cf3-4d02-9577-0e0dfe91d024",
//         title: "Task 44",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "d4c01e7d-7d8e-4c16-bd47-34e3c24f6206",
//         title: "Task 84",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//     ],
//   },
//   {
//     id: "604923c6-e670-40cd-b8c6-91ba10124310",
//     firstName: "Collen",
//     lastName: "Hrishchenko",
//     email: "chrishchenko1@pinterest.com",
//     tasks: [
//       {
//         id: "f78b53b0-187e-41da-935b-d04a46b017b0",
//         title: "Task 9",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "6781c9b5-1689-4645-865d-89c8367d4e4c",
//         title: "Task 93",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//     ],
//   },
//   {
//     id: "a119ebfc-366c-458a-826c-59811d1b180a",
//     firstName: "Matelda",
//     lastName: "Frier",
//     email: "mfrier2@sciencedaily.com",
//     tasks: [
//       {
//         id: "dc12c6e8-dad5-4b68-843a-dbf1af3a5c92",
//         title: "Task 33",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "b0542a62-b58f-4f91-a779-0380b8cf9085",
//         title: "Task 9",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "8f00d33c-50d1-4f0e-ae28-6751a9d8c7ea",
//         title: "Task 81",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "f4cb8fc4-4990-41c8-bd82-e9875b45a0d6",
//         title: "Task 70",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//     ],
//   },
//   {
//     id: "112b971f-34f9-4a27-9e48-016f43d936b8",
//     firstName: "Dacia",
//     lastName: "Whiff",
//     email: "dwhiff3@ed.gov",
//     tasks: [
//       {
//         id: "8c7a248d-8b98-4cb4-8335-202cf205db54",
//         title: "Task 59",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "ab5d7ef3-60d2-460b-b438-0d060ab899c4",
//         title: "Task 44",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "23a2db74-2b34-44f1-845e-50656c1ddbf0",
//         title: "Task 43",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "05a8e3f1-f0cc-4e0d-99cb-c39925c1ee57",
//         title: "Task 62",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//     ],
//   },
//   {
//     id: "94692560-027d-484f-9d68-e69f80885d7d",
//     firstName: "Alessandra",
//     lastName: "Johnke",
//     email: "ajohnke4@google.co.uk",
//     tasks: [],
//   },
//   {
//     id: "d4c39d89-8d28-471d-9025-a83e487b0972",
//     firstName: "Jenelle",
//     lastName: "Odam",
//     email: "jodam5@timesonline.co.uk",
//     tasks: [
//       {
//         id: "0f0d773b-1e34-4fa1-8981-7e65e79572d5",
//         title: "Task 21",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//     ],
//   },
//   {
//     id: "1948a3cc-a0a1-4739-8abc-7599bc700676",
//     firstName: "Cheri",
//     lastName: "Colquitt",
//     email: "ccolquitt6@yahoo.co.jp",
//     tasks: [
//       {
//         id: "dcf2a344-f57d-4b28-9b93-674da4eb92a4",
//         title: "Task 46",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "f21769fc-63f2-4f66-b04d-687a1c32bcff",
//         title: "Task 46",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "beaf148d-6f0a-49fa-9512-0e07d2c38833",
//         title: "Task 100",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "8f8d0426-2512-44ab-9345-3d874f1c6b1f",
//         title: "Task 28",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//       {
//         id: "77ad8a8a-1181-43bb-a334-3eb51d5b55e5",
//         title: "Task 84",
//         startDate: "2024-07-15",
//         endDate: "2024-07-20",
//         description: "Description of the task.",
//         completed: false,
//         rating: null,
//       },
//     ],
//   },
// ];

const EmployeeContext = createContext();

export const useEmployees = () => useContext(EmployeeContext);

export const EmployeeProvider = ({ children }) => {
  const [employees, setEmployees] = useState([]);

  // helper to load data from local storage when component mounts
  useEffect(() => {
    const loadEmployees = async () => {
      try {
        const json = await AsyncStorage.getItem("employees");
        const data = json != null ? JSON.parse(json) : [];
        setEmployees(data);
      } catch (err) {
        console.error("Error loading data from local storage", err);
      }
    };

    loadEmployees();
  }, []);

  const saveEmployeesToStorage = async (data) => {
    try {
      await AsyncStorage.setItem("employees", JSON.stringify(data));
    } catch (error) {
      console.error("Error saving data to AsyncStorage", error);
    }
  };

  const updateEmployeeTasks = (id, newTasks) => {
    const updatedEmployees = employees.map((employee) =>
      employee.id === id ? { ...employee, tasks: newTasks } : employee
    );
    setEmployees(updatedEmployees);
    saveEmployeesToStorage(updatedEmployees);
  };

  const updateEmployees = (firstName, lastName, email) => {
    const newEmployee = {
      id: uuid.v4(),
      firstName,
      lastName,
      email,
      tasks: [],
    };
    const updatedEmployees = [...employees, newEmployee];
    setEmployees(updatedEmployees);
    saveEmployeesToStorage(updatedEmployees);
  };

  return (
    <EmployeeContext.Provider
      value={{ employees, updateEmployeeTasks, updateEmployees }}
    >
      {children}
    </EmployeeContext.Provider>
  );
};
