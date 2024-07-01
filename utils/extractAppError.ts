import { AxiosError } from "axios";

export const extractServerError = (
  error: AxiosError | Error | unknown,
  defaultErrorMessage: string
) => {
  if (error instanceof AxiosError) {
    const message = error.response?.data?.message || error?.message;

    if (message) {
      return message;
    } else {
      return defaultErrorMessage;
    }
  } else if (error instanceof Error) {
    return error?.message || defaultErrorMessage;
  } else {
    return defaultErrorMessage;
  }
};
