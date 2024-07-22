import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Pressable,
} from "react-native";
import { router } from "expo-router";

import { Colors, fonts } from "@/constants";
import { AppText } from "./AppText";
import { Airtime } from "./Airtime";
import { Data } from "./Data";
import { Education } from "./Education";
import { Electricity } from "./Electricity";
import { Cable } from "./Cable";
import { Betting } from "./Betting";
import { Smile } from "./Smile";
import { Water } from "./Water";

const { width } = Dimensions.get("window");
const COLUMNS = 4;
const ROWS = 2;
const ITEMS_PER_PAGE = COLUMNS * ROWS;
const ITEM_SIZE = width / COLUMNS - 9;

const ServiceItem = ({
  icon,
  label,
  onPress,
}: {
  icon: React.ReactNode;
  label: string;
  onPress: any;
}) => (
  <Pressable onPress={onPress} style={styles.serviceItem}>
    {icon}
    <Text style={styles.label}>{label}</Text>
  </Pressable>
);

const Service = ({
  services,
}: {
  services: { icon: React.JSX.Element; label: string }[];
}) => (
  <View style={styles.pageContainer}>
    {services.map((service: any, index: number) => (
      <ServiceItem
        onPress={() => {
          if (service.route) router.push(service.route);
        }}
        key={index}
        icon={service.icon}
        label={service.label}
      />
    ))}
  </View>
);

export const Services = () => {
  const [activePage, setActivePage] = useState(0);
  const flatListRef = useRef(null);

  const services = [
    {
      route: {
        pathname: "initiate-bill-payment",
        params: {
          type: "Airtime",
        },
      },
      icon: <Airtime />,
      label: "Airtime",
    },
    {
      route: {
        pathname: "initiate-bill-payment",
        params: {
          type: "Data",
        },
      },
      icon: <Data />,
      label: "Data",
    },
    {
      icon: <Electricity />,
      label: "Electricity",
      route: {
        pathname: "/buy-electricity",
        params: {
          type: "Electricity",
        },
      },
    },
    {
      icon: <Cable />,
      label: "Cable",
      route: {
        pathname: "/cable-tv",
        params: {
          type: "TV Subscription",
        },
      },
    },
    {
      icon: <Betting />,
      label: "Betting",
      route: {
        pathname: "/buy-betting",
        params: {
          type: "Betting Subscription",
        },
      },
    },
    // {
    //   icon: <Education />,
    //   label: "Education",
    // },
    // {
    //   icon: <Smile />,
    //   label: "Smile Internet",
    // },
    // {
    //   icon: <Water />,
    //   label: "Water",
    // },
    // {
    //   icon: <Airtime />,
    //   label: "Airtime",
    // },
    // {
    //   icon: <Data />,
    //   label: "Data",
    // },
    // {
    //   icon: <Electricity />,
    //   label: "Electricity",
    // },
  ];

  const pages = [];
  for (let i = 0; i < services.length; i += ITEMS_PER_PAGE) {
    pages.push(services.slice(i, i + ITEMS_PER_PAGE));
  }

  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.x;
    const page = Math.round(scrollPosition / width);
    setActivePage(page);
  };

  return (
    <View style={styles.container}>
      <AppText variant="medium" style={styles.title}>
        Services
      </AppText>
      <FlatList
        ref={flatListRef}
        data={pages}
        renderItem={({ item }) => <Service services={item} />}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        snapToAlignment="start"
        snapToInterval={width}
        decelerationRate="fast"
      />
      <View style={styles.pagination}>
        {pages.map((_, index) => (
          <View
            key={index}
            style={[
              styles.paginationDot,
              index === activePage && styles.activeDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "white",
    marginTop: 20,
    borderRadius: 10,
    shadowColor: "#ABABAB1A",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 4,
    shadowRadius: 1,
    elevation: 10,
  },
  title: {
    fontSize: 16,
  },
  pageContainer: {
    width: width - 32,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  serviceItem: {
    alignItems: "center",
    width: ITEM_SIZE,
    marginBottom: 5,
    gap: 5,
    paddingVertical: 5,
    marginTop: 20,
  },
  iconContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    marginTop: 5,
    fontFamily: fonts["satoshi-medium"],
    fontSize: 12,
    textAlign: "center",
  },
  pagination: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#D3D3D3",
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: Colors.inputFocusBorder,
    width: 22,
    height: 6,
  },
});
