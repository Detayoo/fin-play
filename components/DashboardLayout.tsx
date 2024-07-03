import { SafeAreaView, StyleSheet, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ToastComponent } from "./ToastComponent";
import { Colors } from "@/constants";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <SafeAreaView style={styles.container}>
      <ToastComponent />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <View style={{ paddingHorizontal: 16, flex: 1 }}>{children}</View>
      </GestureHandlerRootView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: Colors.white,
  },
});
