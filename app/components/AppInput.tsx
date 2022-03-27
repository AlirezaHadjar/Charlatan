import {BottomSheetTextInput} from "@gorhom/bottom-sheet";
import {useTheme} from "@shopify/restyle";
import React, {forwardRef, useImperativeHandle, useMemo, useRef} from "react";
import {TextInput, TextInputProps, TextStyle, StyleProp} from "react-native";
import {Fonts} from "../constants/fonts";
import {getIsRTL} from "../store/reducers/language";
import {useSelector} from "../store/useSelector";
import {ThemeType} from "../theme/Theme";
import normalize from "../utils/normalizer";

export interface AppInputProps extends TextInputProps {
    isInBottomSheet?: boolean;
}
export interface AppInputRef {
    blur: () => void;
    focus: () => void;
}

const AppInput = forwardRef<AppInputRef, AppInputProps>(
    ({style, isInBottomSheet, ...props}, ref) => {
        const Input = isInBottomSheet ? BottomSheetTextInput : TextInput;
        const isRTL = useSelector(getIsRTL);
        const inputRef = useRef<TextInput>(null);
        const {spacing, colors} = useTheme<ThemeType>();

        const inputStyle: StyleProp<TextStyle> = useMemo(() => {
            const textAlign = isRTL ? "right" : "left";
            return {
                textAlign,
                width: "100%",
                fontWeight: "normal",
                fontFamily: Fonts.bold,
                fontSize: normalize(18),
                color: colors.fourthText,
                paddingVertical: spacing.m,
            };
        }, [isRTL, colors]);

        useImperativeHandle(ref, () => ({
            focus: () => inputRef.current?.focus(),
            blur: () => inputRef.current?.blur(),
        }));

        return (
            <Input
                //@ts-ignore
                ref={inputRef}
                maxLength={15}
                style={[inputStyle, style]}
                placeholderTextColor={colors.secondText}
                {...props}
            />
        );
    },
);

export default AppInput;
