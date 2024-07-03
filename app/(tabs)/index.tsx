import { useState } from "react";
import {
  ImageBackground,
  ScrollView,
  TouchableOpacity,
  View,
} from "react-native";
import { Image } from "expo-image";
import { router } from "expo-router";

import { homeStyles as styles } from "@/styles";
import {
  AppText,
  DashboardLayout,
  EmptyComponent,
  ReusableBottomSheet,
  Services,
  TransactionIcon,
} from "@/components";
import {
  AddMoney,
  Bank,
  BigBank,
  BigUser,
  Chat,
  Copy,
  Empty,
  Notification,
  Show,
  UserHead,
} from "@/assets";
import { Colors } from "@/constants";
import { copyToClipboard, formatMoney } from "@/utils";

type StateType = {
  accountDetailsModal: boolean;
};

export default function HomeScreen() {
  const [state, setState] = useState({
    accountDetailsModal: false,
  });

  const accountNumber = "8140809078";
  console.log("state");

  const updateState = (payload: Partial<StateType>) => {
    setState({ ...state, ...payload });
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
            onPress={() =>
              updateState({
                accountDetailsModal: true,
              })
            }
            style={{ alignItems: "center" }}
          >
            <AddMoney />
            <AppText variant="medium" style={{ marginTop: 4 }}>
              Add Money
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/internal-transfer")}
            style={{ alignItems: "center" }}
          >
            <UserHead />
            <AppText variant="medium" style={{ marginTop: 4 }}>
              To Uzzy
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/bank-transfer")}
            style={{ alignItems: "center" }}
          >
            <Bank />
            <AppText variant="medium" style={{ marginTop: 4 }}>
              To Banks
            </AppText>
          </TouchableOpacity>
        </View>

        <Services />
        <View style={{ marginVertical: 40 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 30,
            }}
          >
            <AppText style={{ fontSize: 16 }} variant="medium">
              Recent Transactions
            </AppText>
            <AppText
              onPress={() => router.push("/transactions")}
              style={{ fontSize: 15 }}
              color={Colors.inputFocusBorder}
            >
              View all
            </AppText>
          </View>
          {/* <EmptyComponent message="No Transaction Found" /> */}

          <TransactionIcon
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="GLO"
          />
          <TransactionIcon
            onPress={() =>
              router.push({
                pathname: "/payment-receipt",
                params: {},
              })
            }
            status="DEBIT"
          />
        </View>
      </ScrollView>

      <ReusableBottomSheet
        snapPoints={["50%", "75%"]}
        visible={state.accountDetailsModal}
        onClose={() =>
          updateState({
            accountDetailsModal: false,
          })
        }
      >
        <View style={{ paddingTop: 20, height: 300 }}>
          <AppText size="xxlarge" variant="medium">
            Add Money
          </AppText>
          <AppText color={Colors.faintBlack} style={{ marginTop: 16 }}>
            Add money easily with your dedicated account number via internet
            banking
          </AppText>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 40,
            }}
          >
            <View
              style={{
                backgroundColor: Colors.lightGreen,
                borderRadius: 50,
                justifyContent: "center",
                alignItems: "center",
                height: 45,
                width: 45,
              }}
            >
              <AppText size="xxlarge" variant="medium">
                U
              </AppText>
            </View>

            <View style={{ marginLeft: 10 }}>
              <AppText size="small">Account Number</AppText>
              <AppText size="xlarge" variant="medium">
                {accountNumber}
              </AppText>
            </View>
            <TouchableOpacity
              onPress={() => copyToClipboard(accountNumber)}
              style={{
                marginLeft: "auto",
                backgroundColor: Colors.lightGreen,
                borderRadius: 50,
                paddingVertical: 10,
                paddingHorizontal: 15,
                flexDirection: "row",
                gap: 5,
                alignItems: "center",
              }}
            >
              <AppText size="small">Copy</AppText>
              <View style={{ marginTop: 4 }}>
                <Copy />
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <BigBank />
            <View style={{ marginLeft: 10 }}>
              <AppText size="small">Bank Name</AppText>
              <AppText size="xlarge" variant="medium">
                Uzzy App
              </AppText>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 30,
            }}
          >
            <BigUser />
            <View style={{ marginLeft: 10 }}>
              <AppText size="small">Account Name</AppText>
              <AppText size="xlarge" variant="medium">
                AYODELE TUNDE SAMUEL
              </AppText>
            </View>
          </View>
        </View>
      </ReusableBottomSheet>
    </DashboardLayout>
  );
}
