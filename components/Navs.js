import React, { useState } from "react";
import { Fontisto } from "@expo/vector-icons";
import { View, Text, Modal, Pressable } from "react-native";

export default Navs = ({ city, styles, getWeather }) => {
  return (
    <View style={styles.nav}>
      <Text style={styles.cityName}>{city}</Text>
      <Modals styles={styles} getWeather={getWeather} />
    </View>
  );
};

const Modals = ({ styles, getWeather }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text
              onPress={() => {
                getWeather("Washington, D.C", 38.8951, -77.0364);
                setModalVisible(!modalVisible);
              }}
            >
              Washington
            </Text>
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
