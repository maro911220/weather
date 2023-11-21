import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import axios from "axios";
import { API_KEY } from "@env";
import { Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import styles from "./Style";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  Linking,
  BackHandler,
  Alert,
  RefreshControl,
  Modal,
  Pressable,
} from "react-native";

// icons
const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-qusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "ligtning",
};

// App
export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState();
  const [date, setDate] = useState();
  const [ok, setOk] = useState(true);
  const [refreshingCheck, setRefreshingCheck] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  let load;

  //getWeather
  const getWeather = async () => {
    // axios load check
    load = false;
    setTimeout(() => {
      if (load === false) {
        Alert.alert("ERROR", "Failed to load data Please re-run the app", [
          { text: "Close", onPress: () => BackHandler.exitApp() },
          { text: "Reload", onPress: () => onRefresh() },
        ]);
        return true;
      }
    }, 10000);

    // loaction request
    const { granted } = await Location.requestForegroundPermissionsAsync();
    !granted && setOk(false);

    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });

    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );

    let citys = location[0].district
      ? location[0].district
      : location[0].street;

    setCity(citys);

    //get openweathermap data
    const loc1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`;
    const loc2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`;
    await axios
      .all([axios.get(loc1), axios.get(loc2)])
      .then(
        axios.spread((res1, res2) => {
          setDays(res1.data.daily);
          setDate(res2.data.list);
          load = true;
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  // refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setRefreshingCheck(refreshingCheck + 1);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    getWeather();
  }, [refreshingCheck]);

  // return
  return ok ? (
    <View style={styles.container}>
      {!days || !date ? (
        <Loadings />
      ) : (
        <View>
          <Navs city={city} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.weather}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {days && <Days days={days} />}
            {date && <DayTime date={date} />}
            {days && <DayWeek days={days} />}
          </ScrollView>
        </View>
      )}
      <StatusBar backgroundColor="#17181A" style="light" />
    </View>
  ) : (
    <Disagree />
  );
}

// components
// Navs
const Navs = ({ city }) => {
  return (
    <View style={styles.nav}>
      <Text style={styles.cityName}>{city}</Text>
      <Modals />
    </View>
  );
};

// Days
const Days = ({ days }) => {
  return (
    <View>
      <Text>{new Date().toLocaleDateString()}</Text>
      <View>
        <View>
          <Fontisto
            name={icons[days[0].weather[0].main]}
            size={32}
            color="white"
          />
          <Text>{parseFloat(days[0].temp.day).toFixed(1)}°</Text>
        </View>
        <View>
          <View>
            <Text>{parseFloat(days[0].temp.min).toFixed(1)}°</Text>
            <Text>/</Text>
            <Text>{parseFloat(days[0].temp.max).toFixed(1)}°</Text>
          </View>
          <View>
            <Text>체감온도</Text>
            <Text>{parseFloat(days[0].feels_like.day).toFixed(1)}°</Text>
          </View>
          <View>
            <Text>예상 강수량</Text>
            <Text>
              {days[0].rain == null ? 0 : parseFloat(days[0].rain).toFixed(0)}
              mm
            </Text>
          </View>
        </View>
      </View>
      <View>
        <Text>{days[0].weather[0].description}</Text>
      </View>
    </View>
  );
};

// DayTime
const DayTime = ({ date }) => {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      {date.map(
        (day, index) =>
          index < 10 && (
            <View key={index}>
              <Text>{day.dt_txt.slice(-8).slice(0, 2)}</Text>
              <Fontisto
                name={icons[day.weather[0].main]}
                size={24}
                color="#bbb"
              />
              <Text>{parseFloat(day.main.temp).toFixed(1)}°</Text>
            </View>
          )
      )}
    </ScrollView>
  );
};

// DayWeek
const DayWeek = ({ days }) => {
  return (
    <View>
      {days.map((day, index) => (
        <View key={index}>
          <View>
            <Fontisto
              name={icons[day.weather[0].main]}
              size={16}
              width={25}
              color="white"
            />
            <Text>
              {new Date(new Date().setDate(new Date().getDate() + (index + 1)))
                .toLocaleDateString()
                .slice(-8)
                .slice(0, 7)}
            </Text>
            <Text>
              /&nbsp;
              {day.rain == null ? 0 : parseFloat(day.rain).toFixed(0)}
              mm
            </Text>
          </View>

          <View>
            <Text>{parseFloat(day.temp.min).toFixed(1)}°</Text>
            <Text>/</Text>
            <Text>{parseFloat(day.temp.max).toFixed(1)}°</Text>
          </View>
        </View>
      ))}
    </View>
  );
};

// Modals
const Modals = () => {
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

// Loadings
const Loadings = () => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color="white" style={{ marginTop: 10 }} size="large" />
    </View>
  );
};

// disagree
const Disagree = () => {
  return (
    <View style={styles.disagree}>
      <Text style={styles.disagreeTitle}>
        Please agree to the use of location information service.
      </Text>
      <StatusBar backgroundColor="#17181A" style="light" />
    </View>
  );
};
