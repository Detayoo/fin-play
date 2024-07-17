import { useQuery } from "@tanstack/react-query";

import {
  BareResponse,
  IGetInvitees,
  IGetRewards,
  IGetTiers,
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
  confirmPassword,
  token,
}: {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
  token: TokenType;
}) => {
  const { data } = await authenticatedRequest(token).patch<BareResponse>(
    "/settings/password",
    { oldPassword, newPassword, confirmPassword }
  );
  return data;
};

export const changePinFn = async ({
  oldPin,
  newPin,
  confirmPin,
  token,
}: {
  oldPin: string;
  newPin: string;
  confirmPin: string;
  token: TokenType;
}) => {
  const { data } = await authenticatedRequest(token).patch<BareResponse>(
    "/settings/pin",
    { oldPin, newPin, confirmPin }
  );
  return data;
};

export const getTiersFn = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get<IGetTiers>(
    "/settings/tier"
  );
  return data;
};

export const getInviteesFn = async ({
  token,
  page,
  perPage,
}: {
  token: TokenType;
  page: number;
  perPage: number;
}) => {
  const params: any = {};

  if (page) {
    params.page = page;
  }

  if (perPage) {
    params.perPage = perPage;
  }

  const { data } = await authenticatedRequest(token).get<IGetInvitees>(
    "settings/referal/invitees",
    { params }
  );
  return data;
};
