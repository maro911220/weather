import { View, Text, ScrollView } from "react-native";
import { Fontisto } from "@expo/vector-icons";

export default DayTime = ({ date, icons, styles }) => {
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
