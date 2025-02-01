import { THIText } from "@/components/THIText";
import spondeeImageMap from "@/components/spondee/SpondeeImageMap";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type CardProps = {
  text: string;
  correct: string;
  setTotalTrials: (update: (prev: number) => number) => void;
  setNumCorrect: (update: (prev: number) => number) => void;
  button: boolean;
  backgroundColor: string;
  onPress: () => void;
  onSubmit: () => void;
};

export default function Card({
  text,
  correct,
  setTotalTrials,
  setNumCorrect,
  button,
  backgroundColor,
  onPress,
  onSubmit,
}: CardProps) {
  const style = { ...styles.item, backgroundColor: backgroundColor };

  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <THIText>{text}</THIText>
      <Image
        style={{ height: "100%", width: "100%", objectFit: "contain" }}
        source={spondeeImageMap[text]}
      ></Image>
      {button ? (
        <TouchableOpacity style={styles.submit} onPress={onSubmit}>
          <THIText style={{ fontSize: 17 }}>Submit</THIText>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    marginVertical: 20,
    marginHorizontal: 25,
    width: 350,
    height: 250,
    borderRadius: 10,
    borderColor: "#7B9CCF",
    borderStyle: "solid",
    borderWidth: 3,
    // width: "auto",
  },
  name: {
    fontSize: 32,
  },
  submit: {
    backgroundColor: "#95D0E7",
    borderRadius: 10,
    padding: 15,
    position: "absolute",
  },
});
