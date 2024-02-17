import React from "react";
import { View, Image, ImageProps, StyleSheet } from "react-native";
import AvatarMenu from "../avatarMenu";

type AvatarProps = ImageProps & {
  size?: "small" | "medium" | "large";
}

export default function Avatar(props: AvatarProps) {
  const avatarStyle = styles[props.size || 'medium'];
  const defaultAvatarSource = require("../../../../assets/avatar.png");

  return (
    <Image
      source={props.source || defaultAvatarSource}
      resizeMode="contain"
      style={avatarStyle}
    />
  );
}

const styles = StyleSheet.create({
  large: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  medium: {
    width: 40,
    height: 40,
    borderRadius: 20
  },
  small: {
    width: 30,
    height: 30,
    borderRadius: 15
  },
});
