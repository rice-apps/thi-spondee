/*
* This screen allows an audiologist to choose a set size, change some options, and then
* it will generate a code for them to enter at ____.com — the answer key website.
*/

import React, {useState} from 'react';
import {View, Text, StyleSheet, Switch, TouchableOpacity} from 'react-native';
import {THIText} from "@/components/THIText";
import Slider from "@react-native-community/slider";

export default function SpondeeCodeScreen() {
  const [size, setSize] = useState(4);
  const [maintainSameCards, setMaintainSameCards] = useState(true);

  // Placeholder for slider implementation
  const SliderPlaceholder = () => (
    <View style={styles.sliderPlaceholder}>
      <View style={styles.sliderHandle} />
      <View style={styles.sliderTrack}>
        {[4, 6, 8, 10, 12].map((value) => (
          <View key={value} style={styles.sliderMark} />
        ))}
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.heading}>Set Size</Text>

        <View style={styles.sliderContainer}>
          {/*----SET SIZE----*/}
          <View>
            <THIText style={styles.textStyle}>Set Size</THIText>
            <Slider
              style={{ width: 334, height: 40 }}
              lowerLimit={4}
              minimumValue={4}
              upperLimit={12}
              maximumValue={12}
              minimumTrackTintColor="#6D88B480"
              maximumTrackTintColor="#6D88B480"
              thumbTintColor="#95D0E7"
              step={2}
              value={size}
              onValueChange={(newValue) => setSize(newValue)}
            />
            {/* Slider label "4 -- 8 -- 12" */}
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: 334,
              }}
            >
              <THIText> 4</THIText>
              <THIText> 8</THIText>
              <THIText>12 </THIText>
            </View>
          </View>
        </View>

        <Text style={styles.heading}>Maintain Same Cards</Text>
        <Switch
          value={maintainSameCards}
          onValueChange={setMaintainSameCards}
          trackColor={{ false: '#d3d3d3', true: '#a0d5e3' }}
          thumbColor={maintainSameCards ? '#fff' : '#f4f3f4'}
          ios_backgroundColor="#d3d3d3"
          style={styles.switch}
        />

        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.card}>
        <Text style={styles.heading}>Save the settings to generate the code</Text>

        <View style={styles.codeBoxesContainer}>
          {[1, 2, 3, 4].map((box) => (
            <View key={box} style={styles.codeBox} />
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#f5f5f5',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 24,
    width: '35%',
    borderWidth: 1,
    borderColor: '#dcdcdc',
    justifyContent: 'center',
  },
  heading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  sliderContainer: {
    marginBottom: 32,
  },
  sliderPlaceholder: {
    height: 40,
    width: '100%',
    justifyContent: 'center',
    position: 'relative',
  },
  sliderHandle: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: '#87ceeb',
    position: 'absolute',
    left: 0,
    top: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
  },
  sliderTrack: {
    height: 4,
    backgroundColor: '#d3d3d3',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderMark: {
    height: 8,
    width: 8,
    borderRadius: 4,
    backgroundColor: '#d3d3d3',
    marginTop: -2,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  sliderLabel: {
    color: '#555',
  },
  switch: {
    marginBottom: 24,
  },
  saveButton: {
    backgroundColor: '#87ceeb',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  saveButtonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  codeBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 48,
    flexWrap: 'wrap',
    gap: 16,
  },
  codeBox: {
    height: 50,
    width: 50,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#dcdcdc',
  },
  textStyle: {
    marginTop: 15,
    marginBottom: 15,
    color: "black",
    textAlign: "left",
  },
});