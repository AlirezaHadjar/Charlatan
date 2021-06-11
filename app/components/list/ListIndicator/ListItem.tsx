import {useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

import {ThemeType} from "../../../theme/theme";

export interface ListItemProps {
    itemWidth: number;
    index: number;
    offsetX: Animated.SharedValue<number>;
}

const {width} = Dimensions.get("window");
const SIZE = (width * 2.5) / 100;

const ListItem: React.FC<ListItemProps> = ({index, itemWidth, offsetX}) => {
    const {colors} = useTheme<ThemeType>();
    const styles = StyleSheet.create({
        indicator: {
            width: SIZE,
            height: SIZE,
            backgroundColor: colors.cardIndicator,
        },
    });
    const animatedStyles = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * itemWidth,
            index * itemWidth,
            (index + 1) * itemWidth,
        ];
        const scaleX = interpolate(
            offsetX.value,
            inputRange,
            [1, 2, 1],
            Extrapolate.CLAMP,
        );

        const opacity = interpolate(
            offsetX.value,
            inputRange,
            [0.5, 1, 0.5],
            Extrapolate.CLAMP,
        );
        return {
            opacity,
            borderRadius: SIZE / 1.6 / scaleX,
            transform: [{scaleX}],
            marginHorizontal: 5 * scaleX,
        };
    }, [offsetX.value]);
    return (
        <Animated.View style={[styles.indicator, animatedStyles]} key={index} />
    );
};

export default ListItem;
