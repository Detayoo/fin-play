import { useEffect, useState } from "react";
import {
  ImageBackground,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
} from "react-native-reanimated";

import { homeStyles as styles } from "@/styles";
import {
  AppText,
  DashboardLayout,
  Dot,
  ReusableBottomSheet,
  Services,
  showToast,
} from "@/components";
import { AddMoney, Bank, Chat, Notification, Show, UserHead } from "@/assets";
import { Colors, sizes } from "@/constants";
import { formatMoney } from "@/utils";
import Carousel from "react-native-reanimated-carousel";

type StateType = {
  accountDetailsModal: boolean;
};

const data = [
  {
    title: "Instantly transfer money to friends and family.",
    image: require("../../assets/images/welcome-image.png"),
    width: "100%",
    height: sizes.WINDOW_HEIGHT * 0.5,
    isImage: true,
  },
  {
    title: "Pay all your bills quickly and easily.",
    image: require("../../assets/images/welcome-image.png"),
    width: "100%",
    height: sizes.WINDOW_HEIGHT * 0.54,
    isImage: true,
  },
  {
    title: "Save smarter and reach your financial goals.",
    image: require("../../assets/images/welcome-image.png"),
    width: "100%",
    height: sizes.WINDOW_HEIGHT * 0.5,
    isImage: true,
  },
];

