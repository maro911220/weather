import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, Modal, Pressable, ScrollView } from "react-native";

export default Navs = ({ city, styles, getWeather }) => {
  return (
    <View style={styles.nav}>
      <Text style={styles.cityName}>{city}</Text>
      <Modals styles={styles} getWeather={getWeather} />
    </View>
  );
};

const localData = [
  { name: "서울", latitude: 37.5683, longitude: 126.9778 },
  { name: "대구", latitude: 35.8, longitude: 128.55 },
  { name: "부산", latitude: 35.1028, longitude: 129.0403 },
  { name: "Tokyo", latitude: 35.6895, longitude: 139.6917 },
  { name: "Washington, D.C", latitude: 38.8951, longitude: -77.0364 },
];

const Modals = ({ styles, getWeather }) => {
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
                    getWeather(loc.name, loc.latitude, loc.longitude);
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
