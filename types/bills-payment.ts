import { BareResponse } from ".";

export interface IGetProviders extends BareResponse {
  data: {
    providers: string[];
  };
}

export interface IBuyAirtimePayload {
  phoneNumber: string | undefined | string[];
  networkProvider: string | undefined | string[];
  amount: number | undefined | string[];
  usePoint: boolean;
  pin: string;
}

export interface IBuyAirtimeResponse extends BareResponse {
  data: {
    transaction: {
      recipient: string;
      paidAt: string;
      id: string;
      amountPaid: string;
      status: string;
      reference: string;
      telco: string;
      telcoReference: string;
    };
  };
}

export interface IBuyBettingPayload {
  provider: string | string[] | undefined;
  customerId: string | string[] | undefined;
  amount: number;
  pin: string;
}

export interface IValidateBettingAccountResponse extends BareResponse {
  data: {
    transaction: {
      details: {
        provider: string;
        customerId: string;
        accountName: string;
        minimumAmountPayable: number;
      };
    };
  };
}

export interface IBuyBettingResponse extends BareResponse {
  data: {
    transaction: {
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
  };
}

export interface DataPlan {
  price: number | number[];
  tariff_type_id: string | string[];
  name: string | string[];
  category: string | string[];
  validity: string;
}

export interface IGetDataPlans extends BareResponse {
  statusCode: number;
  message: string;
  data: {
    dataplans: {
      [x: string]: DataPlan[];
    };
  };
}

export interface IBuyDataPayload {
  phoneNumber: string | string[] | undefined;
  networkProvider: string | string[] | undefined;
  tariffId: string | string[] | undefined;
  pin: string;
  amount: string;
}

export interface IBuyDataResponse extends BareResponse {
  data: {
    transaction: {
      recipient: string;
      paidAt: string;
      id: string;
      amountPaid: string;
      status: string;
      reference: string;
      telco: string;
      telcoReference: string;
    };
  };
}

export interface IGetElectricityProviders extends BareResponse {
  data: {
    availableDiscos: string[];
  };
}

export interface ICheckMeterResponse extends BareResponse {
  data: {
    meterDetails: {
      meterNumber: string;
      disco?: string;
      vendType: string;
      accountName?: string;
      address?: string;
      minimumAmountPayable?: string;
      maximumAmountPayable?: string;
      debtRepayment?: number;
      outstanding?: number;
    };
  };
}

export interface IBuyElectricityPayload {
  meter: string | string[] | undefined;
  disco: string | string[] | undefined;
  vendType: string | string[] | undefined;
  amount: number;
  pin: string;
}

export interface IBuyElectricityResponse extends BareResponse {
  data: {
    transaction: {
      status: string;
      amount: string;
      reference: string;
      purchaseDate: string;
      token: string;
      units: string;
      meterNumber: string;
      debtRemaining: string;
      debtAmount: string;
      address: string;
      accountName: string;
      receiptNo: string;
    };
  };
}

export interface IGetPointBalance {
  message: string;
  data: {
    availablePoint: number;
  };
}

export interface IValidateTVAccountResponse extends BareResponse {
  data: {
    accountName: string | null;
    smartCardNumber: string;
  };
}

export interface IGetBouquet {
  data: {
    [key: string]: {
      amount: string;
      bouquetId: string;
      name: string;
      productKey: string;
    }[];
  };
}

export interface IPurchaseBouquet {
  bouquetProductKey: string | string[] | undefined;
  requestId: string | string[] | undefined;
  provider: string | string[] | undefined;
  smartCardNumber: string | string[] | undefined;
  amount: number | string[] | undefined;
}

export interface IPurchaseBouquetResponse extends BareResponse {
  data: {
    amountPaid: string;
    customerReference: string;
    status: string;
  };
}
