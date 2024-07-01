import { Dimensions } from "react-native";

const window = Dimensions.get("window");

export const sizes = {
  WINDOW_WIDTH: window.width,
  WINDOW_HEIGHT: window.height,
  isNormal: window.height > 700,
  isShort: window.height <= 700,
};
