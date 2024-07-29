import { useQuery } from "@tanstack/react-query";

import {
  BareResponse,
  IGetInvitees,
  IGetRewards,
  IGetTiers,
  ITwoFAResponse,
  ITwoFAStatusResponse,
  IUpgradeAccount,
  IUserProfile,
  LoginResponse,
  TokenType,
} from "@/types";
import { authenticatedRequest, baseRequest } from "../api";

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

export const getRewardsFn = async ({
  token,
  perPage,
  currentPage,
}: {
  token: TokenType;
  perPage?: number;
  currentPage?: unknown;
}) => {
  const params: any = {};

  if (perPage) params.perPage = perPage;
  if (currentPage) params.currentPage = currentPage;
  const { data } = await authenticatedRequest(token).get<IGetRewards>(
    "/wallet/rewards",
    { params }
  );
  return data;
};

export const upgradeAccountFn = async ({
  token,
  payload,
}: {
  token: TokenType;
  payload: { nin: string; tier: string } | FormData;
}) => {
  const { data } = await authenticatedRequest(token).post<BareResponse>(
    `/settings/tier`,
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

export const setTwoFAFn = async ({
  token,
  toggle,
  otp,
}: {
  token: TokenType;
  toggle: boolean;
  otp?: string;
}) => {
  const { data } = await authenticatedRequest(token).patch<ITwoFAResponse>(
    `/settings/2fa/toggle`,
    {
      toggle,
      otp,
    }
  );

  return data;
};

export const getTwoFAStatusFn = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get<ITwoFAStatusResponse>(
    "/settings/2fa"
  );
  return data;
};

export const validate2faOtpFn = async ({
  token,
  otp,
  loginToken,
  mode,
}: {
  token?: any;
  otp: string;
  loginToken?: string | string[];
  mode: "LOGIN" | "SETTINGS";
}) => {
  const reqType = mode === "LOGIN" ? baseRequest : authenticatedRequest(token);
  const { data } = await reqType.patch<BareResponse>(
    "/settings/2fa/verify",
    { otp },
    {
      headers: {
        "x-login-token": loginToken,
      },
    }
  );
  return data;
};

export const validate2faOtpOnLoginFn = async ({
  otp,
  loginToken,
}: {
  otp: string;
  loginToken?: string | string[];
}) => {
  const { data } = await baseRequest.post<LoginResponse>(
    `/auth/2fa/login`,
    {
      otp,
    },
    {
      headers: {
        "x-login-token": loginToken,
      },
    }
  );
  return data;
};
