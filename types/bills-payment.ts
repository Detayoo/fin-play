import { BareResponse } from ".";

export interface IGetProviders extends BareResponse {
  data: {
    providers: string[];
  };
}

export interface IBuyAirtimePayload {
  phoneNumber: string;
  networkProvider: string;
  amount: number;
}

export interface IBuyAirtimeResponse extends BareResponse {
  data: {
    recipient: string;
    amountPaid: string;
    telco: string;
    status: string;
    paidAt: string;
    reference: string;
    currency: string;
    amount: number;
    sessionId: string;
  };
}

export interface IBettingPayload {
  provider: string;
  customerId: string;
  amount: number;
}

export interface IValidateBettingAccountResponse extends BareResponse {
  data: {
    provider: string;
    customerId: string;
    accountName: string;
    minimumAmountPayable: number;
  };
}

export interface IBuyBettingResponse extends BareResponse {
  data: {
    customerId: string;
    accountName: string;
    amountPaid: string;
    status: string;
    paidAt: string;
    reference: string;
    currency: string;
    amount: number;
    sessionId: string;
  };
}

export interface IGetDataProviders extends BareResponse {
  statusCode: number;
  message: string;
  data: {
    provider: {
      price: number;
      tariff_type_id: string;
      name: string;
      category: string;
    }[];
  };
}

export interface IBuyDataPayload {
  phoneNumber: string;
  networkProvider: string;
  tariffId: string;
}

export interface IBuyDataResponse extends BareResponse {
  data: {
    recipient: string;
    tarrifName: string;
    amountPaid: string;
    telco: string;
    status: string;
    paidAt: string;
    reference: string;
    currency: string;
    amount: number;
    sessionId: string;
  };
}

export interface IGetElectricityProviders extends BareResponse {
  data: {
    availableDiscos: string[];
  };
}

export interface ICheckMeterResponse extends BareResponse {
  data: {
    meterNumber: string;
    disco: string;
    vendType: string;
    accountName: string;
    address: string;
    minimumAmountPayable: string;
    maximumAmountPayable: string;
    debtRepayment: number;
    outstanding: number;
  };
}

export interface IBuyElectricityPayload {
  meter: string;
  disco: string;
  vendType: string;
  amount: number;
}

export interface IBuyElectricityResponse extends BareResponse {
  data: {
    purchaseDate: string;
    token: string;
    units: string;
    meterNumber: string;
    address: string;
    accountName: string;
    receiptNo: string;
    amountPaid: string;
    status: string;
    paidAt: string;
    reference: string;
    currency: string;
    amount: number;
    sessionId: string;
  };
}
