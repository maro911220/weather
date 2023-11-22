import axios from "axios";
import styles from "./Style";
import { API_KEY } from "@env";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  ScrollView,
  Linking,
  BackHandler,
  Alert,
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
  const [refreshingCheck, setRefreshingCheck] = useState(1);
  const [refreshing, setRefreshing] = useState(false);

  //getWeather
  const getWeather = async () => {
    // axios load check
    let load = false;
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

  return ok ? (
    <View style={styles.container}>
      {!days || !date ? (
        <Loadings styles={styles} />
      ) : (
        <View>
          <Navs city={city} styles={styles} />
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
          </ScrollView>
        </View>
      )}
      <StatusBar backgroundColor="#17181A" style="light" />
    </View>
  ) : (
    <Disagree styles={styles} />
  );
}
