import { IGetMainBalance, IGetUserAccountDetails, TokenType } from "@/types";
import { authenticatedRequest } from "../api";

export const getUserMainBalanceFn = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get<IGetMainBalance>(
    "/balance"
  );
  return data;
};

export const getUserAccountDetailsFn = async ({
  token,
}: {
  token: TokenType;
}) => {
  const { data } = await authenticatedRequest(
    token
  ).get<IGetUserAccountDetails>("/wallet/account");
  return data;
};
