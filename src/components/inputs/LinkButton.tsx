import React from 'react';
import { Text, TouchableOpacity, TouchableOpacityProps, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

type Props = TouchableOpacityProps & {
    title: string;
}

export function LinkButton({ title, ...rest }: Props) {

    return (
        <TouchableOpacity {...rest}>
            <Text style={{ fontSize: 15, fontWeight: "500", color: "#ff8735" }}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
});