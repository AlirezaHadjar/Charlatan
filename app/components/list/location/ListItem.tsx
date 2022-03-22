import {useTheme} from "@shopify/restyle";
import React from "react";
import {
    Dimensions,
    Platform,
    StyleProp,
    StyleSheet,
    TextInput,
    ViewStyle,
} from "react-native";
import Animated, {FadeInDown} from "react-native-reanimated";

import Box from "../../../theme/Box";
import theme, {ThemeType} from "../../../theme/Theme";
import normalize from "../../../utils/normalizer";
import AppTouchable from "../../Touchable";

export interface ListItemProps {
    id: string;
    end?: JSX.Element;
    index: number;
    name: string;
    onEndPress?: (id: string) => void;
    onChangeText?: (text: string, id: string) => void;
    onBlur?: (text: string, id: string) => void;
    backgroundColor: keyof typeof theme["colors"];
    endDisabled?: boolean;
    enabled: boolean;
    endDisableText: string;
    containerStyle?: StyleProp<ViewStyle>;
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
    index,
    enabled = true,
    name,
    onEndPress,
    onChangeText,
    onBlur,
    backgroundColor,
    endDisabled,
    endDisableText,
    containerStyle,
}) => {
    const theme = useTheme<ThemeType>();

    return (
        <AppTouchable
            enabled={onChangeText ? false : true && enabled}
            disabled={endDisabled}
            disableText={endDisableText}
            onPress={() => {
                if (onEndPress) onEndPress(id);
            }}>
            <Animated.View
                style={containerStyle}
                entering={FadeInDown.duration(200)
                    .springify()
                    .delay(100 * index)}>
                <Box
                    width={BOX_SIZE}
                    height={BOX_SIZE}
                    marginVertical="s"
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
                            onBlur={() => onBlur && onBlur(name, id)}
                            value={name}
                            pointerEvents={onChangeText ? "auto" : "none"}
                            maxLength={15}
                            editable={onChangeText ? true : false}
                            style={{
                                paddingTop: Platform.OS === "ios" ? "40%" : 0,
                                fontFamily: "Kalameh Bold",
                                fontSize: normalize(18),
                                fontWeight: "normal",
                                color: theme.colors.thirdText,
                                flex: 1,
                                textAlign: "center",
                            }}
                            onChangeText={text =>
                                onChangeText && onChangeText(text, id)
                            }
                        />
                    </Box>
                    {end && (
                        <AppTouchable
                            enabled={onChangeText ? true : false}
                            disabled={endDisabled}
                            disableText={endDisableText}
                            style={styles.cross}
                            onPress={() => {
                                if (onEndPress) onEndPress(id);
                            }}>
                            <Box justifyContent="center">{end}</Box>
                        </AppTouchable>
                    )}
                </Box>
            </Animated.View>
        </AppTouchable>
    );
};

export default ListItem;
