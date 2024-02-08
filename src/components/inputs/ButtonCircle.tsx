import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export interface InputProps {
  color?: string;
  disabled?: boolean;
  icon: React.ReactElement;
  onPress?: (e: any) => void;
}
export default function Button(props: InputProps) {
  const getColor = () => {
    switch (props.color) {
      case null:
        return "#d97706";
      default:
        return props.color;
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[{ backgroundColor: getColor() }, styles.button]}
        activeOpacity={0.8}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <Text style={styles.textButton}>{props.icon}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 55,
    height: 55,
  },
  button: {
    borderWidth: 0,
    fontSize: 16,
    flex: 1,
    width: 55,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    padding: 4,
    paddingHorizontal: 15,
  },
  textButton: {
    color: "#fff",
  },
});
