import { View, Text } from "react-native";
import { Fontisto, Ionicons } from "@expo/vector-icons";

export default Days = ({ days, icons, styles }) => {
  return (
    <View style={styles.day}>
      <Text style={styles.textBase}>{new Date().toLocaleDateString()}</Text>
      <View style={styles.dayMain}>
        <Fontisto
          name={icons[days[0].weather[0].main]}
          style={styles.dayMainIcon}
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
      <View style={styles.dayDetail}>
        <View style={styles.dayDetailSub}>
          <Fontisto name="wind" style={styles.dayDetailIcon} />
          <Text style={styles.textBase}>{days[0].wind_speed} Km</Text>
        </View>
        <View style={styles.dayDetailSub}>
          <Fontisto name="umbrella" style={styles.dayDetailIcon} />
          <Text style={styles.textBase}>
            {days[0].rain == null ? 0 : parseFloat(days[0].rain).toFixed(1)}
            mm
          </Text>
        </View>
        <View style={styles.dayDetailSub}>
          <Ionicons name="water-outline" style={styles.dayDetailIcon} />
          <Text style={styles.textBase}>{days[0].humidity}%</Text>
        </View>
      </View>
      <View></View>
    </View>
  );
};
