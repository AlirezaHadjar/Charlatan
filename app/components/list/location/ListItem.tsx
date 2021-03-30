import {useTheme} from "@shopify/restyle";
import React from "react";
import {
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

import Box from "../../../theme/Box";
import theme, {ThemeType} from "../../../theme/Theme";
import normalize from "../../../utils/normalizer";

export interface ListItemProps {
    id: string;
    end: JSX.Element;
    name: string;
    onEndPress?: (id: string) => void;
    onChangeText?: (text: string, id: string) => void;
    backgroundColor: keyof typeof theme["colors"];
    endDisabled: boolean;
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
                <Box justifyContent="center" flex={1} height="100%">
                    <TextInput
                        value={name}
                        editable={onChangeText ? true : false}
                        style={{
                            fontSize: normalize(18),
                            color: theme.colors.light,
                        }}
                        onChangeText={(text) =>
                            onChangeText && onChangeText(text, id)
                        }
                    />
                </Box>
                <TouchableOpacity
                    disabled={endDisabled}
                    style={styles.cross}
                    onPress={() => {
                        if (onEndPress) onEndPress(id);
                    }}>
                    <Box justifyContent="center">{end}</Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};

export default ListItem;
