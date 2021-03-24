import {useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions, TextInput} from "react-native";
import {TouchableOpacity} from "react-native-gesture-handler";

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

const {height} = Dimensions.get("window");

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
                width="100%"
                height={LISTITEM_HEIGHT}
                marginVertical="ss"
                paddingHorizontal="m"
                backgroundColor="light"
                flexDirection="row"
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
                    onPress={() => {
                        if (onEndPress) onEndPress(id);
                    }}>
                    <Box justifyContent="center" height="100%">
                        {end}
                    </Box>
                </TouchableOpacity>
            </Box>
        </Box>
    );
};

export default ListItem;
