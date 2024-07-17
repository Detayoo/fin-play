import { ScrollView, View } from "react-native";
import { format } from "date-fns";
import { Image } from "expo-image";
import * as FileSystem from "expo-file-system";
import * as ImagePicker from "expo-image-picker";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { AppText, BackButton, ListItem, Screen, showToast } from "@/components";
import { Colors } from "@/constants";
import { uploadProfilePhotoFn, useR } from "@/services";
import { useAuth } from "@/context";
import { ERRORS, extractServerError } from "@/utils";

const UserProfilePage = () => {
  const MAX_FILE_SIZE = 20;
  const queryClient = useQueryClient();
  const isValidSize = (size: number) => {
    const isOk = size / 1024 / 1024 < MAX_FILE_SIZE;
    return isOk;
  };
  const { token } = useAuth();
  const { data: userData } = useR({
    token,
  });

  const { email, firstName, lastName, tier } = userData?.data || {};
  const photo = "y";

  const { isPending, mutateAsync } = useMutation({
    mutationFn: uploadProfilePhotoFn,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user profile"],
      });
    },
    onError: (error) => {
      showToast("error", extractServerError(error, ERRORS.SOMETHING_HAPPENED));
    },
  });

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (result.canceled) return;

    const file: any = await FileSystem.getInfoAsync(result?.assets[0].uri);

    if (!isValidSize(file?.size)) {
      showToast("error", `Image size cannot be more than ${MAX_FILE_SIZE}MB`);
      return;
    }

    const formData: any = new FormData();

    const { uri } = result?.assets[0];

    const parts = file?.uri?.split("/");
    const lastPartOfUri = parts[parts.length - 1];

    const fileToUpload = {
      uri,
      name: lastPartOfUri,
      type: "image/jpg",
    };

    formData.append("photo", fileToUpload);

    if (!result.canceled) {
      try {
        await mutateAsync({
          photo: formData,
          token,
        });
      } catch (error) {
        showToast(
          "error",
          extractServerError(error, "Could not upload photo, try again.")
        );
      }
    }
  };

  return (
    <Screen>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <BackButton />
        <AppText size="xlarge" variant="medium">
          User Profile
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>
      <ScrollView
        contentContainerStyle={{ paddingTop: 20 }}
        showsVerticalScrollIndicator={false}
      >
        <View
          style={{
            borderRadius: 10,
            backgroundColor: "#90AD0408",
            paddingHorizontal: 15,
            paddingVertical: 20,
            justifyContent: "center",
            alignItems: "center",
            borderWidth: 1,
            borderColor: "#ABABAB40",
          }}
        >
          {photo ? (
            <Image
              source={require("../assets/images/animoji.png")}
              style={{ width: 50, height: 50 }}
            />
          ) : null}
          {/* <AppText
            onPress={pickImage}
            style={{ marginTop: 20 }}
            color={Colors.inputFocusBorder}
            variant="medium"
          >
            Tap to change photo
          </AppText> */}

          <View style={{ width: "100%", marginTop: 50 }}>
            <ListItem
              name="Full Name"
              value={(firstName ?? "") + " " + (lastName ?? "")}
              hasBottomBorder
            />
            <ListItem name="Email" value={email} hasBottomBorder />
            <ListItem name="BVN" value="12345678900" hasBottomBorder />
            <ListItem
              name="Date Of Birth"
              value={format(new Date(), "do MMMM, yyyy")}
              hasBottomBorder
            />
            <ListItem
              name="Current Tier"
              value={`Tier ${tier}`}
              hasBottomBorder
              hasBackgroundColor
            />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
};

export default UserProfilePage;
