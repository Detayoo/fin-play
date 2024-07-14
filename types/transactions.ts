import { BareResponse } from ".";

export interface ITransactionsList extends BareResponse {
  data: {
    totalCreditAmount: number;
    totalDebitAmount: number;
    transactions: {
      id: string;
      amount: number;
      status: string;
      accountName: string;
      receipientNumber: string;
      paidAt: string;
      category: string;
    }[];
  };
  metadata: {
    totalRecords: number;
    perPage: number;
    currentPage: number;
  };
}
