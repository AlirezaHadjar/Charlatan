import {BackgroundColorProps, BorderProps, useTheme} from "@shopify/restyle";
import React, {RefObject, useState} from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Dimensions,
    TextInputProps,
    NativeSyntheticEvent,
    TextInputFocusEventData,
} from "react-native";

import theme, {Theme} from "../theme/theme";
import normalize from "../utils/normalizer";

type newProp = TextInputProps &
    BackgroundColorProps<typeof theme> &
    BorderProps<typeof theme>;

export interface Props extends newProp {
    width?: string | number;
    height?: number;
    borderRadius?: number;
    appRef?: RefObject<TextInput>;
    onChangeText: (text: string) => void;
    fontSize?: number;
    textAlign?: "right" | "left" | "center";
    containerStyle?: object;
    minHeight?: number;
    inputStyle?: object;
    onFocus?: (e: NativeSyntheticEvent<TextInputFocusEventData>) => void;
    onBlur?: () => void;
    Icon?: Element;
}

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const Digits = {
    persian: [/۰/g, /۱/g, /۲/g, /۳/g, /۴/g, /۵/g, /۶/g, /۷/g, /۸/g, /۹/g],
    english: ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"],
};

const translateDigits = (text: string) => {
    let newText = text;
    for (let i = 0; i < Digits.english.length; i++) {
        newText = newText.replace(Digits.persian[i], Digits.english[i]);
    }
    return newText;
};

const AppTextInput: React.FC<Props> = ({
    fontSize = normalize(16),
    width = "60%",
    height = 45,
    borderRadius = (SCREEN_HEIGHT * 1.45) / 100,
    appRef = null,
    textAlign = "right",
    onFocus,
    multiline = false,
    containerStyle,
    minHeight = 25,
    onChangeText,
    inputStyle,
    Icon,
    ...rest
}) => {
    const [focused, setFocused] = useState(false);
    const [containerHeight, setContainerHeight] = useState(45);

    const {colors} = useTheme<Theme>();

    const handleChangeText = (text: string) => {
        return onChangeText(translateDigits(text));
    };

    const styles = StyleSheet.create({
        container: {
            borderRadius,
            flexDirection: "row",
            paddingHorizontal: 10,
            marginVertical: "2%",
            justifyContent: "center",
            alignItems: multiline ? "flex-start" : "center",
            borderWidth: 1,
            borderColor: focused ? "#000" : colors.grey,
            width,
            height: multiline ? containerHeight + minHeight : height,
        },
        input: {
            fontSize,
            textAlign,
            alignItems: "flex-end",
            fontFamily: "IRANYekanMobileMedium",
            paddingVertical: multiline ? 10 : 0,
            width: "100%",
            textAlignVertical: "top",
        },
    });
    return (
        <View style={[styles.container, containerStyle]}>
            {Icon && (
                <View
                    style={{
                        marginHorizontal: 10,
                        alignItems: "center",
                        justifyContent: "center",
                    }}>
                    {Icon}
                </View>
            )}
            <View
                style={{
                    flex: 1,
                }}>
                <TextInput
                    multiline={multiline}
                    onFocus={(e) => {
                        setFocused(true);
                        if (onFocus !== undefined) onFocus(e);
                    }}
                    onBlur={() => {
                        setFocused(false);
                    }}
                    onChangeText={handleChangeText}
                    onContentSizeChange={(e) => {
                        const inputHeight = e.nativeEvent.contentSize.height;
                        if (inputHeight <= SCREEN_HEIGHT / 8 && multiline)
                            setContainerHeight(inputHeight);
                    }}
                    style={[styles.input, inputStyle]}
                    {...rest}
                    // textAlignVertical="center"
                    ref={appRef}
                />
            </View>
        </View>
    );
};

export default AppTextInput;
