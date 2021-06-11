import {useTheme} from "@shopify/restyle";
import React from "react";
import {Pressable} from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

import {ThemeType} from "../../../theme/Theme";
import {Game} from "../../../types";
import AppText from "../../Text";

export interface ListItemProps {
    item: Game;
    width: number;
    height: number;
    index: number;
    offsetX: Animated.SharedValue<number>;
    margin: number;
    onPress?: (id: string) => void;
}

const ListItem: React.FC<ListItemProps> = ({
    item,
    onPress,
    width,
    height,
    margin,
    offsetX,
    index,
}) => {
    const theme = useTheme<ThemeType>();

    const wholeWidth = width + 2 * margin;

    const animatedStyles = useAnimatedStyle(() => {
        const scaleY = interpolate(
            offsetX.value,
            [
                (index - 1) * wholeWidth,
                index * wholeWidth,
                (index + 1) * wholeWidth,
            ],
            [0.92, 1, 0.92],
            Extrapolate.CLAMP,
        );
        return {
            width,
            height,
            borderRadius: theme.borderRadii.ssl,
            backgroundColor: theme.colors.cardBackground,
            alignItems: "center",
            justifyContent: "center",
            marginHorizontal: margin,
            transform: [{scaleY}],
        };
    }, [index, offsetX.value]);

    // useEffect(() => {
    //     progress.value = 0;
    //     progress.value = withTiming(1, {duration: 200 + index * 200});
    // }, [index, progress]);

    return (
        <Pressable onPress={() => onPress(item.id)}>
            <Animated.View style={animatedStyles}>
                <AppText>{item.name}</AppText>
            </Animated.View>
        </Pressable>
    );
};

export default ListItem;
