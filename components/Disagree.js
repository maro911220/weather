import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";

export default Disagree = ({ styles }) => {
  return (
    <View style={styles.disagree}>
      <Text style={styles.disagreeTitle}>
        Please agree to the use of location information service.
      </Text>
      <StatusBar backgroundColor="#17181A" style="light" />
    </View>
  );
};
