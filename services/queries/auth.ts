import { LoginResponse, LoginType } from "@/types";
import { authenticatedRequest } from "../api";

export const loginFn = async ({
  email,
  password,
  token,
}: {
  email: string;
  password: string;
  token: string | null;
}) => {
  const { data } = await authenticatedRequest(token).post<LoginResponse>(
    "/auth/login",
    {
      email,
      password,
    }
  );

  return { data };
};

export const registerFn = async () => {
  // const { data } = await authenticatedApi().post("/", {});
};
