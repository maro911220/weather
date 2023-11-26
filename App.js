import axios from "axios";
import styles from "./Style";
import { API_KEY } from "@env";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  Alert,
  Linking,
  ScrollView,
  BackHandler,
  RefreshControl,
} from "react-native";
// components
import Navs from "./components/Navs";
import Days from "./components/Days";
import DayTime from "./components/DayTime";
import DayWeek from "./components/DayWeek";
import Loadings from "./components/Loadings";

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
  const [refreshing, setRefreshing] = useState(false);

  // reset
  const reset = () => {
    setDays();
    setDate();
  };

  // getWeather
  const getWeather = async (citys, latitude, longitude) => {
    reset();
    // city
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
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  // LocalLoad
  const LocalLoad = async () => {
    // loaction request
    let timer = setTimeout(() => {
      Alert.alert("ERROR", "Failed to load data Please re-run the app", [
        { text: "Close", onPress: () => BackHandler.exitApp() },
        { text: "Reload", onPress: () => onRefresh() },
      ]);
      return true;
    }, 10000);
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

    clearTimeout(timer);
    getWeather(citys, latitude, longitude);
  };

  // refresh
  const onRefresh = useCallback(() => {
    reset();
    LocalLoad();
  }, []);

  // first load
  useEffect(() => {
    LocalLoad();
  }, []);

  return ok ? (
    <View style={styles.container}>
      {!days || !date ? (
        <Loadings styles={styles} />
      ) : (
        <View style={styles.wrap}>
          <Navs city={city} styles={styles} getWeather={getWeather} />
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.weather}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            {days && <Days days={days} icons={icons} styles={styles} />}
            {date && <DayTime date={date} icons={icons} styles={styles} />}
            {days && <DayWeek days={days} icons={icons} styles={styles} />}
            <View style={styles.github}>
              <Fontisto name="github" style={styles.githubIcon} />
              <Text
                style={styles.githubText}
                onPress={() => Linking.openURL(`https://github.com/maro911220`)}
              >
                Maro911220 Github
              </Text>
            </View>
          </ScrollView>
        </View>
      )}
      <StatusBar backgroundColor="#17181A" style="light" />
    </View>
  ) : (
    <Disagree styles={styles} />
  );
}
