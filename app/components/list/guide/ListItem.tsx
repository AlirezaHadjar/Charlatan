import {useTheme} from "@shopify/restyle";
import React from "react";
import {StyleSheet, ScrollView} from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

import Box from "../../../theme/Box";
import {ThemeType} from "../../../theme/Theme";
import {Guide} from "../../../types";
import AppText from "../../Text";
import normalize from "../../../utils/normalizer";

export interface ListItemProps {
    item: Guide;
    width: number;
    index: number;
    offsetX: Animated.SharedValue<number>;
    margin: number;
}

const ListItem: React.FC<ListItemProps> = ({
    item,
    width,
    margin,
    offsetX,
    index,
}) => {
    const theme = useTheme<ThemeType>();

    const bouncingY = useSharedValue(0);

    const wholeWidth = width + 2 * margin;

    const styles = StyleSheet.create({
        card: {
            width,
            borderRadius: theme.borderRadii.ssl,
            alignItems: "center",
            marginHorizontal: margin,
            overflow: "hidden",
        },
    });

    const animatedStyles = useAnimatedStyle(() => {
        const opacity = interpolate(
            offsetX.value,
            [
                (index - 1) * wholeWidth,
                index * wholeWidth,
                (index + 1) * wholeWidth,
            ],
            [0, 1, 0],
            Extrapolate.CLAMP,
        );
        const translateY = interpolate(
            offsetX.value,
            [
                (index - 1) * wholeWidth,
                index * wholeWidth,
                (index + 1) * wholeWidth,
            ],
            [20, 0, 20],
        );
        return {
            opacity,
            transform: [{translateY}, {translateY: bouncingY.value}],
        };
    }, [index, offsetX.value]);

    return (
        <Animated.View style={[animatedStyles, styles.card]}>
            <Box width="100%" padding="m" height="100%">
                <ScrollView showsVerticalScrollIndicator={false}>
                    <Box marginBottom="m">
                        <AppText variant="bold" fontSize={normalize(25)}>
                            {item.title}
                        </AppText>
                    </Box>
                    <AppText
                        fontSize={normalize(20)}
                        lineHeight={normalize(40)}>
                        {item.description}
                    </AppText>
                </ScrollView>
            </Box>
        </Animated.View>
    );
};

export default ListItem;
