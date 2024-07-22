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

export interface IGetStats extends BareResponse {
  data: {
    income: {
      total: number;
      transfer: number;
      bills: number;
    };
    expense: {
      total: number;
      transfer: number;
      bills: number;
    };
  };
}

export interface IGetCashbackPoint extends BareResponse {
  data: {
    rewardPoint: {
      amount: number;
      points: number;
    }[];
  };
}

export interface IGetTransactionById extends BareResponse {
  data: {
    id: string;
    category: string;
    initialAmount: number;
    amountPaid: number;
    cashbackUsed: number;
    cashback: number;
    status: string;
    recipientNumber: string;
    telco: string;
    tarrifName: string; // data
    customerId: string; // betting
    token: string; // electricity
    units: number; // electricity
    meterNumber: string; // electricity
    address: string; // electricity
    accountNumber: string; // transfer
    bankName: string; //transfer
    paymentMethod: string;
    transactionType: string;
    accountName: string; // betting & electricity & transfer
    reference: string;
    fee: string;
    meterName: string;
    narration: string;
    paidAt: string;
  };
}
