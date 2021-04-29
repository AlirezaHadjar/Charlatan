import {useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions, StyleSheet, TextInput} from "react-native";

import Box from "../../../theme/Box";
import theme, {ThemeType} from "../../../theme/Theme";
import normalize from "../../../utils/normalizer";
import AppTouchable from "../../Touchable";

export interface ListItemProps {
    id: string;
    end: JSX.Element;
    name: string;
    onEndPress?: (id: string) => void;
    onChangeText?: (text: string, id: string) => void;
    backgroundColor: keyof typeof theme["colors"];
    endDisabled: boolean;
    endDisableText: string;
}

const {width} = Dimensions.get("window");

const BOX_SIZE = (width * 28) / 100;

const styles = StyleSheet.create({
    cross: {
        position: "absolute",
        end: 5,
        top: 5,
    },
});

const ListItem: React.FC<ListItemProps> = ({
    id,
    end,
    name,
    onEndPress,
    onChangeText,
    backgroundColor,
    endDisabled,
    endDisableText,
}) => {
    const theme = useTheme<ThemeType>();
    return (
        <Box>
            <Box
                width={BOX_SIZE}
                height={BOX_SIZE}
                marginVertical="ss"
                marginStart="s"
                paddingHorizontal="m"
                backgroundColor={backgroundColor}
                alignItems="center"
                borderRadius="l">
                <Box
                    justifyContent="center"
                    flex={1}
                    height="100%"
                    width="100%">
                    <TextInput
                        multiline
                        value={name}
                        maxLength={15}
                        editable={onChangeText ? true : false}
                        style={{
                            fontFamily: "Kalameh Bold",
                            fontSize: normalize(17),
                            fontWeight: "normal",
                            color: theme.colors.light,
                            flex: 1,
                            textAlign: "center",
                        }}
                        onChangeText={(text) =>
                            onChangeText && onChangeText(text, id)
                        }
                    />
                </Box>
                <AppTouchable
                    disabled={endDisabled}
                    disableText={endDisableText}
                    style={styles.cross}
                    onPress={() => {
                        if (onEndPress) onEndPress(id);
                    }}>
                    <Box justifyContent="center">{end}</Box>
                </AppTouchable>
            </Box>
        </Box>
    );
};

export default ListItem;
