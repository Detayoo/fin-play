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

export const copyToClipboard = async (text: string) => {
  try {
    await Clipboard.setStringAsync(text);
  } catch (error) {
    showToast("error", "Could not copy, please try again");
  }
  showToast("success", "Copied successfully");
};
