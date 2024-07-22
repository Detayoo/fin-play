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
    transaction: {
      id: string;
      category: string;
      recipientNumber: string;
      telco: string;
      meterNumber: string; // electricity
      accountNumber: string; // transfer
      bankName: string; //transfer
      paymentMethod: string;
      transactionType: string;
      fee: string;
      meterName: string;
      //
      // id: "aae8d8b7-0dc8-44ee-ae9e-1e08dd12a596";
      type: string;
      amount: number;
      balanceAfterTransaction: number;
      balanceBeforeTransaction: number;
      source: string | null;
      target: string | null;
      initialAmount: number;
      amountPaid: number;
      cashbackUsed: number;
      cashback: number;
      status: string;
      operatorName: string;
      reference: string;
      operatorId: string;
      operatorStatusMessage: string;
      operatorReference: string;
      paidAt: string;
      charges: number;
      narration: string | null;
      response: string | null;
      recipientAccountNumber: string | null;
      recipientAccountName: string | null;
      recipientBankCode: string | null;
      recipientBankName: string | null;
      senderAccountNumber: string;
      senderAccountName: string;
      senderBankCode: string | null;
      senderBankName: string | null;
      toWalletId: string | null;
      fromWalletId: string | null;
      units: number | null;
      token: string | null;
      debtRemaining: null;
      debtAmount: string;
      receiptNo: string | null;
      vendType: string | null;
      beneficiary: string;
      minimumAmountPayable: number | null;
      maximumAmountPayable: number | null;
      accountName: string | null;
      email: string | null;
      phoneNumber: string | null;
      address: string | null;
      userId: string | null;
      adminId: string | null;
      walletId: string;
      createdAt: string;
      updatedAt: string;
      deletedAt: string| null;
    };
  };
}
