import {
  AccountLimit,
  CustomerSupport,
  ReferAFriend,
  SettingsProfile,
  TermsAndConditions,
} from "@/assets";

export * from "./extractAppError";
export * from "./storage";
export * from "./validators";
export * from "./helpers";

export const SETTINGS_ROUTES = [
  {
    icon: <SettingsProfile />,
    label: "User Profile",
    route: "/user-profile",
  },
  {
    icon: <AccountLimit />,
    label: "Account Limit",
    route: "/account-limit",
  },
  {
    icon: <AccountLimit />,
    label: "Upgrade Tier",
    route: "/upgrade-tier",
  },
  {
    icon: <AccountLimit />,
    label: "Preferences",
    route: "/preferences",
  },
  {
    icon: <AccountLimit />,
    label: "Security",
    route: "/security",
  },
];

export const MORE_ROUTES = [
  {
    icon: <CustomerSupport />,
    label: "Customer Support",
    route: "/contact-support",
  },
  {
    icon: <ReferAFriend />,
    label: "Refer A Friend",
    route: "/referrals",
  },
  {
    icon: <TermsAndConditions />,
    label: "Terms & Conditions",
    route: "/terms-and-conditions",
  },
];
