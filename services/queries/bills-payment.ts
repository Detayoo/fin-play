import {
  IBuyAirtimePayload,
  IBuyAirtimeResponse,
  IBuyBettingPayload,
  IBuyBettingResponse,
  IBuyDataPayload,
  IBuyDataResponse,
  IBuyElectricityPayload,
  IBuyElectricityResponse,
  ICheckMeterResponse,
  IGetDataPlans,
  IGetElectricityProviders,
  IGetPointBalance,
  IGetProviders,
  IValidateBettingAccountResponse,
  TokenType,
} from "@/types";
import { authenticatedRequest } from "../api";

export const getAirtimeProvidersFn = async ({
  token,
}: {
  token: TokenType;
}) => {
  const { data } = await authenticatedRequest(token).get<IGetProviders>(
    "/airtime/providers"
  );
  return data;
};

export const buyAirtimeFn = async ({
  token,
  payload,
}: {
  token: TokenType;
  payload: IBuyAirtimePayload;
}) => {
  const { data } = await authenticatedRequest(token).post<IBuyAirtimeResponse>(
    "/airtime/vend",
    payload
  );

  return data;
};

export const getUserBettingDetailsFn = async ({
  token,
  provider,
  customerId,
}: {
  token: TokenType;
  provider: string;
  customerId: string;
}) => {
  // const data: IValidateBettingAccountResponse = {
  //   message: "",
  //   data: {
  //     provider: "string",
  //     customerId: "string",
  //     accountName: "string",
  //     minimumAmountPayable: 400,
  //   },
  // };

  // return data;
  const { data } = await authenticatedRequest(
    token
  ).get<IValidateBettingAccountResponse>(
    `/betting/account?provider=${provider}&customerId=${customerId}`
  );
  return data;
};

export const getBettingProvidersFn = async ({
  token,
}: {
  token: TokenType;
}) => {
  const { data } = await authenticatedRequest(token).get<IGetProviders>(
    "/betting/providers"
  );
  return data;
};

export const buyBettingPlanFn = async ({
  token,
  payload,
}: {
  token: TokenType;
  payload: IBuyBettingPayload;
}) => {
  const { data } = await authenticatedRequest(token).post<IBuyBettingResponse>(
    "/betting/pay",
    payload
  );

  return data;
};

export const getDataPlansFn = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get<IGetDataPlans>(
    "/data/plans"
  );
  return data;
};

export const buyDataFn = async ({
  token,
  payload,
}: {
  token: TokenType;
  payload: IBuyDataPayload;
}) => {
  const { data } = await authenticatedRequest(token).post<IBuyDataResponse>(
    "/data/vend",
    payload
  );

  return data;
};

export const getElectricityProvidersFn = async ({
  token,
}: {
  token: TokenType;
}) => {
  const { data } = await authenticatedRequest(
    token
  ).get<IGetElectricityProviders>("/electricity/discos");
  return data;
};

// export const checkMeterFn = async ({
//   token,
//   meter,
//   disco,
//   type,
// }: {
//   token: TokenType;
//   meter: string;
//   disco: string;
//   type: string;
// }) => {
//   const { data } = await authenticatedRequest(token).get<ICheckMeterResponse>(
//     `/electricity/meter?meter=${meter}&disco=${disco}&vendType=${type}`
//   );
//   // return data;
//   try {
//   } catch (error) {
//     return {
//       data: {
//         accountName: "Tayo adedigba",
//         address: "Yeah man",
//         debtRepayment: "",
//         maximumAmountPayable: 300,
//         minimumAmountPayable: 500,
//         meterNumber: 2011111111,
//         vendType: "PREPAID",
//       },
//     };
//   }

//   // return {
//   //   data: {
//   //     accountName: "Tayo adedigba",
//   //     address: "Yeah man",
//   //     debtRepayment: "",
//   //     maximumAmountPayable: 300,
//   //     minimumAmountPayable: 500,
//   //     meterNumber: 2011111111,
//   //     vendType: "PREPAID",
//   //   },
//   // };
// };

export const checkMeterFn = async ({
  token,
  meter,
  disco,
  type,
}: {
  token: TokenType;
  meter: string;
  disco: string;
  type: string;
}) => {
  // const data: ICheckMeterResponse = {
  //   message: "",
  //   data: {
  //     meterNumber: "string",
  //     disco: "string",
  //     vendType: "string",
  //     accountName: "string",
  //     address: "string",
  //     minimumAmountPayable: "string",
  //     maximumAmountPayable: "string",
  //     debtRepayment: 200,
  //     outstanding: 100,
  //   },
  // };

  // return data;

  const { data } = await authenticatedRequest(token).get<ICheckMeterResponse>(
    `/electricity/meter?meter=${meter}&disco=${disco}&vendType=${type}`
  );
  return { data };
};

export const buyElectricityFn = async ({
  token,
  payload,
}: {
  token: TokenType;
  payload: IBuyElectricityPayload;
}) => {
  const { data } = await authenticatedRequest(
    token
  ).post<IBuyElectricityResponse>("/electricity/vend", payload);

  return data;
};

export const getPointsBalanceFn = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get<IGetPointBalance>(
    "/wallet/rewards/balance"
  );
  return data;
};

export const get = async ({ token }: { token: TokenType }) => {
  const { data } = await authenticatedRequest(token).get<IGetPointBalance>(
    "/wallet/rewards"
  );
  return data;
};
