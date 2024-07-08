import { useEffect, useState } from "react";
import { Image, View, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import {
  useSharedValue,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { Colors, sizes } from "@/constants";
import { AppText, Dot, PrimaryButton, Screen } from "@/components";
import { router } from "expo-router";

export const data = [
  {
    title: "Instantly transfer money to friends and family.",
    image: require("../assets/images/welcome-image.png"),
    width: "100%",
    height: sizes.WINDOW_HEIGHT * 0.5,
    isImage: true,
  },
  {
    title: "Pay all your bills quickly and easily.",
    image: require("../assets/images/welcome-image.png"),
    width: "100%",
    height: sizes.WINDOW_HEIGHT * 0.54,
    isImage: true,
  },
  {
    title: "Save smarter and reach your financial goals.",
    image: require("../assets/images/welcome-image.png"),
    width: "100%",
    height: sizes.WINDOW_HEIGHT * 0.5,
    isImage: true,
  },
];

export default function WelcomeScreen() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const rotation = useSharedValue("0deg");

  // const rotationStyle = useAnimatedStyle(() => {
  //   return {
  //     transform: [{ rotate: rotation.value }],
  //   };
  // });

  useEffect(() => {
    rotation.value = withRepeat(
      withTiming("-15deg", { duration: 1000 }),
      -1,
      true
    );
  }, []);

  const renderScrollContent = ({ item }: { item: any }) => {
    return (
      <View style={{ flex: 1 }}>
        <Image
          source={item?.image}
          style={{
            width: item?.width,
            height: item?.height,
          }}
          resizeMode="contain"
        />
        <AppText
          style={{
            fontSize: 20,
            color: Colors.primary,
            marginHorizontal: "auto",
            width: 245,
            textAlign: "center",
            marginTop: 36,
          }}
          variant="medium"
        >
          {item?.title}
        </AppText>
      </View>
    );
  };

  return (
    <Screen>
      <View
        style={{ padding: 0, height: "100%", backgroundColor: Colors.white }}
      >
        <View style={styles.carouselContainer}>
          <Carousel
            loop={false}
            width={sizes.WINDOW_WIDTH}
            autoPlay={true}
            autoPlayInterval={1500}
            data={data}
            onSnapToItem={(index) => setCarouselIndex(index)}
            renderItem={renderScrollContent}
            pagingEnabled
          />
          <Dot activeIndex={carouselIndex} length={data?.length} />
        </View>
        <View style={styles.btnContainer}>
          <PrimaryButton
            onPress={() => router.push("/registration")}
            label="Create an account"
          />
          <PrimaryButton
            onPress={() => router.push("/login")}
            variant="outline"
            label="Login"
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: -1990,
    paddingHorizontal: -200,
  },
  btnContainer: {
    marginTop: 50,
    gap: 15,
    paddingHorizontal: 16,
  },
});
