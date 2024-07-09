import { ScrollView, View } from "react-native";

import { AppText, BackButton, ListItem, Screen } from "@/components";
import { Image } from "expo-image";
import { Colors } from "@/constants";
import { format } from "date-fns";

const UserProfilePage = () => {
  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BackButton />
        <AppText size="xlarge" variant="medium">
          User Profile
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#90AD0408",
            paddingHorizontal: 15,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ABABAB40",
          }}
        >
          <Image
            source={require("../assets/images/animoji.png")}
            style={{ width: 50, height: 50 }}
          />
          <AppText
            style={{ marginTop: 20 }}
            color={Colors.inputFocusBorder}
            variant="medium"
          >
            Tap to change photo
          </AppText>
          <View style={{ width: "100%", marginTop: 50 }}>
            <ListItem name="Full Name" value="Ayodele Tunde" hasBottomBorder />
            <ListItem name="Email" value="tunde@gmail.com" hasBottomBorder />
            <ListItem name="BVN" value="12345678900" hasBottomBorder />
            <ListItem
              name="Date Of Birth"
              value={format(new Date(), "do MMMM, yyyy")}
              hasBottomBorder
            />
            <ListItem
              name="Current Tier"
              value="Tier 2"
              hasBottomBorder
              hasBackgroundColor
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default UserProfilePage;
