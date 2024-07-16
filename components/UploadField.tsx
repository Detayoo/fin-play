import { Dispatch, SetStateAction } from "react";
import { Image, Pressable, StyleSheet, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import { AppText } from "./AppText";
import { Upload } from "@/assets";
import { Colors, fonts } from "@/constants";

export const UploadField = ({
  media,
  setMedia,
  label,
}: {
  media: string;
  setMedia: Dispatch<SetStateAction<string>>;
  label: string;
}) => {
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      //   allowsEditing: true,
      //   aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setMedia(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <AppText style={styles.placeholder}>{label}</AppText>

      <View style={styles.uploaderContainer}>
        {!media ? (
          <>
            <Upload />
            <Pressable onPress={pickImage} style={styles.uploadImage}>
              <AppText style={styles.uploadImageText}>Upload Image</AppText>
            </Pressable>
            <AppText
              style={{ textAlign: "center", width: "70%", marginTop: 12 }}
            >
              Upload a clear photo of either your Utility Bill or Bank Statement
            </AppText>
          </>
        ) : (
          <Image
            source={{ uri: media }}
            style={{ width: "100%", height: 200, resizeMode: "cover" }}
            resizeMode="contain"
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    rowGap: 13,
  },
  placeholder: {
    fontFamily: fonts["satoshi-medium"],
  },
  uploaderContainer: {
    borderRadius: 5,
    paddingVertical: 25,
    borderWidth: 1,
    backgroundColor: "#90AD0408",
    borderColor: "#F6F6F6",
    // borderStyle: "dashed",
    alignItems: "center",
  },
  uploadImage: {
    backgroundColor: Colors.primary,
    borderRadius: 1000,
    marginTop: 20,
  },
  uploadImageText: {
    paddingVertical: 10,
    paddingHorizontal: 25,
    fontFamily: fonts["satoshi-medium"],
    color: Colors.white,
  },
});
