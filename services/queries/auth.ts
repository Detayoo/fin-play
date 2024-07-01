import { authenticatedRequest } from "../api";

export const loginFn = async ({
  email,
  password,
}: {
  email: string;
  password: string;
}) => {
  const instance = await authenticatedRequest();

  const res = instance.post("/auth/login", {
    email,
    password,
  });

  return res;
};
