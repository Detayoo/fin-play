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
    id: string;
    email: string;
    fullName: string;
    bvnVerified: boolean;
    verified: boolean;
    deactivated: boolean;
  };
};

export type RegistrationResponse = {
  statusCode: number;
  message: string;
  data: {
    token: string;
  };
};
