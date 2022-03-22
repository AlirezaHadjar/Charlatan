import React from "react";
import {useTheme} from "@shopify/restyle";
import {TextInput} from "react-native";
import {
    Easing,
    Layout,
    FadeInDown,
    SlideOutLeft,
} from "react-native-reanimated";

import {LISTITEM_HEIGHT} from "../../../../SpyHunt";
import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";
import Box from "../../../theme/Box";
import theme, {ThemeType} from "../../../theme/Theme";
import normalize from "../../../utils/normalizer";
import AppTouchable from "../../Touchable";

export interface ListItemProps {
    id: string;
    index: number;
    end: JSX.Element;
    name: string;
    onEndPress?: (id: string) => void;
    onBlur?: (text: string, id: string) => void;
    onChangeText?: (text: string, id: string) => void;
    backgroundColor: keyof typeof theme["colors"];
    textColor: keyof typeof theme["colors"];
    endDisabled: boolean;
    endDisableText: string;
}

const ListItem: React.FC<ListItemProps> = ({
    id,
    index,
    end,
    endDisabled,
    name,
    onEndPress,
    onChangeText,
    onBlur,
    backgroundColor,
    textColor,
    endDisableText,
}) => {
    const theme = useTheme<ThemeType>();
    const language = useSelector(getLanguageName);

    return (
        <AppTouchable
            enabled={onChangeText ? false : true}
            disabled={endDisabled}
            disableText={endDisableText}
            onPress={() => {
                if (onEndPress) onEndPress(id);
            }}
            layout={Layout.easing(Easing.ease)
                .springify()
                .delay(index * 100)}
            exiting={SlideOutLeft.duration(200)}
            entering={FadeInDown.duration(500).delay(200 * index)}>
            <Box
                width="100%"
                height={LISTITEM_HEIGHT}
                marginVertical="s"
                paddingHorizontal="m"
                backgroundColor={backgroundColor}
                flexDirection={language === "en" ? "row" : "row-reverse"}
                alignItems="center"
                borderRadius="l">
                <Box justifyContent="center" height="100%">
                    <TextInput
                        maxLength={15}
                        onBlur={() => onBlur && onBlur(name, id)}
                        value={name}
                        pointerEvents={onChangeText ? "auto" : "none"}
                        editable={onChangeText ? true : false}
                        style={{
                            fontFamily: "Kalameh Bold",
                            fontWeight: "normal",
                            fontSize: normalize(18),
                            color: theme.colors[textColor],
                        }}
                        onChangeText={text =>
                            onChangeText && onChangeText(text, id)
                        }
                    />
                </Box>
                <Box flex={1} />
                <AppTouchable
                    enabled={onChangeText ? true : false}
                    disabled={endDisabled}
                    disableText={endDisableText}
                    onPress={() => {
                        if (onEndPress) onEndPress(id);
                    }}>
                    <Box
                        justifyContent="center"
                        height="100%"
                        marginEnd={language === "en" ? undefined : "s"}
                        marginStart={language === "en" ? "s" : undefined}>
                        {end}
                    </Box>
                </AppTouchable>
            </Box>
        </AppTouchable>
    );
};

export default ListItem;
