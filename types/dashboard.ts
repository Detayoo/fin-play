import { BareResponse } from ".";

export interface IGetMainBalance extends BareResponse {
  data: {
    balance: string;
  };
}
export interface IGetUserAccountDetails extends BareResponse {
  data: {
    accountNumber: string;
    accountName: string;
    bankName: string;
  };
}
