export * from "./auth";
export * from "./dashboard";
export * from "./settings";
export * from "./transfers";
export * from "./bills-payment";

export type BareResponse = {
  message: string;
};

export type TokenizedPayload = {
  token: string;
};

export type TokenType = string | null;
