import React, { useState } from "react";
import { Text, View, StyleSheet, Modal } from "react-native";
import { Rating } from "react-native-ratings";

const RatingModal = ({
  ratingModalVisible,
  setRatingModalVisible,
  setRating,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={ratingModalVisible}
      onRequestClose={() => {
        Alert.alert("Modal has been closed.");
        setRatingModalVisible(!ratingModalVisible);
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.textStyle}>Rate Task:</Text>
          <Rating
            type="custom"
            startingValue={3}
            onFinishRating={setRating}
            style={{ padding: 15 }}
            imageSize={30}
          />
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
  },
  modalView: {
    backgroundColor: "white",
    borderRadius: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    padding: 20,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#ACE4AA",
  },
  textStyle: {
    color: "black",
    textAlign: "center",
  },
  modalText: {
    textAlign: "center",
  },
});

export default RatingModal;
