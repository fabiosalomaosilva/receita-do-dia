import React, { ReactNode } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Menu, MenuOptions, MenuOption, MenuTrigger } from 'react-native-popup-menu';

export interface AvatarMenuProps {
  onProfilePress: () => void;
  onLogoutPress: () => void;
  children: ReactNode;
}

export default function AvatarMenu(props: AvatarMenuProps) {
  return (
    <Menu>
      <MenuTrigger children={props.children} />
      <MenuOptions>
        <MenuOption onSelect={props.onProfilePress}>
          <View style={styles.item}>
            <Text>Perfil</Text>
          </View>
        </MenuOption>
        <MenuOption onSelect={props.onLogoutPress}>
          <View style={styles.item}>
            <Text>Sair</Text>
          </View>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
}

const styles = StyleSheet.create({
  item: {
    width: "100%",
    paddingVertical: 8,
    paddingHorizontal: 15,
  }
});