export default function HomeScreen() {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [visible, setVisible] = useState(false);
  const rotation = useSharedValue("0deg");
  const [state, setState] = useState({
    accountDetailsModal: false,
  });

  const handleToast = () => {
    setVisible(true);
    showToast("success", "YAYY");
  };

  console.log("visi", visible);
  const updateState = (payload: Partial<StateType>) => {
    setState({ ...payload, ...state });
  };

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

  console.log(state);
  return (
    <DashboardLayout>
      <View style={styles.userCard}>
        <View style={{ flexDirection: "row", gap: 12, alignItems: "center" }}>
          <Image
            source={require("../../assets/images/animoji.png")}
            style={{ width: 50, height: 50 }}
          />
          <View>
            <AppText style={{ fontSize: 12 }}>Welcome Back!</AppText>
            <AppText size="xxlarge" variant="medium">
              Ayodele Tunde
            </AppText>
          </View>
        </View>

        <View style={styles.extras}>
          <Chat />
          <Notification />
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View
          style={{
            borderRadius: 5,
            overflow: "hidden",
          }}
        >
          <ImageBackground
            source={require("../../assets/images/balance-background.png")}
            style={styles.balanceBg}
          >
            <View
              style={{ flexDirection: "row", alignItems: "center", gap: 12 }}
            >
              <Show />
              <AppText color={Colors.white}>Wallet Balance</AppText>
            </View>
            <AppText
              style={{ marginTop: 20 }}
              color={Colors.white}
              variant="medium"
              size="xxlarge"
            >
              NGN {formatMoney("500000")}
            </AppText>
          </ImageBackground>
        </View>

        <View style={styles.moneyActions}>
          <TouchableOpacity
            onPress={handleToast}
            style={{ alignItems: "center" }}
          >
            <AddMoney />
            <AppText variant="medium" style={{ marginTop: 4 }}>
              Add Money
            </AppText>
          </TouchableOpacity>
          <Pressable style={{ alignItems: "center" }}>
            <UserHead />
            <AppText variant="medium" style={{ marginTop: 4 }}>
              To Uzzy
            </AppText>
          </Pressable>
          <Pressable style={{ alignItems: "center" }}>
            <Bank />
            <AppText variant="medium" style={{ marginTop: 4 }}>
              To Banks
            </AppText>
          </Pressable>
        </View>

        {/* <View style={styles.servicesContainer}>
          <View style={styles.carouselContainer}>
            <AppText
              size="large"
              variant="medium"
              style={{ alignSelf: "flex-start" }}
            >
              Services
            </AppText>
            <Carousel
              loop={false}
              width={sizes.WINDOW_WIDTH}
              height={240}
              autoPlay={true}
              autoPlayInterval={1500}
              data={data}
              onSnapToItem={(index) => setCarouselIndex(index)}
              renderItem={renderScrollContent}
              pagingEnabled
              style={{ marginTop: 24 }}
            />
            <Dot activeIndex={carouselIndex} length={data?.length} />
          </View>
        </View> */}
        <Services />
      </ScrollView>
      {/* <ReusableBottomSheet visible={visible} setVisible={setVisible}>
        <View style={{ paddingVertical: 16 }}></View>
        <AppText>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Labore
          dolorum distinctio incidunt eius quidem quibusdam accusantium iure
          maiores deleniti voluptatum tempore laudantium officia accusamus earum
          amet reprehenderit assumenda vitae adipisci non consequuntur tempora,
          ipsam, recusandae numquam rerum! Nesciunt qui eaque consequatur,
          totam, quo consectetur officia provident temporibus at cumque
          perferendis harum blanditiis quasi dolorum, doloribus pariatur aliquam
          ex similique molestias quidem! Odio cumque quo, commodi reiciendis
          repellat ut et ullam quisquam eum sint fugiat quod, perspiciatis
          corrupti provident voluptatibus amet modi vitae dignissimos esse hic!
          Adipisci excepturi voluptatibus tenetur fugiat mollitia deserunt
          facilis dignissimos dolorem nam. Repellat consectetur qui, provident
          vero modi, temporibus velit voluptatibus repudiandae asperiores,
          deserunt alias ad recusandae natus sapiente ullam corporis rerum nemo.
          Unde pariatur consequatur, adipisci ad quos autem iure dolorem placeat
          ipsam quaerat perspiciatis at molestias quae neque voluptatem! Ipsum
          voluptatibus maxime ullam corrupti nostrum ducimus eveniet, blanditiis
          odio repellendus aliquid impedit autem delectus harum esse illo
          reprehenderit. Facere omnis cum accusantium! Fugiat ducimus amet
          repellat deleniti eligendi nemo omnis id minus reiciendis perspiciatis
          molestiae ea laboriosam doloribus aperiam culpa, accusantium sequi
          voluptatibus velit dolore, necessitatibus, voluptas a! Enim inventore
          minima itaque fugiat sit amet sint aut quod expedita, eveniet quidem
          consequuntur impedit mollitia vel ratione. Harum sint ab sequi. A
          nostrum adipisci dolore harum voluptatum ad! Quibusdam atque ipsa
          animi commodi odit praesentium, repellendus neque quisquam ex alias
          eaque tempore quis saepe cupiditate nostrum beatae maiores dolores!
          Beatae omnis cum qui eveniet, non similique esse quibusdam, blanditiis
          hic aperiam ipsum. Quos totam, voluptatum obcaecati repellat
          aspernatur consequatur voluptatem magni ipsam sint officia eum at,
          architecto officiis, eius adipisci debitis numquam vel quia quod ex
          nam commodi. Cumque excepturi nihil cupiditate accusamus, earum
          distinctio illum blanditiis perspiciatis optio aperiam eveniet vel
          ipsam hic, officiis, ullam magnam placeat assumenda provident neque
          odio! Provident rem nihil corrupti impedit, harum eius vel eveniet ab
          dolorum dicta quasi facilis deserunt natus recusandae. Enim laboriosam
          incidunt odio exercitationem sit assumenda id temporibus nemo velit
          tempore ratione, illum aperiam consectetur, beatae mollitia molestias
          numquam inventore explicabo quaerat, necessitatibus sed fugit eius.
          Quia quisquam explicabo nesciunt tenetur blanditiis similique quaerat
          id iure possimus voluptatem aliquam saepe nobis, magni hic ipsa
          suscipit optio corrupti, alias officiis repudiandae consequuntur
          aliquid veritatis. Magni odio neque fugiat cum praesentium odit,
          maiores asperiores reiciendis suscipit eveniet, nulla deserunt. Iure
          necessitatibus animi assumenda consequuntur exercitationem facere
          fugiat amet dolore similique debitis totam odio ea veniam reiciendis
          accusantium aliquid itaque libero quod, rem ipsa placeat aspernatur
          iste voluptates velit. Esse, cumque consectetur magnam reiciendis
          minima autem ab blanditiis! Cumque, corporis! Qui fuga voluptates
          saepe est! Dicta dolore, quod corrupti natus harum accusantium optio
          tempora sint iste quaerat enim, qui ad impedit molestiae provident
          odio voluptate laborum vero porro! Ipsa iusto vel praesentium enim ea
          voluptate. Repellat quisquam omnis nulla, veniam quas eligendi nostrum
          culpa, modi facilis sequi tenetur totam eos expedita tempora corrupti
          perspiciatis ipsa commodi porro ipsam molestiae aspernatur. Mollitia
          doloribus praesentium cupiditate officiis et commodi debitis iure
          maxime itaque aspernatur enim, facilis aliquid corporis, molestiae
          possimus!
        </AppText>
      </ReusableBottomSheet> */}
    </DashboardLayout>
  );
}
