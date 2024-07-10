import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import * as Contacts from "expo-contacts";

import { showToast } from "./ToastComponent";
import { Colors } from "@/constants";
import { ContactSelect } from "./ContactSelect";

export const PhoneContacts = ({
  showModal,
  setShowModal,
  setSelectedContact,
}: {
  showModal: boolean;
  setShowModal: (state: boolean) => void;
  setSelectedContact: (state: Contacts.Contact) => void;
}) => {
  const [contacts, setContacts] = useState<Contacts.Contact[] | null>(null);
  const [search, setSearch] = useState("");
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

  return (
    <ContactSelect
      search={search}
      setSearch={setSearch}
      options={renderFilteredContact()}
      visible={showModal}
      setVisible={setShowModal}
      setSelectedOption={setSelectedContact}
    />
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
