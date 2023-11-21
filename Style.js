import { StyleSheet } from "react-native";
const black = "#17181A";
const mainCol = "#00D8B2";
const white = "#fff";

export default styles2 = StyleSheet.create({
  // container
  container: {
    flex: 1,
    padding: 20,
    paddingBottom: 0,
    backgroundColor: black,
  },
  //nav
  nav: {
    paddingTop: 16,
    paddingBottom: 10,
    borderBottomWidth: 1,
    flexDirection: "row",
    alignItems: "center",
    borderBottomColor: mainCol,
    justifyContent: "space-between",
  },
  cityName: {
    color: white,
    fontSize: 16,
    fontWeight: "500",
  },
  // modal
  centeredView: {
    margin: "5%",
    width: "90%",
    height: "95%",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#333",
  },
  // disagree
  disagree: {
    flex: 1,
    alignItems: "center",
    backgroundColor: black,
    justifyContent: "center",
  },
  disagreeTitle: {
    padding: 20,
    color: white,
    fontSize: 24,
    fontWeight: "500",
    textAlign: "center",
  },
  // Loadings
  loading: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
