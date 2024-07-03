import { useState } from "react";
import { Formik } from "formik";
import { Pressable, ScrollView, TouchableOpacity, View } from "react-native";
import { router } from "expo-router";

import { Colors } from "@/constants";
import { Delete } from "@/assets";
import { AppText, BackButton, Screen, SearchField } from "@/components";

const beneficiaries = [
  {
    accountName: "Adedigba Peter Adetayo",
    accountNumber: "1234567890",
  },
  {
    accountName: "Peter Adetayo",
    accountNumber: "2103769509",
  },
];
const Beneficiaries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [list, setList] = useState(beneficiaries);
  const searchToReturn = list?.filter((each) =>
    each.accountName
      ?.toLocaleLowerCase()
      ?.includes(searchTerm?.toLocaleLowerCase())
  );
  const onSubmit = () => {};
  const onDelete = (id: number) => {
    setList(beneficiaries.filter((_, index) => index !== id));
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
          Beneficiaries
        </AppText>
        <BackButton
          style={{
            opacity: 0,
          }}
        />
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingTop: 10,
        }}
      >
        <Formik initialValues={{ search: "" }} onSubmit={onSubmit}>
          {({}) => {
            return (
              <SearchField
                onChange={setSearchTerm}
                value={searchTerm}
                placeholder="Search"
              />
            );
          }}
        </Formik>

        {searchToReturn?.map(({ accountNumber, accountName }, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                router.push({
                  pathname: "/beneficiary-transfer",
                  params: {
                    accountNumber,
                    accountName,
                  },
                })
              }
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
              }}
            >
              <View
                style={{
                  backgroundColor: Colors.lightGreen,
                  borderRadius: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  height: 45,
                  width: 45,
                }}
              >
                <AppText size="xxlarge" variant="medium">
                  A
                </AppText>
              </View>

              <View style={{ marginLeft: 10 }}>
                <AppText variant="medium">{accountName}</AppText>
                <AppText size="small" style={{ marginTop: 2 }}>
                  {accountNumber}
                </AppText>
              </View>

              <Pressable
                onPress={() => onDelete(index)}
                style={{ marginLeft: "auto" }}
              >
                <Delete />
              </Pressable>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </Screen>
  );
};

export default Beneficiaries;
