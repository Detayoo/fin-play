import { SafeAreaView, StyleSheet } from "react-native";

export const DashboardLayout = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <SafeAreaView style={styles.container}>{children}</SafeAreaView>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 16,
  },
});
