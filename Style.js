import { StyleSheet, Dimensions } from "react-native";

const black = "#17181A";
const darkGray = "#26282e";
const mainCol = "#8894ff";
const white = "#fff";
const gray = "#d7e2ff";
const fullWidth = Dimensions.get("window").width;
const fullHeight = Dimensions.get("window").height;

export default styles2 = StyleSheet.create({
  // default
  textBase: {
    color: gray,
  },
  textPoint: {
    color: mainCol,
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
  wrap: {
    flex: 1,
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
    marginTop: 60,
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
    fontSize: 54,
    color: mainCol,
    fontWeight: "bold",
  },
  dayMainIcon: {
    color: gray,
    fontSize: 54,
  },
  dayMainSub: {
    gap: 10,
    flexDirection: "row",
  },
  // dayDetail
  dayDetail: {
    width: "100%",
    marginTop: 60,
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    backgroundColor: darkGray,
    justifyContent: "space-around",
  },
  dayDetailSub: {
    gap: 8,
    flexDirection: "row",
  },
  dayDetailIcon: {
    color: gray,
    fontSize: 20,
  },
  // dayTime
  dayTime: {
    marginTop: 30,
    width: "100%",
    borderRadius: 12,
    paddingVertical: 16,
    flexDirection: "row",
    backgroundColor: darkGray,
  },
  dayTimeItem: {
    gap: 4,
    alignItems: "center",
    justifyContent: "center",
    width: (fullWidth - 40) / 5,
  },
  dayTimeTemp: {
    fontSize: 16,
    color: white,
  },
  dayTimeIcon: {
    color: gray,
    fontSize: 24,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: mainCol,
  },
  // dayWeek
  dayWeek: {
    marginTop: 30,
    marginBottom: 20,
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 12,
    backgroundColor: darkGray,
  },
  dayWeekItem: {
    paddingVertical: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dayWeekSub: {
    gap: 4,
    alignItems: "center",
    flexDirection: "row",
  },
  dayWeekIcon: {
    width: 24,
    color: gray,
    fontSize: 16,
  },
  dayWeekDate: {
    width: 90,
    color: gray,
    fontSize: 14,
  },
  // github
  github: {
    gap: 10,
    marginBottom: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  githubText: {
    color: white,
    textAlign: "center",
  },
  githubIcon: {
    fontSize: 16,
    color: white,
  },
  // modal
  modal: {
    width: "100%",
    height: "100%",
  },
  centeredView: {
    bottom: 0,
    padding: 20,
    borderWidth: 1,
    borderRadius: 10,
    width: fullWidth - 2,
    position: "absolute",
    borderColor: mainCol,
    backgroundColor: black,
    height: fullHeight - 30,
    borderBottomEndRadius: 0,
    borderBottomStartRadius: 0,
  },
  modalView: {
    gap: 10,
    marginTop: 40,
    flexWrap: "wrap",
  },
  modalItem: {
    gap: 4,
    flex: 1,
    padding: 12,
    color: gray,
    width: "100%",
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: darkGray,
  },
  modalClose: {
    top: 12,
    right: 12,
    zIndex: 9,
    position: "absolute",
  },
  modalItemIcon: {
    color: gray,
    fontSize: 20,
  },
  modalItemText: {
    color: white,
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
