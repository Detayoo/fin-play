import { SafeAreaView, StyleSheet, View, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastComponent } from "./ToastComponent";
import { Colors } from "@/constants";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <>
      <ToastComponent />
      <SafeAreaView style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="transparent"
          translucent
        />
        <GestureHandlerRootView style={{ flex: 1 }}>
          <View style={{ paddingHorizontal: 16, flex: 1 }}>{children}</View>
        </GestureHandlerRootView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingHorizontal: 16,
    backgroundColor: Colors.white,
    paddingTop: StatusBar.currentHeight,
  },
});
