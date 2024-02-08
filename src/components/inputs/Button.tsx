import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

export interface InputProps {
  text?: string;
  color: "primary" | "secondary" | "danger";
  disabled?: boolean;
  onPress?: (e: any) => void;
}
export default function Button(props: InputProps) {
  const getColor = () => {
    switch (props.color) {
      case "primary":
        return "#d97706";
      case "secondary":
        return "#34d399";
      case "danger":
        return "#f87171";
      default:
        return "#d97706";
    }
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[{ backgroundColor: getColor() }, styles.button]}
        activeOpacity={0.7}
        onPress={props.onPress}
        disabled={props.disabled}
      >
        <Text style={styles.textButton}>{props.text}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  button: {
    borderWidth: 0,
    fontSize: 16,
    flex: 1,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    minHeight: 40,
    padding: 4,
    paddingHorizontal: 15,
  },
  textButton: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});
