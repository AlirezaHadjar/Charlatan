import {useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions, Pressable} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
} from "react-native-reanimated";

import {ThemeType} from "../../../theme/Theme";
import {Game} from "../../../types";
import AppText from "../../Text";

export interface ListItemProps {
    item: Game;
    onPress?: (id: string) => void;
}

const {width} = Dimensions.get("window");

const BOX_SIZE = (width * 60) / 100;

const ListItem: React.FC<ListItemProps> = ({item, onPress}) => {
    const theme = useTheme<ThemeType>();
    const progress = useSharedValue(0);

    const animatedStyles = useAnimatedStyle(() => {
        // const opacity = interpolate(progress.value, [0, 1], [0.5, 1]);
        // const translateY = interpolate(progress.value, [0, 1], [30, 0]);
        // const scale = interpolate(progress.value, [0, 1], [0.9, 1]);
        return {
            width: BOX_SIZE,
            height: BOX_SIZE,
            borderRadius: BOX_SIZE / 2,
            backgroundColor: "red",
            alignItems: "center",
            justifyContent: "center",
            opacity: 0.4,
        };
    });

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
