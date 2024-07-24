import { BareResponse } from ".";

export interface IUserProfile extends BareResponse {
  data: {
    customer: {
      email: string;
      phone: string;
      firstName: string;
      lastName: string;
      tier: number;
      fullName: string;
      dob: any;
      nin: string;
      address: string;
      bvn: string;
    };
    tier: {
      currentTier: string;
      tierStatus: boolean;
    };
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

export type ChangePasswordPayloadType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ChangePinPayloadType = {
  oldPin: string;
  newPin: string;
  confirmPin: string;
};

export interface IGetTiers extends BareResponse {
  data: {
    kyc_level: {
      name: string;
      daily_trans_limit: string;
      max_balance: string;
    }[];
  };
}

export type Referral = {
  name: string;
  phone: string;
  status: string;
  bonus: string;
  approved_date: string;
};
export interface IGetInvitees extends BareResponse {
  data: {
    referralId: string;
    invitees_count: number;
    invitees_registered_count: number;
    invitees_transaction_count: number;
    total_bonus: number;
    referral_history: Referral[];
    metadata: {
      total: number;
      page: number;
      perPage: number;
    };
  };
}
