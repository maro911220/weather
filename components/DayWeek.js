import { View, Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";

export default DayWeek = ({ days, icons, styles }) => {
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
