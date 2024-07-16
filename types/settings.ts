import { BareResponse } from ".";

export interface IUserProfile extends BareResponse {
  data: {
    email: string;
    phone: string;
    firstName: string;
    lastName: string;
    tier: number;
  };
}

export type RewardTransactionType = {
  type: string;
  initial_bonus: number;
  bonus: number;
  total_bonus: number;
  category: string;
  transaction_id: string;
  transaction_date: string;
};
export interface IGetRewards extends BareResponse {
  data: {
    daily_bonus: number;
    total_bonus: number;
    // referral_bonus: number;
    expenses: number;
    cashback_transaction: RewardTransactionType[];
  };
}

export interface IUpgradeAccount {
  nin: string;
  pod: string;
  image: string;
}
