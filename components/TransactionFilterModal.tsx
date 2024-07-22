import { Pressable, View } from "react-native";

import { ReusableBottomSheet } from "./BottomSheetModal";
import { AppText } from "./AppText";
import { Colors } from "@/constants";
import { useState } from "react";
import { Formik } from "formik";
import { DateComponent } from "./DateComponent";
import { PrimaryButton } from "./PrimaryButton";

const categories = [
  {
    name: "ALL",
    label: "All",
  },
  {
    name: "AIRTIME",
    label: "Airtime",
  },
  {
    name: "TV",
    label: "Cable TV",
  },
  {
    name: "ELECTRICITY",
    label: "Electricity",
  },
  {
    name: "DATA",
    label: "Data",
  },
  {
    name: "MONEY-IN",
    label: "Money In",
  },
  {
    name: "MONEY-OUT",
    label: "Money Out",
  },
];

const statuses = [
  {
    name: "SUCCESS",
    label: "Success",
  },
  {
    name: "PENDING",
    label: "Pending",
  },
  {
    name: "FAILED",
    label: "Failed",
  },
];

const duration = ["Last 7 Days", "Last 30 Days", "Custom"];

export const TransactionFilterModal = ({
  showModal,
  setShowModal,
  setFilterObj,
  filterObj,
}: {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  setFilterObj: (state: any) => void;
  filterObj: {
    type: string;
    status: string;
    duration: string;
    range: {
      start: string;
      end: string;
    };
  };
}) => {
  const [state, setState] = useState({
    startDate: false,
    endDate: false,
  });

  const updateState = (payload: any) => {
    setState((prev) => ({ ...prev, ...payload }));
  };

  const [selected, setSelected] = useState({
    category: "",
    status: "",
    duration: "",
    dateRange: {
      start: "",
      end: "",
    },
  });

  const updateSelectedState = (payload: any) => {
    setSelected((prev) => ({ ...prev, ...payload }));
  };

  const onSubmit = () => {
    setFilterObj({
      ...filterObj,
      duration: selected.duration,
      status: selected.status?.toLowerCase(),
      type: categories.find((cat) => cat.label === selected.category)?.name?.toLowerCase(),
      range: {
        start: selected.dateRange.start,
        end: selected.dateRange.end,
      },
    });
    setShowModal(false);
  };

  return (
    <ReusableBottomSheet
      snapPoints={["50%", "75%", "95%"]}
      visible={showModal}
      onClose={() => {
        setShowModal(false);
      }}
    >
      <View style={{ paddingTop: 20 }}>
        <AppText style={{ fontSize: 17 }} variant="medium">
          Filter Transactions
        </AppText>
        <AppText style={{ marginTop: 10 }} color={Colors.faintBlack}>
          Select categories, type, status and duration to filter your
          transactions.
        </AppText>
      </View>
      <View>
        <AppText variant="medium" style={{ marginBottom: 20, marginTop: 24 }}>
          Categories
        </AppText>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        >
          {categories.map((category) => {
            return (
              <Pressable
                key={category.label}
                onPress={() =>
                  updateSelectedState({
                    category: category.label,
                  })
                }
                style={{
                  borderWidth: 1,
                  borderColor: "#DADADA",
                  borderRadius: 100,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  backgroundColor:
                    selected.category === category.label
                      ? Colors.lightGreen
                      : "transparent",
                }}
              >
                <AppText>{category.label}</AppText>
              </Pressable>
            );
          })}
        </View>
      </View>
      <View>
        <AppText variant="medium" style={{ marginBottom: 20, marginTop: 24 }}>
          Transaction Status
        </AppText>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        >
          {statuses.map((status) => {
            return (
              <Pressable
                key={status.label}
                onPress={() =>
                  updateSelectedState({
                    status: status.label,
                  })
                }
                style={{
                  borderWidth: 1,
                  borderColor: "#DADADA",
                  borderRadius: 100,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  backgroundColor:
                    selected.status === status.label
                      ? Colors.lightGreen
                      : "transparent",
                }}
              >
                <AppText>{status.label}</AppText>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View>
        <AppText variant="medium" style={{ marginBottom: 20, marginTop: 24 }}>
          Duration
        </AppText>
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
            paddingBottom: 20,
            borderBottomWidth: 1,
            borderBottomColor: "#EDEDED",
          }}
        >
          {duration.map((dur) => {
            return (
              <Pressable
              key={dur}
                onPress={() =>
                  updateSelectedState({
                    duration: dur,
                  })
                }
                style={{
                  borderWidth: 1,
                  borderColor: "#DADADA",
                  borderRadius: 100,
                  paddingVertical: 10,
                  paddingHorizontal: 16,
                  backgroundColor:
                    selected.duration === dur
                      ? Colors.lightGreen
                      : "transparent",
                }}
              >
                <AppText>{dur}</AppText>
              </Pressable>
            );
          })}
          {selected.duration === "Custom" && (
            <Formik
              initialValues={{ startDate: new Date(), endDate: new Date() }}
              onSubmit={() => {}}
            >
              {({ handleSubmit, values, setFieldValue }) => {
                return (
                  <View
                    style={{
                      gap: 20,
                      alignItems: "center",
                      width: "100%",
                      marginTop: 20,
                    }}
                  >
                    <View>
                      <AppText style={{ marginBottom: 10 }}>Start Date</AppText>
                      <DateComponent
                        date={values?.startDate}
                        open={state.startDate}
                        onOpen={() =>
                          updateState({
                            startDate: true,
                          })
                        }
                        onClose={() =>
                          updateState({
                            startDate: false,
                          })
                        }
                        handleAction={(date) => {
                          setFieldValue("startDate", date);
                          updateSelectedState({
                            dateRange: { ...selected.dateRange, start: date },
                          });
                        }}
                        dateFormat="yyyy"
                      />
                    </View>
                    <View>
                      <AppText style={{ marginBottom: 10 }}>End Date</AppText>
                      <DateComponent
                        date={values?.endDate}
                        open={state.endDate}
                        onOpen={() =>
                          updateState({
                            endDate: true,
                          })
                        }
                        onClose={() =>
                          updateState({
                            endDate: false,
                          })
                        }
                        handleAction={(date) => {
                          setFieldValue("endDate", date);
                          updateSelectedState({
                            dateRange: { ...selected.dateRange, end: date },
                          });
                        }}
                        dateFormat="yyyy"
                      />
                    </View>
                  </View>
                );
              }}
            </Formik>
          )}
        </View>
      </View>
      <PrimaryButton
        onPress={onSubmit}
        label="Apply Filter"
        style={{ marginTop: "auto", marginBottom: 30 }}
      />
    </ReusableBottomSheet>
  );
};
