import { THIText } from "@/components/THIText";
import Slider from "@react-native-community/slider";
import React, { useState } from "react";
import {
  Image,
  Modal,
  StyleSheet,
  Switch,
  TouchableOpacity,
  View,
} from "react-native";
// TODO: Uncomment this when we can try it on a real device!
// import { VolumeManager } from 'react-native-volume-manager';

export default function Settings() {
  const [modalVisible, setModalVisible] = useState(false);
  const [setSize, setSetSize] = useState(4);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const handleVolumeChange = async (value: number) => {
    setVolume(value);
    // TODO: Uncomment this when we can try it on a real device!
    // VolumeManager.setVolume(value);
  };
  const handleIncreaseVolume = () => {
    const newVolume = Math.min(volume + 0.1, 1); // Increment by 0.1, max 1
    // TODO: Uncomment this when we can try it on a real device!
    //VolumeManager.setVolume(newVolume);
    setVolume(newVolume);
  };
  const handleDecreaseVolume = () => {
    const newVolume = Math.max(volume - 0.1, 0); // Decrease by 0.1, min 0
    // TODO: Uncomment this when we can try it on a real device!
    //VolumeManager.setVolume(newVolume);
    setVolume(newVolume);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <Image
          source={require("../../assets/images/settings.png")}
          style={styles.imageStyle}
        />
      </TouchableOpacity>
      <Modal
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        {/*----SETTINGS MODAL----*/}
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <THIText
              style={{
                color: "black",
                fontSize: 27,
                fontWeight: "normal",
                textAlign: "left",
              }}
            >
              Settings
            </THIText>
            {/*----SET SIZE----*/}
            <View>
              <THIText style={styles.textStyle}>Set Size</THIText>
              <Slider
                style={{ width: 200, height: 40 }}
                minimumValue={4}
                maximumValue={12}
                minimumTrackTintColor="black"
                maximumTrackTintColor="black"
                thumbTintColor="white"
                step={4}
                value={setSize}
                onValueChange={(newValue) => setSetSize(newValue)}
              />
              {/* Slider label "4 -- 8 -- 12" */}
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: 200,
                }}
              >
                <THIText> 4</THIText>
                <THIText>8</THIText>
                <THIText>12 </THIText>
              </View>
            </View>
            <View
              style={{
                flex: 0.4,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <THIText style={styles.textStyle}>Volume</THIText>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity onPress={handleDecreaseVolume}>
                    <Image
                      source={require("../../assets/images/remove.png")}
                      style={{ width: 17, marginTop: 15, marginRight: 15 }}
                    />
                  </TouchableOpacity>
                  <Slider
                    style={{ width: 200, height: 40 }}
                    minimumValue={0}
                    maximumValue={1}
                    minimumTrackTintColor="black"
                    maximumTrackTintColor="black"
                    thumbTintColor="white"
                    step={0.01}
                    value={volume}
                    onValueChange={handleVolumeChange}
                  ></Slider>
                  <TouchableOpacity onPress={handleIncreaseVolume}>
                    <Image
                      source={require("../../assets/images/add.png")}
                      style={{ width: 40, height: 40 }}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View>
                <THIText style={styles.textStyle}>Sound</THIText>
                <Switch
                  onValueChange={() => setSoundEnabled(!soundEnabled)}
                  value={soundEnabled}
                />
              </View>
            </View>
            {/* Update button */}
            <View style={{ alignItems: "flex-end" }}>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => setModalVisible(false)}
              >
                <THIText
                  style={{
                    color: "black",
                    fontSize: 15,
                    fontWeight: "normal",
                    textAlign: "center",
                  }}
                >
                  Update
                </THIText>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "flex-end",
    padding: 40,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalBox: {
    width: 500,
    height: 400,
    backgroundColor: "white",
    shadowColor: "black",
    shadowRadius: 4,
    shadowOpacity: 0.8,
    elevation: 5,
    borderRadius: 10,
    padding: 20,
    justifyContent: "space-between",
  },
  imageStyle: {
    width: 25,
    height: 25,
    marginTop: 20,
  },
  textStyle: {
    marginTop: 15,
    color: "black",
    fontSize: 20,
    fontWeight: "300",
    textAlign: "left",
  },
  buttonStyle: {
    width: 80,
    height: 40,
    padding: 8,
    justifyContent: "center",
    borderRadius: 10,
    backgroundColor: "#D9D9D9",
  },
});
