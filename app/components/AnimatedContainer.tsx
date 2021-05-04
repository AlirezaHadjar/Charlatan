import {BoxProps} from "@shopify/restyle";
import React, {useMemo} from "react";
import {StyleProp, StyleSheet, ViewProps} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";
import Animated, {
    interpolateColor,
    useAnimatedStyle,
} from "react-native-reanimated";

import Spy from "../assets/SVGs/Spy";
import Box from "../theme/Box";
import theme, {lightTheme, ThemeType} from "../theme/Theme";
import {useDarkTheme} from "../contexts/ThemeContext";

export interface Props extends BoxProps<ThemeType> {
    hasIcon?: boolean;
    style?: StyleProp<ViewProps>;
}

const AnimatedSafeAreaView = Animated.createAnimatedComponent(SafeAreaView);

const AnimatedContainer: React.FC<Props> = ({
    children,
    hasIcon = false,
    style,
    ...props
}) => {
    const {isDark, animatedDark} = useDarkTheme();
    const startValue = useMemo(() => (isDark ? 0 : 1), [isDark]);
    const endValue = useMemo(() => (isDark ? 1 : 0), [isDark]);

    const animatedStyles = useAnimatedStyle(() => {
        const color = interpolateColor(
            animatedDark.value,
            [startValue, endValue],
            [lightTheme.colors.mainBackground, theme.colors.mainBackground],
        );
        return {
            backgroundColor: color,
        };
    }, [theme.colors.mainBackground]);

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            width: "100%",
        },
    });
    return (
        <AnimatedSafeAreaView style={[styles.container, animatedStyles, style]}>
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

export default AnimatedContainer;
