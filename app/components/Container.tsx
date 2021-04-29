import {BoxProps, useTheme} from "@shopify/restyle";
import React from "react";
import {StyleProp, StyleSheet, ViewProps} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Animated from "react-native-reanimated";

import Spy from "../assets/SVGs/Spy";
import {ThemeType} from "../theme/Theme";
import Box from "../theme/Box";

export interface Props extends BoxProps<ThemeType> {
    hasIcon?: boolean;
    style?: StyleProp<ViewProps>;
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const Container: React.FC<Props> = ({
    children,
    hasIcon = false,
    style,
    ...props
}) => {
    const theme = useTheme<ThemeType>();
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: theme.colors.mainBackground,
            width: "100%",
        },
    });
    return (
        <AnimatedSafeAreaView style={[styles.container, style]}>
            {hasIcon && (
                <Box position="absolute" bottom={0} alignSelf="center">
                    <Spy />
                </Box>
            )}
            <Box width="100%" height="100%" {...props}>
                {children}
            </Box>
        </AnimatedSafeAreaView>
    );
};

export default Container;
