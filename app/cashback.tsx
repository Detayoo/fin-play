import { ScrollView, View } from "react-native";
import { useQueries } from "@tanstack/react-query";

import { AppText, BackButton, Loading, Screen } from "@/components";
import { useAuth } from "@/context";
import { getRewardsFn } from "@/services";

const CashbackPage = () => {
  const { token } = useAuth();
  const [rewardsData] = useQueries({
    queries: [
      {
        queryKey: ["rewards"],
        queryFn: () =>
          getRewardsFn({
            token,
          }),
      },
    ],
  });

  console.log(rewardsData);
  return (
    <Screen>
      <View style={{}}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          <BackButton />
          <AppText size="xlarge" variant="medium">
            Cashback
          </AppText>
          <BackButton
            style={{
              opacity: 0,
            }}
          />
        </View>
      </View>
      {rewardsData?.isFetching ? <Loading /> : <ScrollView></ScrollView>}
    </Screen>
  );
};

export default CashbackPage;
