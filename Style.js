import { StyleSheet } from "react-native";
const black = "#17181A";
const mainCol = "#00D8B2";
const white = "#fff";
const gray = "#d7e2ff";

export default styles2 = StyleSheet.create({
  // default
  textBase: {
    color: gray,
    fontWeight: "500",
  },
  row: {
    flexDirection: "row",
  },
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
  // day
  day: {
    marginVertical: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  dayMain: {
    gap: 20,
    marginVertical: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  dayMainTitle: {
    color: white,
    fontSize: 54,
    fontWeight: "bold",
  },
  dayMainSub: {
    gap: 10,
    flexDirection: "row",
  },
  dayDetail: {
    padding: 12,
    width: "100%",
    marginTop: 40,
    borderWidth: 1,
    borderRadius: 16,
    borderColor: mainCol,
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
