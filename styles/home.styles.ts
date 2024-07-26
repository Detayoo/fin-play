import { StyleSheet } from "react-native";

import { globalStyles } from "@/globalStyles";

export const homeStyles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingBottom: 15,
    borderBottomWidth: 0.3,
    borderColor: "#00000040",
    marginHorizontal: -16,
    paddingHorizontal: 16,
    paddingVertical: 15,
  },
  extras: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },
  scrollView: {
    paddingVertical: 20,
  },
  balanceBg: {
    width: "100%",
    height: 131,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    resizeMode: "cover",
  },
  moneyActions: {
    flexDirection: "row",
    gap: 5,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 22,
    paddingVertical: 17,
    backgroundColor: "#fff",
    borderRadius: 10,

    // backgroundColor: "white",
    // borderRadius: 8,
    padding: 16,
    // marginHorizontal: 2,
    marginBottom: 20,
    ...globalStyles.shadow,
  },

  carouselContainer: {
    flex: 1,
    alignItems: "center",
    width: "100%",
  },

  servicesContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: "#ABABAB1A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 4,
    shadowRadius: 1,
    elevation: 2,
    marginTop: 20,
    paddingVertical: 14,
    paddingHorizontal: 14,
  },
});
