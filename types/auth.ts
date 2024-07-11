export type RegistrationType = {
  email: string;
  fullName: string;
  password: string;
};

export type LoginType = {
  email: string | undefined;
  password: string | undefined;
};

export type LoginResponse = {
  statusCode: number;
  message: string;
  data: {
    token: string;
  };
  metadata: {
    profile: {
      id: string;
      email: string;
      fullName: string;
      bvnVerified: string;
      verified: boolean;
      deactivated: boolean;
      is2FAEnabled: boolean;
    };
    wallet: {
      id: string;
      tier: number;
      pinSet: boolean;
    };
  };
};

export type RegistrationResponse = {
  statusCode: number;
  message: string;
  data: {
    token: string;
  };
};

export interface IResetPassword {
  message: string;
  metadata: {};
}

export type ResetPasswordPayloadType = {
  confirmPassword: string;
  newPassword: string;
};

export type VerifyAccountForResetType = {
  message: string;
  data: {
    token: string;
  };
};
