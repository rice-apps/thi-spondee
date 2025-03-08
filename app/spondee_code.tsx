/*
* This screen allows an audiologist to choose a set size, change some options, and then
* it will generate a code for them to enter at ____.com — the answer key website.
*/

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function SpondeeCodeScreen() {
  return (
      <View style={styles.content}>
        <Text style={styles.title}>Welcome to My App</Text>
        <Text style={styles.subtitle}>This is my first screen</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
  },
});