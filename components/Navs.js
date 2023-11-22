import React, { useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import { View, Text, Modal, Pressable } from "react-native";

export default Navs = ({ city, styles }) => {
  return (
    <View style={styles.nav}>
      <Text style={styles.cityName}>{city}</Text>
      <Modals styles={styles} />
    </View>
  );
};

const Modals = ({ styles }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>TEST</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      <Text onPress={() => setModalVisible(true)}>
        <Fontisto name="nav-icon-list-a" size={14} color="white" />
      </Text>
    </>
  );
};
