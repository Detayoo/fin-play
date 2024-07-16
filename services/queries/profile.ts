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

export const uploadProfilePhotoFn = async ({
  token,
  photo,
}: {
  token: TokenType;
  photo: FormData;
}) => {
  const { data } = await authenticatedRequest(token).put(
    "/profile/photo",
    photo,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );

  return data;
};

export const changePasswordFn = async ({
  oldPassword,
  newPassword,
  token,
}: {
  oldPassword: string;
  newPassword: string;
  token: TokenType;
}) => {
  const { data } = await authenticatedRequest(token).patch<BareResponse>(
    "/auth/password/change",
    { oldPassword, newPassword }
  );
  return data;
};

export const changePinFn = async ({
  oldPin,
  newPin,
  token,
}: {
  oldPin: string;
  newPin: string;
  token: TokenType;
}) => {
  const { data } = await authenticatedRequest(token).patch<BareResponse>(
    "/settings/pin",
    { oldPin, newPin }
  );
  return data;
};
