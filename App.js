import * as Location from "expo-location";
import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { API_KEY } from "@env";
import axios from "axios";
import { Fontisto } from "@expo/vector-icons";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Linking,
  BackHandler,
  Alert,
} from "react-native";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-qusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "ligtning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState();
  const [date, setDate] = useState();
  const [ok, setOk] = useState(true);
  let load;
  const getWeather = async () => {
    // axios load check
    load = false;
    setTimeout(() => {
      if (load === false) {
        Alert.alert("ERROR", "Failed to load data Please re-run the app", [
          { text: "CLOSE", onPress: () => BackHandler.exitApp() },
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

    setCity(location[0].street);

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
    // end
  };

  useEffect(() => {
    getWeather();
  }, []);

  return ok ? (
    <View style={styles.container}>
      {/* loading */}
      {!days || !date ? (
        <View style={styles.loading}>
          <ActivityIndicator
            color="white"
            style={{ marginTop: 10 }}
            size="large"
          />
        </View>
      ) : (
        <View style={styles.dummy}>
          <ScrollView
            // pagingEnabled
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.weather}
          >
            {/* 현재 위치 */}
            <View style={styles.city}>
              <Text style={styles.cityName}>{city}</Text>
            </View>
            {/* 오늘 날씨와 시간별 날씨 */}
            <View style={styles.mainCon}>
              {days && (
                <View style={styles.day}>
                  <Text style={styles.nowDay}>
                    {new Date().toLocaleDateString()}
                  </Text>
                  <View style={styles.daySub}>
                    <View style={styles.daySub3}>
                      <Fontisto
                        name={icons[days[0].weather[0].main]}
                        size={32}
                        color="white"
                      />
                      <Text style={styles.temp}>
                        {parseFloat(days[0].temp.day).toFixed(1)}°
                      </Text>
                    </View>
                    <View>
                      <View style={styles.daySub3}>
                        <Text style={styles.tempMin}>
                          {parseFloat(days[0].temp.min).toFixed(1)}°
                        </Text>
                        <Text style={styles.tempSub}>/</Text>
                        <Text style={styles.tempMax}>
                          {parseFloat(days[0].temp.max).toFixed(1)}°
                        </Text>
                      </View>
                      <View style={styles.daySub3}>
                        <Text style={styles.tempSub}>체감온도</Text>
                        <Text style={styles.tempSub}>
                          {parseFloat(days[0].feels_like.day).toFixed(1)}°
                        </Text>
                      </View>
                      <View style={styles.daySub3}>
                        <Text style={styles.tempSub}>예상 강수량</Text>
                        <Text style={styles.tempSub}>
                          {days[0].rain == null
                            ? 0
                            : parseFloat(days[0].rain).toFixed(0)}
                          mm
                        </Text>
                      </View>
                    </View>
                  </View>
                  <View style={styles.daySub2}>
                    <Text style={styles.dayDesc}>
                      {days[0].weather[0].description}
                    </Text>
                  </View>
                </View>
              )}
              <ScrollView
                // pagingEnabled
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.fully}
              >
                {date &&
                  date.map(
                    (day, index) =>
                      index < 10 && (
                        <View key={index} style={styles.fullyTime}>
                          <Text style={styles.fullyDetailText}>
                            {day.dt_txt.slice(-8).slice(0, 2)}
                          </Text>
                          <Fontisto
                            name={icons[day.weather[0].main]}
                            size={24}
                            color="#bbb"
                          />
                          <Text style={styles.fullyDetailText}>
                            {parseFloat(day.main.temp).toFixed(1)}°
                          </Text>
                          <Text style={styles.fullyDetailText}>
                            {day.rain == null
                              ? 0
                              : parseFloat(day.rain).toFixed(0)}
                            mm
                          </Text>
                        </View>
                      )
                  )}
              </ScrollView>
            </View>
            {/* 일별 날씨 */}
            <View style={styles.mainCon}>
              {days &&
                days.map((day, index) => (
                  <View style={styles.newDay} key={index}>
                    <View style={styles.newDayTemp}>
                      <Fontisto
                        name={icons[day.weather[0].main]}
                        size={16}
                        width={25}
                        color="white"
                      />
                      <Text style={styles.newDayDate}>
                        {new Date(
                          new Date().setDate(new Date().getDate() + (index + 1))
                        )
                          .toLocaleDateString()
                          .slice(-8)
                          .slice(0, 7)}
                      </Text>
                      <Text style={styles.rains}>
                        /&nbsp;
                        {day.rain == null ? 0 : parseFloat(day.rain).toFixed(0)}
                        mm
                      </Text>
                    </View>

                    <View style={styles.newDayTemp}>
                      <Text style={styles.tempMin}>
                        {parseFloat(day.temp.min).toFixed(1)}°
                      </Text>
                      <Text style={styles.tempSub}>/</Text>
                      <Text style={styles.tempMax}>
                        {parseFloat(day.temp.max).toFixed(1)}°
                      </Text>
                    </View>
                  </View>
                ))}
            </View>
            <Text
              style={styles.button}
              onPress={() => Linking.openURL(`https://github.com/maro911220`)}
            >
              Maro github
            </Text>
          </ScrollView>
        </View>
      )}

      <StatusBar backgroundColor="#222" style="light" />
    </View>
  ) : (
    <View style={styles.non}>
      <Text style={styles.nonTitle}>
        Please agree to the use of location information service.
      </Text>
      <StatusBar backgroundColor="#222" style="light" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: "#222",
  },
  // 미동의
  non: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222",
    justifyContent: "center",
  },
  nonTitle: {
    padding: 20,
    fontSize: 24,
    color: "#fff",
    fontWeight: "500",
    textAlign: "center",
  },
  // 로딩
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  // 스크롤 더미
  dummy: {
    flex: 1,
  },
  // 현재 위치
  city: {
    marginTop: 60,
    marginBottom: 40,
    alignItems: "center",
    justifyContent: "flex-end",
  },
  cityName: {
    fontSize: 28,
    color: "#fff",
    fontWeight: "500",
  },
  // 오늘날씨
  mainCon: {
    gap: 8,
    padding: 20,
    width: "100%",
    borderRadius: 10,
    marginVertical: 5,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  day: {
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "column",
    justifyContent: "center",
  },
  nowDay: {
    width: "100%",
    fontSize: 14,
    color: "#fff",
    justifyContent: "flex-start",
  },
  daySub: {
    width: "100%",
    marginVertical: 20,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  daySub3: {
    gap: 2,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  temp: {
    marginLeft: 6,
    fontWeight: "600",
    fontSize: 42,
    lineHeight: 42,
    color: "#fff",
  },
  tempSub: {
    fontSize: 14,
    color: "#ccc",
  },
  tempMin: {
    fontSize: 14,
    color: "#38bdf8",
  },
  tempMax: {
    fontSize: 14,
    color: "#f87171",
  },
  daySub2: {
    padding: 6,
    height: 60,
    width: "100%",
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  dayDesc: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "500",
    textTransform: "uppercase",
  },
  // 시간별 날씨
  fully: {
    width: "200%",
  },
  fullyTime: {
    gap: 4,
    width: "10%",
    alignItems: "center",
    justifyContent: "center",
  },
  fullyDetail: {
    flexDirection: "row",
  },
  fullyDetailText: {
    color: "#bbb",
    fontSize: 13,
  },
  // 일별날씨
  newDay: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  rains: {
    marginLeft: 2,
    fontSize: 12,
    color: "#ccc",
    textAlign: "right",
  },
  newDayDate: {
    fontSize: 14,
    color: "#ccc",
    fontWeight: "bold",
    justifyContent: "flex-end",
  },
  newDayTemp: {
    gap: 2,
    color: "#ccc",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-end",
  },
  // 버튼
  button: {
    fontSize: 16,
    marginTop: 12,
    color: "#fff",
    borderRadius: 6,
    marginBottom: 18,
    fontWeight: "bold",
    textAlign: "center",
    textTransform: "uppercase",
  },
});
