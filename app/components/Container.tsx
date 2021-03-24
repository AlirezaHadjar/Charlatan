import {BoxProps, useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import LinearGradient from "react-native-linear-gradient";
import Spy from "../assets/SVGs/Spy";

import {ThemeType} from "../theme/Theme";
import Box from "../theme/Box";

import AppImage from "./Image";

export interface Props extends BoxProps<ThemeType> {
    hasIcon?: boolean;
}

const {height} = Dimensions.get("window");

const colors = [
    "rgba(255, 255, 255, 0)",
    "rgba(255, 255, 255, 0)",
    "rgba(255, 255, 255, 0.1)",
    "rgba(255, 255, 255, 0.3)",
    "rgba(0, 0, 0, 0.6)",
];

const Container: React.FC<ContainerProps> = ({
    children,
    hasIcon = false,
    ...props
}) => {
    const theme = useTheme<ThemeType>();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.mainBackground,
            width: "100%",
        },
        // imageBackground: {
        //     width: "100%",
        //     position: "absolute",
        //     bottom: (height * 5) / 100,
        // },
    });
    return (
        <SafeAreaView style={[styles.container]}>
            {/* <AppImage
                style={styles.imageBackground}
                resizeMode="cover"
                source={require("../assets/images/background.png")}
            /> */}
            {hasIcon && (
                <Box position="absolute" bottom={0}>
                    <Spy />
                </Box>
            )}
            <Box
                width="100%"
                height="100%"
                zIndex={2}
                position="absolute"
                {...props}>
                {children}
            </Box>
            {/* <LinearGradient
                colors={colors}
                style={{width: "100%", height: "100%", position: "absolute"}}
            /> */}
        </SafeAreaView>
    );
};

export default Container;
