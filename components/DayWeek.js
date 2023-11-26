import { View, Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";

export default DayWeek = ({ days, icons, styles }) => {
  return (
    <View style={styles.dayWeek}>
      {days.map((day, index) => (
        <View key={index} style={styles.dayWeekItem}>
          <View style={styles.dayWeekSub}>
            <Fontisto
              name={icons[day.weather[0].main]}
              style={styles.dayWeekIcon}
            />
            <Text style={styles.dayWeekDate}>
              {new Date(new Date().setDate(new Date().getDate() + (index + 1)))
                .toLocaleDateString()
                .slice(0, -1)}
            </Text>
            <Text style={styles.textPoint}>/</Text>
            <Text style={styles.textBase}>
              {day.rain == null ? 0 : parseFloat(day.rain).toFixed(0)}
              mm
            </Text>
          </View>

          <View style={styles.dayWeekSub}>
            <Text style={styles.textBase}>
              {parseFloat(day.temp.min).toFixed(1)}°
            </Text>
            <Text style={styles.textPoint}>/</Text>
            <Text style={styles.textBase}>
              {parseFloat(day.temp.max).toFixed(1)}°
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
};
