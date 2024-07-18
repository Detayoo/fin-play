import {
  TokenType,
  ITransactionsList,
  IGetStats,
  IGetCashbackPoint,
} from "@/types";
import { authenticatedRequest } from "../api";

export const getAllTransactionsFn = async ({
  token,
  startDate,
  endDate,
  status,
  transactionType,
  perPage,
  currentPage,
}: {
  token: TokenType;
  startDate?: string | null;
  endDate?: string | null;
  status?: string | null;
  transactionType?: string | null;
  perPage: number;
  currentPage: number;
}) => {
  let params: any = {};

  if (startDate) {
    params.startDate = startDate;
  }

  if (endDate) {
    params.endDate = endDate;
  }

  if (status) {
    params.status = status;
  }

  if (transactionType) {
    params.transactionType = transactionType;
  }

  if (perPage) {
    params.perPage = perPage;
  }
  if (currentPage) {
    params.currentPage = currentPage;
  }

  const { data } = await authenticatedRequest(token).get<ITransactionsList>(
    "transactions/history",
    { params }
  );
  return data;
};

export const getTransactionStatsFn = async ({
  token,
  period,
}: {
  token: TokenType;
  period: string;
}) => {
  const params: any = {};

  if (period) {
    params.period = period;
  }

  const { data } = await authenticatedRequest(token).get<IGetStats>(
    "/transactions/statistics",
    { params }
  );
  return data;
};

export const getCashbackToReceiveFn = async ({
  token,
  amount,
  serviceType,
}: {
  token: TokenType;
  amount?: string | string[] | undefined;
  serviceType: string | undefined;
}) => {
  const params: any = {};

  if (amount) {
    params.amount = amount;
  }

  if (serviceType) {
    params.serviceType = serviceType;
  }

  const { data } = await authenticatedRequest(token).get<IGetCashbackPoint>(
    "/wallet/rewards/point",
    { params }
  );

  return data;
};
