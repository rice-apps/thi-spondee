import { THIText } from "@/components/THIText";
import { useEffect, useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

const DropDown = ({
  name,
  values,
}: {
  name: string;
  values: Array<string>;
}) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState(name);
  const dropdownValues = ["Reset Filter", ...values];

  useEffect(() => {
    // do something whenever x changes
    if (selectedFilter === "Reset Filter") {
      setSelectedFilter(name);
    }
  }, [selectedFilter]);
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity
          style={[
            styles.buttonStyle,
            showDropdown && { borderColor: "#95D0E7" }, // Apply blue border when showDropdown is true
          ]}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <THIText style={styles.textstyle}>{selectedFilter}</THIText>
          <Image
            source={require("../../assets/images/keyboard_arrow_down.png")}
            style={{
              width: 10.68,
              height: 6.02,
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </TouchableOpacity>
      </View>
      {showDropdown ? (
        <View style={styles.box}>
          {dropdownValues.map((value) => {
            return (
              <TouchableOpacity
                onPress={() => {
                  setSelectedFilter(value);
                  setShowDropdown(!showDropdown);
                }}
                key={value}
              >
                <THIText style={styles.textstyle}>{value}</THIText>
              </TouchableOpacity>
            );
          })}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 200,
    height: 200,
    borderColor: "red",
    borderRadius: 10,
  },
  buttonStyle: {
    width: "100%",
    height: 32,
    paddingHorizontal: 15,
    justifyContent: "space-between",
    borderRadius: 10,
    borderColor: "gray",
    alignItems: "center",
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
  },
  textstyle: {
    fontSize: 15,
  },
  box: {
    height: "auto",
    marginTop: 10,
    gap: 10,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "white",
    // iOS shadow properties
    shadowColor: "#95D0E74D",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.8,
    shadowRadius: 3.84,
    // Android shadow
    elevation: 5,
  },
});

export default DropDown;
