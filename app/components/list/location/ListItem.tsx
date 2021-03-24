import {useTheme} from "@shopify/restyle";
import React from "react";
import {
    Dimensions,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";

import {LISTITEM_HEIGHT} from "../../../../SpyHunt";
import Box from "../../../theme/Box";
import {ThemeType} from "../../../theme/Theme";
import normalize from "../../../utils/normalizer";
import AppText from "../../Text";

export interface ListItemProps {
    id: string;
    end: JSX.Element;
    name: string;
    onEndPress?: (id: string) => void;
    onChangeText: (text: string, id: string) => void;
}

const {height, width} = Dimensions.get("window");

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
}) => {
    const theme = useTheme<ThemeType>();
    return (
        <Box>
            <Box
                width={BOX_SIZE}
                height={BOX_SIZE}
                marginVertical="ss"
                paddingHorizontal="m"
                backgroundColor="light"
                alignItems="center"
                borderRadius="l">
                <Box justifyContent="center" flex={1} height="100%">
                    <TextInput
                        value={name}
                        style={{
                            fontSize: normalize(18),
                            color: theme.colors.secondText,
                        }}
                        onChangeText={(text) => onChangeText(text, id)}
                    />
                </Box>
                <TouchableOpacity
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
