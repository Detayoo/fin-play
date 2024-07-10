import { StyleSheet, View, Image, ViewStyle, TextStyle } from "react-native";

import { AppText } from "./AppText";
import { Colors, fonts } from "@/constants";

export const Avatar = ({
  text,
  image,
  width = 50,
  height = 50,
  style,
  textStyle,
  transferType,
  imageUrl,
}: {
  text?: string;
  image?: any;
  width?: number;
  height?: number;
  style?: ViewStyle;
  textStyle?: TextStyle;
  transferType?: "incoming" | "outgoing";
  imageUrl?: boolean;
}) => {
  const renderNamePrefix = (content: string | undefined) => {
    const textArray: string[] | undefined = content?.split(" ");
    let prefix = "";

    if (textArray && textArray?.length > 0 && textArray[0]) {
      prefix += textArray[0]?.slice(0, 1);
    }
    if (textArray && textArray?.length > 1 && textArray[1]) {
      prefix += textArray[1]?.slice(0, 1);
    }

    return prefix;
  };

  return (
    <View>
      <View style={[styles.container, { width, height }, style]}>
        {image ? (
          <Image
            source={imageUrl ? { uri: image } : image}
            style={styles.image}
          />
        ) : renderNamePrefix(text) ? (
          <View style={[styles.prexContainer, style]}>
            <AppText style={[styles.prefixText, textStyle]}>
              {renderNamePrefix(text)}
            </AppText>
          </View>
        ) : (
          <View style={styles.prexContainer} />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: "relative",
  },
  container: {
    overflow: "hidden",
    borderRadius: 50,
    borderColor: Colors.inputBackground,
    borderWidth: 1,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
  },
  prexContainer: {
    width: "100%",
    height: "100%",
    borderRadius: 50,
    backgroundColor: Colors.inputBorder,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  prefixText: {
    fontFamily: fonts["satoshi-medium"],
    fontSize: 20,
    textTransform: "uppercase",
  },
  tranferTypeContainer: {
    width: 18,
    height: 18,
    borderRadius: 10,
    position: "absolute",
    bottom: -5,
    right: -5,
    alignItems: "center",
    justifyContent: "center",
    shadowOffset: {
      width: 0.1,
      height: 0.1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 1,
    shadowColor: Colors.black,
    elevation: 1,
  },
  transferTypeImageContainer: {
    width: 18,
    height: 18,
    borderRadius: 10,
    position: "absolute",
    bottom: -5,
    right: -5,
    alignItems: "center",
    justifyContent: "center",
    borderColor: Colors.inputBorder,
    borderWidth: 1,
  },
});
