import {
  BareResponse,
  LoginResponse,
  LoginType,
  RegistrationResponse,
  RegistrationType,
  TokenType,
} from "@/types";
import { authenticatedRequest, baseRequest } from "../api";

export const loginFn = async ({
  email,
  password,
}: {
  email: string | undefined;
  password: string | undefined;
}) => {
  const { data } = await baseRequest.post<LoginResponse>("/auth/login", {
    email,
    password,
  });

  return { data };
};

export const registerFn = async ({
  email,
  fullName,
  password,
}: RegistrationType) => {
  const { data } = await baseRequest.post<RegistrationResponse>(
    "/auth/register",
    {
      email,
      fullName,
      password,
    }
  );
  return data;
};

export const verifyAccountFn = async ({
  token,
  otp,
}: {
  token: TokenType;
  otp: string;
}) => {
  const { data } = await authenticatedRequest(token).patch("/auth/otp/verify", {
    otp,
  });
  return data;
};

export const verifyBVNFn = async ({
  token,
  bvn,
  dob,
}: {
  token: TokenType;
  bvn: string;
  dob: string;
}) => {
  const { data } = await authenticatedRequest(token).post<BareResponse>(
    "/auth/bvn",
    {
      bvn,
      dob,
    }
  );
  return data;
};

export const resendOTPFn = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get("/auth/otp/send");
  return data;
};

export const forgotPasswordFn = async ({ email }: { email: string }) => {
  const { data } = await baseRequest.post("/auth/password/forgot", { email });
  return data;
};

export const verifyForgotPasswordOTPFn = async ({ otp }: { otp: string }) => {
  //new one
  const { data } = await baseRequest.patch("/auth/otp/verify", {
    otp,
  });
  return data;
};

export const setTransactionPinFn = async ({
  token,
  pin,
  confirmPin,
}: {
  token: TokenType;
  pin: string;
  confirmPin: string;
}) => {
  const { data } = await authenticatedRequest(token).patch<BareResponse>(
    "/auth/pin",
    { pin, confirmPin }
  );
  return data;
};

export const resetPasswordFn = async ({
  newPassword,
  confirmPassword,
}: {
  newPassword: string;
  confirmPassword: string;
}) => {
  const { data } = await baseRequest.post<BareResponse>(
    "/auth/password/reset",
    { newPassword, confirmPassword }
  );
  return data;
};
