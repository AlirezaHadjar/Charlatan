import {
    AllProps,
    BackgroundColorProps,
    BorderProps,
    SpacingProps,
} from "@shopify/restyle";
import React, {ComponentProps, useCallback} from "react";
import {Dimensions, Platform, ViewStyle} from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import RNReactNativeHapticFeedback from "react-native-haptic-feedback";

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

//@ts-ignore
export interface ButtonProps extends Props {
    title: string;
    width?: Strumber;
    height?: Strumber;
    variant?: "simple" | "icon";
    borderRadius?: keyof typeof theme.borderRadii;
    paddingIconText?: keyof typeof theme.spacing;
    reverse?: boolean;
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
    animationEnabled?: boolean;
    hapticEnabled?: boolean;
    children?: React.ReactNode;
    entering?: ComponentProps<typeof Animated.View>["entering"];
    exiting?: ComponentProps<typeof Animated.View>["exiting"];
    layout?: ComponentProps<typeof Animated.View>["layout"];
}

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get("window");

const Button: React.FC<ButtonProps> = ({
    title,
    width = (SCREEN_WIDTH * 50) / 100,
    height = (SCREEN_HEIGHT * 16.3) / 100,
    borderRadius = "hero3",
    style = {},
    reverse = false,
    hapticEnabled = true,
    paddingIconText = "m",
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
    animationEnabled = true,
    entering,
    exiting,
    layout,
    ...props
}) => {
    const pressed = useSharedValue(1);
    const animatedValue = useSharedValue(0);

    const renderSimpleButton = useCallback(() => {
        const inside = (
            <Box
                flexDirection={reverse ? "row-reverse" : "row"}
                paddingLeft={paddingIconText}
                alignItems="center">
                {title !== "" && (
                    <Box alignItems="center" justifyContent="center" flex={1}>
                        <AppText
                            {...{fontSize}}
                            color={textColor}
                            variant="medium"
                            numberOfLines={1}>
                            {title}
                        </AppText>
                    </Box>
                )}
                <Box
                    alignItems={reverse ? "flex-end" : "flex-start"}
                    justifyContent="center"
                    flex={0.5}>
                    <Box justifyContent="center">{children}</Box>
                </Box>
            </Box>
        );
        return (
            //@ts-ignore
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
        paddingIconText,
        props,
        reverse,
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
            //@ts-ignore
            <Box
                {...{backgroundColor, width, height, style, borderRadius}}
                {...props}>
                {inside}
            </Box>
        );
    }, [backgroundColor, borderRadius, height, icon, props, style, width]);
    const animatedStyle = useAnimatedStyle(() => {
        const scale = interpolate(pressed.value, [scaleTo, 1], [scaleTo, 1]);
        return {transform: [{scale}]};
    });

    const optionallyTriggerHaptic = useCallback(() => {
        if (hapticEnabled && Platform.OS === "ios") {
            RNReactNativeHapticFeedback.trigger("selection");
        }
    }, [hapticEnabled]);

    const handlePressIn = useCallback(() => {
        if (animationEnabled && !disabled) {
            animatedValue.value = withTiming(1);
            onPressIn?.();
        }
    }, [animationEnabled, disabled]);
    const handlePressOut = useCallback(() => {
        if (animationEnabled && !disabled) {
            animatedValue.value = withTiming(0);
            onPressOut?.();
        }
    }, [animationEnabled, disabled]);
    const handlePress = useCallback(() => {
        onPress?.();
        optionallyTriggerHaptic();
    }, [disabled, optionallyTriggerHaptic, onPress]);

    const animatedContainerStyle = useAnimatedStyle(() => {
        const scale = animationEnabled
            ? interpolate(animatedValue.value, [0, 1], [1, 0.95])
            : 1;

        return {
            transform: [{scale}],
        };
    }, [animatedValue.value, animationEnabled]);
    return (
        <Animated.View
            style={animatedContainerStyle}
            entering={entering}
            exiting={exiting}>
            <AppTouchable
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                disabled={disabled}
                disableText={disableText}
                activeOpacity={0.9}
                onPress={handlePress}>
                <Animated.View style={animatedStyle}>
                    {variant === "simple" && renderSimpleButton()}
                    {variant === "icon" && renderIconButton()}
                </Animated.View>
            </AppTouchable>
        </Animated.View>
    );
};

export default Button;
