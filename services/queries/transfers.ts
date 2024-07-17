import {
  BareResponse,
  IGetAccountResolutionResponse,
  IGetBanks,
  IGetCharge,
  IResolveBankTransferPayload,
  IResolveInternalAccountPayload,
  ITransferResponse,
  InternalTransferPayload,
  TokenType,
  TransferToBankPayload,
} from "@/types";
import { authenticatedRequest } from "../api";

export const resolveTransferToBankFn = async ({
  token,
  payload,
}: {
  token: TokenType;
  payload: IResolveBankTransferPayload;
}) => {
  const { data } = await authenticatedRequest(
    token
  ).post<IGetAccountResolutionResponse>("/transfer/bank/account", payload);
  return data;
};

export const resolveInternalTransferFn = async ({
  token,
  payload,
}: {
  token: TokenType;
  payload: IResolveInternalAccountPayload;
}) => {
  const { data } = await authenticatedRequest(
    token
  ).post<IGetAccountResolutionResponse>("/transfer/account", payload);
  return data;
};

export const transferToBankFn = async ({
  token,
  payload,
}: {
  token: TokenType;
  payload: TransferToBankPayload;
}) => {
  const { data } = await authenticatedRequest(token).post<ITransferResponse>(
    "/transfer/bank/",
    payload
  );
  return data;
};

export const internalTransferFn = async ({
  token,
  payload,
}: {
  token: TokenType;
  payload: InternalTransferPayload;
}) => {
  const res = {
    message: "string",
    data: {
      transaction: {
        status: "string",
        paidAt: "",
        reference: "string",
        currency: "string",
        amount: "string",
        accountName: "string",
        accountNumber: "string",
        bankName: "string",
        sessionId: "string",
      },
    },
  };

  return res;
  const { data } = await authenticatedRequest(token).post<ITransferResponse>(
    "/transfer/",
    payload
  );
  return data;
};

export const getBankCodesFn = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get<IGetBanks>(
    "/transfer/bank/codes"
  );

  return data;
};

export const getChargeFn = async ({
  token,
  amount,
}: {
  token: TokenType;
  amount: string | string[] | undefined;
}) => {
  const { data } = await authenticatedRequest(token).get<IGetCharge>(
    "/charge",
    {
      params: { amount },
    }
  );
  return data;
};
