import React from "react";
import { Text as RNText, StyleSheet } from "react-native";

export default function Text(props) {
  return <RNText {...props} style={[styles.defaultText, props.style]} />;
}

const styles = StyleSheet.create({
  defaultText: {
    fontFamily: "Nunito_700Bold",
    fontSize: 16,
  },
});
