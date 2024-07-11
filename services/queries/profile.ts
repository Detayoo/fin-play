import { useQuery } from "@tanstack/react-query";

import { IGetRewards, IUserProfile, TokenType } from "@/types";
import { authenticatedRequest } from "../api";

export const getUserProfileFn = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get<IUserProfile>(
    "/settings/profile"
  );
  return data;
};

export const useR = ({ token }: { token: TokenType }) => {
  return useQuery({
    queryKey: ["user profile"],
    queryFn: () =>
      getUserProfileFn({
        token,
      }),
    enabled: !!token,
  });
};

export const getRewardsFn = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get<IGetRewards>(
    "/wallet/rewards"
  );
  return data;
};
