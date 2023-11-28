import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Modal, Pressable, ScrollView } from "react-native";

export default Navs = ({ city, styles, weather }) => {
  return (
    <View style={styles.nav}>
      <Text style={styles.cityName}>{city}</Text>
      <Modals styles={styles} weather={weather} />
    </View>
  );
};

const localData = [
  { name: "seoul" },
  { name: "daegu" },
  { name: "busan" },
  { name: "Tokyo" },
  { name: "Washington" },
];

const Modals = ({ styles, weather }) => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.modal}
      >
        <View style={styles.centeredView}>
          <Pressable
            style={styles.modalClose}
            onPress={() => setModalVisible(!modalVisible)}
          >
            <Ionicons name="close-outline" size={32} color="white" />
          </Pressable>
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.modalView}
          >
            {localData.map((loc, index) => {
              return (
                <Pressable
                  key={index}
                  style={styles.modalItem}
                  onPress={() => {
                    weather(loc.name);
                    setModalVisible(!modalVisible);
                  }}
                >
                  <Ionicons
                    name="location-outline"
                    style={styles.modalItemIcon}
                  />
                  <Text style={styles.modalItemText}>{loc.name}</Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>
      </Modal>
      <Text onPress={() => setModalVisible(true)}>
        <Ionicons name="ios-menu-outline" size={26} color="white" />
      </Text>
    </>
  );
};
