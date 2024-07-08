export type RegistrationType = {
  email: string;
  fullName: string;
  password: string;
};

export type LoginType = {
  email: string;
  password: string;
};

export type LoginResponse = {};

export type RegistrationResponse = {
  statusCode: number;
  message: string;
  data: {
    token: string;
  };
};
