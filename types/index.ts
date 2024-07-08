export * from "./auth";
export * from "./dashboard";
export * from "./settings";
export * from "./transfers";

export type BareResponse = {
  message: string;
};

export type TokenizedPayload = {
  token: string;
};
