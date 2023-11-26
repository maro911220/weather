import { View, Text, ScrollView } from "react-native";
import { Fontisto } from "@expo/vector-icons";

export default DayTime = ({ date, icons, styles }) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.dayTime}
    >
      {date.map(
        (day, index) =>
          index < 10 && (
            <View key={index} style={styles.dayTimeItem}>
              <Text style={styles.textBase}>
                {day.dt_txt.slice(-8).slice(0, 2)}:00
              </Text>
              <Fontisto
                name={icons[day.weather[0].main]}
                style={styles.dayTimeIcon}
              />
              <Text style={styles.dayTimeTemp}>
                {parseFloat(day.main.temp).toFixed(1)}°
              </Text>
            </View>
          )
      )}
    </ScrollView>
  );
};
