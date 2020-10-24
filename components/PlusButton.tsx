import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Text } from "./Themed";

export default function PlusButton () {
  return <View>
    <Text style={styles.button}>+ Add</Text>
  </View>
}

const styles = StyleSheet.create({
  button: {
    fontSize: 48,
    fontWeight: '700',
    color: 'blue',
  }
})
