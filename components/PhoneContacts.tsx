import { FlatList, Pressable, StyleSheet, View } from "react-native";

import * as Contacts from "expo-contacts";
import { useEffect, useState } from "react";
import { showToast } from "./ToastComponent";
import { Colors } from "@/constants";
import { AppText } from "./AppText";
import { TextField } from "./TextField";
import { BackIcon } from "@/assets";
import { Avatar } from "./Avatar";
import { SelectField } from "./SelectField";
import { ContactSelect } from "./ContactSelect";

export const PhoneContacts = ({
  showModal,
  setShowModal,
}: {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
}) => {
  const [contacts, setContacts] = useState<Contacts.Contact[] | null>(null);
  const [search, setSearch] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);
  console.log("contacts", contacts && contacts[0]);
  const getPhoneContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [
          Contacts.Fields.PhoneNumbers,
          Contacts.Fields.FirstName,
          Contacts.Fields.LastName,
          Contacts.Fields.Image,
        ],
      });

      if (data.length > 0) {
        setContacts(data);
      } else {
        showToast("error", "No contact found");
      }
    } else {
      showToast(
        "error",
        "Permission to access contacts denied.",
        "Please enable to continue"
      );
    }
  };

  useEffect(() => {
    getPhoneContacts();
  }, []);

  const renderFilteredContact = () => {
    return contacts?.filter((each) => {
      if (!search) {
        return true;
      } else if (
        (each?.name &&
          each?.name?.toLowerCase()?.includes(search?.toLowerCase())) ||
        (each?.phoneNumbers && each?.phoneNumbers[0]?.number?.includes(search))
      ) {
        return true;
      } else {
        return false;
      }
    });
  };

  const handleSelectPhoneNumber = (text: string | undefined) => {
    let content = text;

    if (content?.includes(" ")) {
      content = content?.replaceAll(" ", "");
    }
    if (content?.includes("-")) {
      content = content?.replaceAll("-", "");
    }
    if (content?.includes("(")) {
      content = content?.replaceAll("(", "");
    }
    if (content?.includes(")")) {
      content = content?.replaceAll(")", "");
    }
  };

  return (
    <>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <BackIcon onPress={() => {}} />
          <AppText style={styles.headerText} variant="medium">
            Select Contacts
          </AppText>
        </View>
        <View style={styles.searchContainer}>
          {/* <View style={styles.searchContentContainer}>
      <SearchIcon />
      <TextField
        style={styles.searchInput}
        value={search}
        onChangeText={}
        placeholder="Search"
      />
    </View> */}
        </View>
        <View style={styles.contentContainer}>
          <FlatList
            data={renderFilteredContact()}
            keyExtractor={(item: any) => item.id}
            renderItem={({ item }: any) => (
              <Pressable
                onPress={() => {
                  handleSelectPhoneNumber(
                    item?.phoneNumbers[0]
                      ? item?.phoneNumbers[0]?.number
                      : undefined
                  );
                  setSearch("");
                }}
                style={styles.contactListContainer}
              >
                {item?.imageAvailable ? (
                  <Avatar image={item?.image?.uri} />
                ) : (
                  <Avatar text={item?.name} />
                )}

                <View style={styles.listTextContainer}>
                  {item?.name ? (
                    <AppText style={styles.contactName}>{item?.name}</AppText>
                  ) : null}
                  {item?.phoneNumbers?.length ? (
                    <AppText style={styles.contactNumber}>
                      {item?.phoneNumbers[0]?.number}
                    </AppText>
                  ) : null}
                </View>
              </Pressable>
            )}
            ItemSeparatorComponent={() => <View style={styles.seperator} />}
            ListEmptyComponent={() => (
              <View style={styles.emptyContent}>
                <AppText>NO CONTACT AVAILABLE</AppText>
              </View>
            )}
          />
        </View>
      </View>
      <ContactSelect
        options={renderFilteredContact()}
        visible={showModal}
        setVisible={setShowModal}
        setSelectedOption={setSelectedContact}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    width: "100%",
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 16,
  },
  headerContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    columnGap: 30,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 17,
  },
  searchContainer: {
    width: "100%",
  },
  searchContentContainer: {
    width: "100%",
    flexDirection: "row",
    columnGap: 15,
    paddingHorizontal: 10,
    backgroundColor: Colors.inputBackground,
    borderRadius: 10,
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 15,
  },
  contentContainer: {
    flex: 1,
    width: "100%",
    marginTop: 15,
    paddingBottom: 20,
  },
  contactListContainer: {
    width: "100%",
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    columnGap: 20,
  },
  listImage: {
    width: 50,
    height: 50,
    borderRadius: 30,
  },
  listNamePrexContainer: {
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: Colors.inputBackground,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  listPrefixText: {
    fontSize: 20,
    textTransform: "uppercase",
  },
  listTextContainer: {
    flex: 1,
  },
  contactName: {
    fontSize: 15,
    textTransform: "capitalize",
  },
  contactNumber: {
    fontSize: 17,
    color: Colors.black,
    marginTop: 5,
  },
  seperator: {
    width: "100%",
    height: 1,
    backgroundColor: Colors.inputBorder,
  },
  emptyContent: {
    alignItems: "center",
    marginTop: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderColor: Colors.inputBorder,
    borderWidth: 1,
    borderRadius: 7,
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0.2,
      height: 0.2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 2,
  },
});
