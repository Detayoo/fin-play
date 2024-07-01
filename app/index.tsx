import { useEffect, useState } from "react";
import { Image, View, Text, Button, StyleSheet } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { sizes } from "@/constants";
import { router } from "expo-router";
import { PrimaryButton, ToastComponent } from "@/components";

export const data = [
  {
    title: "Instantly transfer money to friends and family.",
    image: require("../assets/images/welcome-image.png"),
    height: sizes.WINDOW_HEIGHT * 0.5,
    isImage: true,
  },
  {
    title: "Pay all your bills quickly and easily.",
    image: require("../assets/images/icon.png"),
    // width: sizes.WINDOW_HEIGHT * 0.466 * 0.906,
    height: sizes.WINDOW_HEIGHT * 0.5,

    isImage: true,
  },
  {
    title: "Save smarter and reach your financial goals.",
    image: require("../assets/images/icon.png"),
    // width: sizes.WINDOW_HEIGHT * 0.5,
    height: sizes.WINDOW_HEIGHT * 0.5,
    isImage: true,
  },
];

export default function WelcomeScreen() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const rotation = useSharedValue("0deg");

  const rotationStyle = useAnimatedStyle(() => {
    return {
      transform: [{ rotate: rotation.value }],
    };
  });

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
        <Text
          style={{
            fontSize: 16,
          }}
        >
          {item?.title}
        </Text>
        {item?.isImage ? (
          <Image
            source={item?.image}
            style={{
              width: item?.width,
              height: item?.height,
            }}
            resizeMode="contain"
          />
        ) : (
          <View style={{ height: "auto" }}>
            <Animated.View>
              {/* <ImageBackground
                source={images.welcomeRedBg}
                style={styles.gifBg}
                resizeMode="contain"
              > */}
              {/* <Image source={} style={styles.analyticsGif} /> */}
              <Text>Real-Time Analytics Made Simple</Text>
              {/* </ImageBackground> */}
            </Animated.View>
          </View>
        )}
      </View>
    );
  };

  return (
    <View style={{ padding: 0, height: "100%" }}>
      {/* <ImageBackground
        source={images.welcomeBg}
        style={styles.bgImage}
        resizeMode="contain"
      > */}
      <View style={{}}>
        {/* <AppText style={styles.logoText}>BetaMoney</AppText> */}
        {/* <Dots activeIndex={carouselIndex} length={data?.length} /> */}
        <Text> ...</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Carousel
          loop={false}
          width={sizes.WINDOW_WIDTH - 40}
          autoPlay={true}
          autoPlayInterval={1500}
          data={data}
          onSnapToItem={(index) => setCarouselIndex(index)}
          renderItem={renderScrollContent}
          pagingEnabled
        />
      </View>
      <View style={styles.btnContainer}>
        <PrimaryButton label="Create an account" />
        <PrimaryButton variant="outline" label="Login" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    gap: 15,
  },
});
