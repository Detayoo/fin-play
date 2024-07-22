import { Airtel, Bet9ja, BigMtn, Glo, Mtn, NineMobile } from "./assets";

export const states = [
  "Abia",
  "Adamawa",
  "Akwa Ibom",
  "Anambra",
  "Bauchi",
  "Bayelsa",
  "Benue",
  "Borno",
  "Cross River",
  "Delta",
  "Ebonyi",
  "Edo",
  "Ekiti",
  "Enugu",
  "FCT - Abuja",
  "Gombe",
  "Imo",
  "Jigawa",
  "Kaduna",
  "Kano",
  "Katsina",
  "Kebbi",
  "Kogi",
  "Kwara",
  "Lagos",
  "Nasarawa",
  "Niger",
  "Ogun",
  "Ondo",
  "Osun",
  "Oyo",
  "Plateau",
  "Rivers",
  "Sokoto",
  "Taraba",
  "Yobe",
  "Zamfara",
];

export const UTILITY_TYPE = ["Electricity Bill", "Waste Bill", "Land Use"];

export const PROVIDER_LOGOS = [
  {
    logo: <Mtn />,
    name: "MTN",
  },
  {
    logo: <Glo />,
    name: "GLO",
  },
  {
    logo: <Airtel />,
    name: "AIRTEL",
  },
  {
    logo: <NineMobile />,
    name: "9MOBILE",
  },
  {
    logo: <Bet9ja />,
    name: "Bet9ja",
  },
];

export const PROVIDER_VALIDATOR = [
  {
    prefixes: [
      "0803",
      "0806",
      "0810",
      "0813",
      "0814",
      "0816",
      "0703",
      "0706",
      "0903",
      "0906",
      "0913",
      "0916",
    ],
    provider: "MTN",
  },
  {
    prefixes: ["0805", "0807", "0811", "0815", "0705", "0905", "0915"],
    provider: "GLO",
  },
  {
    prefixes: ["0809", "0817", "0818", "0909", "0908"],
    provider: "9MOBILE",
  },
  {
    prefixes: [
      "0802",
      "0808",
      "0812",
      "0701",
      "0708",
      "0902",
      "0907",
      "0901",
      "0912",
    ],
    provider: "AIRTEL",
  },
];
