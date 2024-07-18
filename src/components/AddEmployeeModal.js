import React, { useState } from "react";
import {
  Text,
  View,
  StyleSheet,
  Modal,
  TextInput,
  Pressable,
  Alert,
} from "react-native";
import { useEmployees } from "../context/EmployeeContext";

const AddEmployeeModal = ({ modalVisible, setModalVisible, addEmployee }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const { updateEmployees } = useEmployees();

  return (
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
            <Text style={styles.textStyle}>x</Text>
          </Pressable>
          <Text style={styles.modalHeaderText}>Add Employee</Text>

          <Text>Employee first name:</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="First name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <Text>Employee last name:</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Last name"
            value={lastName}
            onChangeText={setLastName}
          />
          <Text>Employee email:</Text>
          <TextInput
            style={styles.modalInput}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />

          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => {
              if (firstName && lastName && email) {
                updateEmployees(firstName, lastName, email);
                setModalVisible(!modalVisible);
              } else {
                Alert.alert(
                  "Must provide first name, last name, and email to add employee"
                );
              }
            }}
          >
            <Text style={styles.textStyle}>Submit</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    marginB: 20,
    backgroundColor: "#FFFAFA",
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
  button: {
    borderRadius: 10,
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

export default AddEmployeeModal;
