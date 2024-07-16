import { useQuery } from "@tanstack/react-query";

import {
  BareResponse,
  IGetRewards,
  IUpgradeAccount,
  IUserProfile,
  TokenType,
} from "@/types";
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

export const upgradeAccountFn = async ({
  token,
  tier,
  payload,
}: {
  token: TokenType;
  tier: string;
  payload: FormData;
}) => {
  const { data } = await authenticatedRequest(token).post<BareResponse>(
    `/settings/tier/${tier}`,
    payload,
    { headers: { "Content-Type": "multipart/form-data" } }
  );

  return data;
};
