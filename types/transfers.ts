import { BareResponse } from ".";

export type TransferToBankPayload = {
  amount: string;
  bankCode: string;
  accountNumber: string;
  pin: string;
};

export type InternalTransferPayload = {
  amount: string | string[] | undefined;
  accountNumber: string | string[] | undefined;
  pin: string;
};

export interface IResolveInternalAccountPayload {
  accountNumber: string;
}

export interface IResolveBankTransferPayload {
  accountNumber: string;
  bankCode: string;
}

export interface IGetAccountResolutionResponse extends BareResponse {
  data: {
    accountName: string;
  };
}

export interface IGetBanks extends BareResponse {
  data: {
    name: string;
    slug: string;
    code: string;
    longCode: string;
    gateway: string;
    active: boolean;
    country: string;
    currency: string;
    type: string;
  }[];
}

export interface ITransferResponse extends BareResponse {
  data: {
    transaction: {
      status: string;
      paidAt: string;
      reference: string;
      currency: string;
      amount: string;
      accountName: string;
      accountNumber: string;
      bankName: string;
      sessionId: string;
    };
  };
}
