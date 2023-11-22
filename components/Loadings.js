import { View, ActivityIndicator } from "react-native";

export default Loadings = ({ styles }) => {
  return (
    <View style={styles.loading}>
      <ActivityIndicator color="white" style={{ marginTop: 10 }} size="large" />
    </View>
  );
};
