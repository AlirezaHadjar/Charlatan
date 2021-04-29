import {
    AllProps,
    BackgroundColorProps,
    BorderProps,
    SpacingProps,
} from "@shopify/restyle";
import React, {useCallback} from "react";
import {Dimensions, ViewStyle} from "react-native";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withSequence,
    withTiming,
} from "react-native-reanimated";

import theme, {ThemeType} from "../theme/Theme";
import normalize from "../utils/normalizer";
import {Strumber} from "../types";
import Box from "../theme/Box";

import AppText from "./Text";
import AppTouchable from "./Touchable";

type Props = BackgroundColorProps<ThemeType> &
    SpacingProps<ThemeType> &
    BorderProps<ThemeType> &
    AllProps<ThemeType>;

export interface ButtonProps extends Props {
    title: string;
    width?: Strumber;
    height?: Strumber;
    variant?: "simple" | "icon";
    borderRadius?: keyof typeof theme.borderRadii;
    style?: ViewStyle;
    backgroundColor?: keyof typeof theme.colors;
    textColor?: keyof typeof theme.colors;
    disabled?: boolean;
    icon?: JSX.Element;
    disableText?: string;
    onPress?: () => void;
    onPressIn?: () => void;
    onPressOut?: () => void;
    fontSize?: number;
    scaleTo?: number;
}

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get("window");

const Button: React.FC<ButtonProps> = ({
    title,
    width = (SCREEN_WIDTH * 50) / 100,
    height = (SCREEN_HEIGHT * 16.3) / 100,
    borderRadius = "hero3",
    style = {},
    icon,
    backgroundColor = "buttonSecondary",
    textColor = "mainTextColor",
    fontSize = normalize(13),
    disabled = false,
    variant = "simple",
    disableText = "",
    children,
    onPressIn,
    onPressOut,
    onPress,
    scaleTo = 0.9,
    ...props
}) => {
    const pressed = useSharedValue(false);
    const pressing = useDerivedValue(() => {
        return pressed.value
            ? withTiming(scaleTo, {
                  duration: 200,
                  easing: Easing.bezier(0.85, 0, 0.15, 1),
              })
            : withSequence(
                  withTiming(1.01, {
                      duration: 500,
                      easing: Easing.bezier(0.85, 0, 0.15, 1),
                  }),
                  withTiming(1, {
                      duration: 100,
                      easing: Easing.bezier(0.85, 0, 0.15, 1),
                  }),
              );
    });
    const renderSimpleButton = useCallback(() => {
        const inside = (
            <>
                {title !== "" && (
                    <Box
                        flexDirection="row-reverse"
                        width="100%"
                        alignItems="center"
                        justifyContent="center"
                        flex={1}>
                        <AppText
                            {...{fontSize}}
                            color={textColor}
                            variant="medium"
                            numberOfLines={1}>
                            {title}
                        </AppText>
                    </Box>
                )}
                {children}
            </>
        );
        return (
            <Box
                flexDirection="row"
                alignItems="center"
                {...{backgroundColor, width, height, style, borderRadius}}
                {...props}>
                {inside}
            </Box>
        );
    }, [
        backgroundColor,
        borderRadius,
        children,
        fontSize,
        height,
        props,
        style,
        textColor,
        title,
        width,
    ]);
    const renderIconButton = useCallback(() => {
        const inside = (
            <Box
                flexDirection="row-reverse"
                width="100%"
                alignItems="center"
                justifyContent="center"
                flex={1}>
                {icon}
            </Box>
        );
        return (
            <Box
                {...{backgroundColor, width, height, style, borderRadius}}
                {...props}>
                {inside}
            </Box>
        );
    }, [backgroundColor, borderRadius, height, icon, props, style, width]);
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(pressing.value, [scaleTo, 1], [scaleTo, 1]);
        return {transform: [{scale}]};
    });
    return (
        <AppTouchable
            onPressIn={() => {
                pressed.value = true;
                onPressIn && onPressIn();
            }}
            onPressOut={() => {
                pressed.value = false;
                onPressOut && onPressOut();
            }}
            disabled={disabled}
            disableText={disableText}
            activeOpacity={0.9}
            onPress={onPress}>
            <Animated.View style={animatedStyle}>
                {variant === "simple" && renderSimpleButton()}
                {variant === "icon" && renderIconButton()}
            </Animated.View>
        </AppTouchable>
    );
};

export default Button;
