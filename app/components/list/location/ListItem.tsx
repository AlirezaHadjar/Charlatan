import {useTheme} from "@shopify/restyle";
import React, {useEffect} from "react";
import {Dimensions, StyleSheet, TextInput} from "react-native";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import Box from "../../../theme/Box";
import theme, {ThemeType} from "../../../theme/Theme";
import normalize from "../../../utils/normalizer";
import AppTouchable from "../../Touchable";

export interface ListItemProps {
    id: string;
    end: JSX.Element;
    index: number;
    name: string;
    onEndPress?: (id: string) => void;
    onChangeText?: (text: string, id: string) => void;
    onBlur?: (text: string, id: string) => void;
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
    index,
    name,
    onEndPress,
    onChangeText,
    onBlur,
    backgroundColor,
    endDisabled,
    endDisableText,
}) => {
    const theme = useTheme<ThemeType>();
    const progress = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(progress.value, [0, 1], [0.5, 1]);
        const translateY = interpolate(progress.value, [0, 1], [30, 0]);
        const scale = interpolate(progress.value, [0, 1], [0.9, 1]);
        return {
            opacity,
            transform: [{translateY}, {scaleY: scale}],
        };
    }, [progress]);

    useEffect(() => {
        progress.value = 0;
        progress.value = withTiming(1, {duration: 200 + index * 200});
    }, [index, progress]);

    return (
        <Animated.View style={animatedStyles}>
            <Box
                width={BOX_SIZE}
                height={BOX_SIZE}
                marginVertical="ss"
                marginStart="s"
                // paddingHorizontal="m"
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
                        maxLength={15}
                        editable={onChangeText ? true : false}
                        style={{
                            fontFamily: "Kalameh Bold",
                            fontSize: normalize(15),
                            fontWeight: "normal",
                            color: theme.colors.thirdText,
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
        </Animated.View>
    );
};

export default ListItem;
