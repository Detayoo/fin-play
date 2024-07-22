import { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { format, parse } from "date-fns";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { useQuery } from "@tanstack/react-query";

import {
  AppText,
  BackButton,
  PrimaryButton,
  Screen,
  ListItem,
  ReusableBottomSheet,
  Loading,
} from "@/components";
import { Colors } from "@/constants";
import {
  BigBank,
  PaymentRecipient,
  ReceiptTypeImage,
  ReceiptTypePDF,
} from "@/assets";
import { formatMoney, formatNumber } from "@/utils";
import { getTransactionById, getUserAccountDetailsFn } from "@/services";
import { useAuth } from "@/context";

const PaymentReceipt = () => {
  const { token } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const { data: senderDetails } = useQuery({
    queryKey: ["user account details"],
    queryFn: () => getUserAccountDetailsFn({ token }),
  });

  const {
    accountName: senderAccountName,
    accountNumber: senderAccountNumber,
    bankName: senderBankName,
  } = senderDetails?.data || {};

  const { id } = useLocalSearchParams();

  const { data, isFetching } = useQuery({
    queryKey: ["transaction details", id],
    queryFn: () =>
      getTransactionById({
        token,
        id,
      }),
    enabled: !!id,
  });

  const {
    accountName,
    accountNumber,
    address,
    amountPaid,
    bankName,
    cashback,
    cashbackUsed,
    category,
    customerId,
    fee,
    id: transactionId,
    initialAmount,
    meterNumber,
    meterName,
    narration,
    paymentMethod,
    paidAt,
    recipientNumber,
    reference,
    status,
    tarrifName,
    telco,
    token: electricityToken,
    transactionType,
    units,
  } = data?.data || {};

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
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
            Payment Summary
          </AppText>
          <BackButton
            style={{
              opacity: 0,
            }}
          />
        </View>
        {isFetching ? (
          <Loading />
        ) : (
          <>
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{
                alignItems: "center",
                backgroundColor: "#90AD0408",
                paddingTop: 20,
                paddingBottom: 30,
                borderRadius: 10,
                marginTop: 15,
                shadowColor: "#ABABAB1A",
                shadowOffset: { width: 4, height: 6 },
                shadowOpacity: 4,
                shadowRadius: 1,
                elevation: 2,
                paddingHorizontal: 16,
              }}
            >
              {/* <PaymentRecipient /> */}
              <BigBank />
              <AppText style={{ marginTop: 14 }} size="xlarge" variant="medium">
                NGN {formatMoney(amountPaid || 0)}
              </AppText>
              <AppText
                style={{ marginTop: 10 }}
                color={Colors.inputFocusBorder}
              >
                Transfer{" "}
                {status?.toString()?.toLocaleLowerCase() === "success"
                  ? "Successful"
                  : status}
              </AppText>
              <AppText style={{ marginTop: 10, marginBottom: 30 }}>
                {paidAt
                  ? format(
                      parse(`${paidAt}`, "dd/MM/yyyy HH:mm:ss", new Date()),
                      "MMMM dd, yyyy hh:mma"
                    )
                  : null}
              </AppText>

              <View
                style={{
                  gap: 30,
                  width: "100%",
                  borderTopWidth: 1,
                  borderColor: "#EDEDED",
                  paddingTop: 20,
                }}
              >
                {customerId && (
                  <ListItem name="Customer ID" value={customerId} />
                )}
                {meterNumber && (
                  <ListItem name="Meter Number" value={meterNumber} />
                )}
                {meterName && <ListItem name="Meter Name" value={meterName} />}

                {/* {serviceProvider && (
              <ListItem name="Service Provider" value={serviceProvider} />
            )} */}
                {electricityToken && (
                  <ListItem name="Token" value={electricityToken} canCopy />
                )}
                {units && <ListItem name="Units" value={`${units}`} />}
                {address && <ListItem name="Address" value={address} />}

                {accountName &&
                  !meterName && ( //to check in case account name is send as meter name, it causes chaos - really.
                    <ListItem
                      name="Recipient's Details"
                      value={accountName}
                      value2={
                        bankName && accountNumber
                          ? `${bankName} | ${accountNumber}`
                          : null
                      }
                    />
                  )}
                {accountNumber && (
                  <ListItem
                    name="Sender's Details"
                    value={senderAccountName}
                    value2={`${senderBankName} | ${senderAccountNumber}`}
                  />
                )}
                {/* {recipient && <ListItem name="Recipient" value={recipient} />} */}
                {telco && <ListItem name="TELCO" value={telco} />}
                {/* {telcoReference && (
              <ListItem name="Telco Reference" value={telcoReference} canCopy />
            )} */}
                {/* {customerReference && (
              <ListItem
                name="Customer Reference"
                value={customerReference}
                canCopy
              />
            )} */}
                {reference && (
                  <ListItem
                    name="Transaction Reference"
                    value={reference}
                    canCopy
                  />
                )}
                {narration && <ListItem name="Narration" value={narration} />}
                {fee && (
                  <ListItem
                    name="Fee"
                    value={`"NGN${formatMoney(fee || 0)}" `}
                  />
                )}
                {cashback && (
                  <ListItem
                    name="Cashback Earned"
                    value={formatNumber(cashback || 0)}
                  />
                )}
                {id && <ListItem name="Transaction ID" value={id} canCopy />}
                {/* {sessionId && (
              <ListItem name="Session ID" value={sessionId} canCopy />
            )} */}
                {transactionType && (
                  <ListItem name="Transaction Type" value={transactionType} />
                )}
              </View>
            </ScrollView>
            <PrimaryButton
              onPress={() => router.push("/(tabs)")}
              variant="outline"
              style={{ marginTop: 30 }}
              label="Go back to Home"
            />
            <PrimaryButton
              onPress={() => setShowModal(true)}
              style={{ marginTop: 16 }}
              label="Share Receipt"
            />
          </>
        )}
      </Screen>
      <ReusableBottomSheet
        snapPoints={["30%"]}
        visible={showModal}
        onClose={() => {
          setShowModal(false);
        }}
      >
        <View style={{ paddingTop: 20, height: 300 }}>
          <AppText size="xlarge" variant="medium">
            Select Share Format
          </AppText>

          <TouchableOpacity
            style={{
              width: "100%",
              gap: 10,
              marginTop: 30,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ReceiptTypeImage />
            <AppText>Image</AppText>
          </TouchableOpacity>
          <View
            style={{
              height: 1,
              width: "100%",
              backgroundColor: "#EDEDED",
              marginTop: 15,
            }}
          />
          <TouchableOpacity
            style={{
              width: "100%",
              gap: 10,
              marginTop: 15,
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <ReceiptTypePDF />
            <AppText>PDF</AppText>
          </TouchableOpacity>
        </View>
      </ReusableBottomSheet>
    </GestureHandlerRootView>
  );
};

export default PaymentReceipt;
