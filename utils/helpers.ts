import { showToast } from "@/components";
import * as Clipboard from "expo-clipboard";

export const maskEmail = (email: any) => {
  if (!email) return null;
  const [username, domain] = email.split("@");

  const charactersToHide = Math.max(Math.floor(username.length / 2), 1);

  const hiddenUsername =
    username.substring(0, charactersToHide) +
    "*".repeat(username.length - charactersToHide);

  const maskedEmail = hiddenUsername + "@" + domain;

  return maskedEmail;
};

export const formatMoney = (text: string | number | string[] | undefined) => {
  return Intl.NumberFormat("NGN", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(text));
};

export const formatNumber = (text: string | number | string[] | undefined) => {
  return Intl.NumberFormat("NGN", { maximumFractionDigits: 2 }).format(
    Number(text)
  );
};

export const getFirstLetter = (str: string | undefined) => {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str.trim().charAt(0).toUpperCase();
};

export const getMultiWordFirstLetters = (str: string | undefined) => {
  if (!str || typeof str !== "string") {
    return "";
  }

  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase())
    .join("");
};

export const copyToClipboard = async (text: any) => {
  try {
    await Clipboard.setStringAsync(text);
  } catch (error) {
    showToast("error", "Could not copy, please try again");
  }
  showToast("success", "Copied successfully");
};

export const ERRORS = {
  SOMETHING_HAPPENED: "Something happened, please try again",
  FAILED_ACCOUNT_VERIFICATION: "Could ot verify account, please try again",
};
