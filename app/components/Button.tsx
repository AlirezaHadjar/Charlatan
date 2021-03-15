import {
    AllProps,
    BackgroundColorProps,
    BorderProps,
    SpacingProps,
} from "@shopify/restyle";
import React, {useCallback} from "react";
import {Dimensions, ViewStyle, TouchableOpacity} from "react-native";

import theme, {ThemeType} from "../theme/Theme";
import normalize from "../utils/normalizer";
import {Strumber} from "../type";
import Box from "../theme/Box";

import AppText from "./Text";

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
    onPress?: () => void;
    fontSize?: number;
}

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get("window");

const Button: React.FC<ButtonProps> = ({
    title,
    width = (SCREEN_WIDTH * 50) / 100,
    height = (SCREEN_HEIGHT * 16.3) / 100,
    borderRadius = "hero3",
    style = {},
    icon,
    backgroundColor = "darkGrey",
    textColor = "light",
    fontSize = normalize(13),
    disabled = false,
    variant = "simple",
    children,
    onPress,
    ...props
}) => {
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
                            variant="regular"
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
    return (
        <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => onPress && onPress()}
            disabled={disabled}>
            {variant === "simple" && renderSimpleButton()}
            {variant === "icon" && renderIconButton()}
        </TouchableOpacity>
    );
};

export default Button;
