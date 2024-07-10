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
