import React from "react";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

import {ITEM_HEIGHT} from "../screens/Test";
import normalize from "../utils/normalizer";

import AppText from "./Text";

export interface ItemProps {
    item: {content: string; id: number};
    index: number;
    offset: Animated.SharedValue<number>;
}

const ROTATION = 50;

const Item: React.FC<ItemProps> = ({item, index, offset}) => {
    const style = useAnimatedStyle(() => {
        const inputRange = [
            (index - 1) * ITEM_HEIGHT,
            index * ITEM_HEIGHT,
            (index + 1) * ITEM_HEIGHT,
        ];
        const scale = interpolate(
            offset.value,
            inputRange,
            [0.7, 1, 0.7],
            Extrapolate.CLAMP,
        );
        const opacity = interpolate(
            offset.value,
            inputRange,
            [0.7, 1, 0.7],
            Extrapolate.CLAMP,
        );
        const rotateX = interpolate(offset.value, inputRange, [
            -ROTATION,
            0,
            ROTATION,
        ]);
        return {
            // width: ITEM_HEIGHT,
            height: ITEM_HEIGHT,
            // backgroundColor: "blue",
            opacity,
            alignItems: "center",
            justifyContent: "center",
            transform: [
                {scale},
                {rotateX: `${rotateX}deg`},
                {perspective: 600},
            ],
        };
    }, []);
    return (
        <Animated.View style={style}>
            <AppText textAlign="center" color="light" fontSize={normalize(50)}>
                {item.content}
            </AppText>
        </Animated.View>
    );
};
export default Item;
