import React, { useState } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

export interface InputProps {
  ref?: any;
  label?: string;
  placeholder?: string;
  errorMessege?: string;
  isPassword?: boolean;
  keyType?: "default" | "email-address" | "numeric" | "phone-pad";
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
  value?: string;
  name?: string;
  errorMessage?: string;
  onBlur?: (e: any) => void;
  onChangeText?: (e: any) => void;
  onSubmitEditing?: (e: any) => void;
}
export default function componentName(props: InputProps, { ...rest }) {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{props.label}</Text>
      <TextInput
        style={[styles.input, isFocused && styles.inputFocused]}
        ref={props.ref}
        placeholder={props.placeholder}
        secureTextEntry={props.isPassword}
        keyboardType={props.keyType}
        autoCapitalize={props.autoCapitalize}
        placeholderTextColor="#a3a3a3"
        value={props.value}
        onChangeText={props.onChangeText}
        onBlur={props.onBlur}
        onSubmitEditing={props.onSubmitEditing}
        {...rest}
      />
      <Text style={styles.error}>{props.errorMessage}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    gap: 2,
  },
  input: {
    borderWidth: 1,
    color: "#737373",
    fontSize: 16,
    borderRadius: 8,
    borderColor: "#737373",
    padding: 5,
    paddingHorizontal: 15,
  },
  inputFocused: {
    borderColor: "#d97706",
  },
  label: {
    fontSize: 15,
    fontWeight: "500",
    color: "#737373",
  },
  error: {
    color: "#f87171",
    fontSize: 13,
  },
});
