import { TokenType, ITransactionsList } from "@/types";
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
  startDate: string | null;
  endDate: string | null;
  status: string | null;
  transactionType: string | null;
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
