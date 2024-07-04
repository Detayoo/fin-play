/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#fff";

const userPreference = null;

export const Colors = {
  light: {
    text: "#11181C",
    background: "#fff",
    tint: tintColorLight,
    icon: "#687076",
    tabIconDefault: "#687076",
    tabIconSelected: tintColorLight,
  },
  dark: {
    text: "#ECEDEE",
    background: "#151718",
    tint: tintColorDark,
    icon: "#9BA1A6",
    tabIconDefault: "#9BA1A6",
    tabIconSelected: tintColorDark,
  },
  primary: userPreference ?? "#074D41",
  white: "#fff",
  black: "#012B24",
  inputFocusBorder: "#9DB720",
  placeholder: "#BBBBBB",
  inputBackground: "#FCFEF5",
  inputBorder: "#D7E3E1",
  checkboxBorder: "#AAAAAA",
  faintBlack: "#7e7e7e",
  error: "#EA4435",
  lightGreen: "#90AD044D",
  boldGreen: "#90AD04",
};
