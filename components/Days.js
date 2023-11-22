import { View, Text } from "react-native";
import { Fontisto } from "@expo/vector-icons";

export default Days = ({ days, icons, styles }) => {
  return (
    <View style={styles.day}>
      <Text style={styles.textBase}>{new Date().toLocaleDateString()}</Text>
      <View style={styles.dayMain}>
        <Fontisto
          name={icons[days[0].weather[0].main]}
          size={42}
          color="white"
        />
        <Text style={styles.dayMainTitle}>
          {parseFloat(days[0].temp.day).toFixed(1)}°
        </Text>
      </View>
      <View style={styles.dayMainSub}>
        <View style={styles.row}>
          <Text style={styles.textBase}>최저온도</Text>
          <Text style={styles.textBase}>
            {parseFloat(days[0].temp.min).toFixed(1)}°
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBase}>최대온도</Text>
          <Text style={styles.textBase}>
            {parseFloat(days[0].temp.max).toFixed(1)}°
          </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textBase}>체감온도</Text>
          <Text style={styles.textBase}>
            {parseFloat(days[0].feels_like.day).toFixed(1)}°
          </Text>
        </View>
      </View>
      {/* <Text>{days[0].weather[0].description}</Text> */}
      <View style={styles.dayDetail}>
        <View>
          <Text>예상 강수량</Text>
          <Text>
            {days[0].rain == null ? 0 : parseFloat(days[0].rain).toFixed(0)}
            mm
          </Text>
        </View>
      </View>
      <View></View>
    </View>
  );
};
