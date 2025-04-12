import { userData } from "@/lib/currentProfile";
import { supabase } from "@/lib/supabase";
import Entypo from "@expo/vector-icons/Entypo";
import { router } from "expo-router";
import { Alert, StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { THIText } from "../THIText";

const TopBar = ({ emoji, username }: { emoji: string; username: string }) => {
  // can't delete guest profile
  const data =
    userData.USERNAME !== "GuestProfile"
      ? [
          { label: "Switch Profile", value: "switch" },
          { label: "Edit Profile", value: "edit" },
        ]
      : [{ label: "Switch Profile", value: "switch" }];

  const handleOptionSelect = async (item: { value: string }) => {
    switch (item.value) {
      case "switch":
        router.push("/profilePicker");
        break;
      case "edit":
        router.push("/editProfile");
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <View style={styles.image}>
          <THIText style={styles.emoji}>{emoji}</THIText>
        </View>
      </View>
      <View style={styles.name}>
        <THIText
          style={{
            color: "black",
            fontSize: 28,
            fontWeight: "600",
            textAlign: "left",
          }}
        >
          {username}
        </THIText>
      </View>
      <View style={styles.dropdownContainer}>
        <Dropdown
          data={data}
          labelField="label"
          valueField="value"
          onChange={handleOptionSelect}
          style={styles.dropdown}
          containerStyle={styles.dropdownList}
          placeholderStyle={styles.dropdownPlaceholder}
          selectedTextStyle={styles.dropdownSelectedText}
          itemTextStyle={styles.dropdownItemText}
          activeColor="#F6F6F6"
          renderRightIcon={() => (
            <Entypo name="dots-three-horizontal" size={24} color="black" />
          )}
          placeholder=""
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  image: {
    backgroundColor: "#F6F6F6",
    borderRadius: 100,
    width: 100,
    aspectRatio: 1 / 1,
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    flex: 1,
  },
  name: {
    flex: 5,
    justifyContent: "center",
  },
  emoji: {
    fontSize: 60,
  },
  dropdownContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-end",
  },
  dropdown: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  dropdownList: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    marginTop: "15%",
    width: 180,
    alignSelf: "flex-end",
    position: "absolute",
    left: "81%",
    right: "5%",
    paddingVertical: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#F0F0F0",
    zIndex: 999,
  },
  dropdownPlaceholder: {
    fontSize: 12,
  },
  dropdownSelectedText: {
    fontSize: 12,
  },
  dropdownItemText: {
    fontSize: 16,
    color: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontWeight: "500",
  },
  threeDots: {
    fontSize: 28,
    color: "#000000",
    fontWeight: "600",
  },
});

export default TopBar;
