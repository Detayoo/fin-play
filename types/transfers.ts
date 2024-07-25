import { BareResponse } from ".";

export type TransferToBankPayload = {
  amount: string | string[] | undefined;
  bankCode: string | string[] | undefined;
  accountNumber: string | string[] | undefined;
  pin: string;
  narration?: string | undefined | string[];
};

export type InternalTransferPayload = {
  amount: string | string[] | undefined;
  accountNumber: string | string[] | undefined;
  pin: string;
  narration?: string | undefined | string[];
};

export interface IResolveInternalAccountPayload {
  accountNumber: string;
}

export interface IResolveBankTransferPayload {
  accountNumber: string;
  bankCode: string | undefined;
}

export interface IGetAccountResolutionResponse extends BareResponse {
  data: {
    accountName: string;
  };
}

export interface IGetBanks extends BareResponse {
  data: {
    banks: {
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
  };
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

export interface IGetCharge extends BareResponse {
  data: {
    charges: number;
  };
}
