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
