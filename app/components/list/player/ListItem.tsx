import {useTheme} from "@shopify/restyle";
import React from "react";
import {TextInput} from "react-native";

import {LISTITEM_HEIGHT} from "../../../../SpyHunt";
import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";
import Box from "../../../theme/Box";
import theme, {ThemeType} from "../../../theme/Theme";
import normalize from "../../../utils/normalizer";
import AppTouchable from "../../Touchable";

export interface ListItemProps {
    id: string;
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
        <Box>
            <Box
                width="100%"
                height={LISTITEM_HEIGHT}
                marginVertical="ss"
                paddingHorizontal="m"
                backgroundColor={backgroundColor}
                flexDirection={language === "en" ? "row" : "row-reverse"}
                alignItems="center"
                borderRadius="l">
                <Box justifyContent="center" flex={1} height="100%">
                    <TextInput
                        maxLength={15}
                        onBlur={() => onBlur && onBlur(name, id)}
                        value={name}
                        editable={onChangeText ? true : false}
                        style={{
                            fontFamily: "Kalameh Bold",
                            fontSize: normalize(18),
                            fontWeight: "normal",
                            color: theme.colors[textColor],
                        }}
                        onChangeText={(text) =>
                            onChangeText && onChangeText(text, id)
                        }
                    />
                </Box>
                <AppTouchable
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
        </Box>
    );
};

export default ListItem;
