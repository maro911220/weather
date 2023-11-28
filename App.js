import axios from "axios";
import styles from "./Style";
import { API_KEY } from "@env";
import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import { Fontisto } from "@expo/vector-icons";
import React, { useEffect, useState, useCallback } from "react";
import * as SplashScreen from "expo-splash-screen";

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

// cityData
const cityData = {
  seoul: {
    citys: "서울",
    latitudes: 37.5683,
    longitudes: 126.9778,
  },
  daegu: {
    citys: "대구",
    latitudes: 35.8,
    longitudes: 128.55,
  },
  busan: {
    citys: "부산",
    latitudes: 35.1028,
    longitudes: 129.0403,
  },
  Tokyo: {
    citys: "도쿄",
    latitudes: 35.6895,
    longitudes: 139.6917,
  },
  Washington: {
    citys: "워싱턴 D.C",
    latitudes: 38.8951,
    longitudes: -77.0364,
  },
};

// App
export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState();
  const [date, setDate] = useState();
  const [ok, setOk] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  // Get Weather
  const weather = async (name) => {
    setDays();
    setDate();
    let citys, latitudes, longitudes;
    // error check
    let timer = setTimeout(() => {
      Alert.alert(
        "오류가 발생했습니다.",
        "앱을 완전히 종료한 뒤 재실행 바랍니다.",
        [
          {
            text: "Close",
            onPress: () => {
              BackHandler.exitApp();
              return true;
            },
          },
        ]
      );
      return true;
    }, 10000);

    // Local or City
    if (name === "local") {
      const { granted } = await Location.requestForegroundPermissionsAsync();
      !granted && setOk(false);

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync({ accuracy: 5 });

      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      latitudes = latitude;
      longitudes = longitude;
      citys = location[0].district ? location[0].district : location[0].street;
    } else {
      citys = cityData[name].citys;
      latitudes = cityData[name].latitudes;
      longitudes = cityData[name].longitudes;
    }

    //get openweathermap data
    setCity(citys);
    const loc1 = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitudes}&lon=${longitudes}&exclude=alerts&appid=${API_KEY}&units=metric`;
    const loc2 = `https://api.openweathermap.org/data/2.5/forecast?lat=${latitudes}&lon=${longitudes}&appid=${API_KEY}&units=metric`;
    await axios
      .all([axios.get(loc1), axios.get(loc2)])
      .then(
        axios.spread((res1, res2) => {
          setDays(res1.data.daily);
          setDate(res2.data.list);
          clearTimeout(timer);
        })
      )
      .catch((err) => {
        console.log(err);
      });
  };

  // refresh
  const onRefresh = useCallback(() => {
    weather("local");
  }, []);

  const firstLoad = async () => {
    await SplashScreen.preventAutoHideAsync();
    await weather("local");
    await SplashScreen.hideAsync();
  };

  // first load
  useEffect(() => {
    firstLoad();
  }, []);

  return ok ? (
    <View style={styles.container}>
      {!days || !date ? (
        <Loadings styles={styles} />
      ) : (
        <View style={styles.wrap}>
          <Navs city={city} styles={styles} weather={weather} />
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
