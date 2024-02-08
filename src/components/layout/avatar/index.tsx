import React from "react";
import { View, Image, StyleSheet } from "react-native";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export interface AvatarProps {
  imageUrl: string | null;
}

export default function Avatar(props: AvatarProps) {
  return (
    <View style={styles.container}>
      {props.imageUrl === null ? (
        <Image
          source={require("../../../../assets/avatar.png")}
          resizeMode="contain"
          style={styles.avatar}
        />
      ) : (
        <Image source={{ uri: props.imageUrl }} style={styles.avatar} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  avatar: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
