import React from "react";
import {StyleSheet, Dimensions} from "react-native";

import Box from "../theme/Box";
import Theme from "../theme/Theme";

import Button from "./Button";

export interface IconProps {
    backgroundColor?: keyof typeof Theme.colors;
    onPress?: () => void;
    size?: number;
}

const {width} = Dimensions.get("window");

const Icon: React.FC<IconProps> = ({
    children,
    backgroundColor = "mainBackground",
    size = (width * 13.9) / 100,
    onPress,
}) => {
    const styles = StyleSheet.create({
        container: {
            width: size,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: size / 2,
            height: size,
        },
    });

    return (
        <Button
            title=""
            variant="icon"
            style={styles.container}
            onPress={() => onPress && onPress()}>
            <Box {...{backgroundColor}} style={styles.container}>
                {children}
            </Box>
        </Button>
    );
};

export default Icon;
