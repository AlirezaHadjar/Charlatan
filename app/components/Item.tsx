import React from "react";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
} from "react-native-reanimated";

import {ITEM_HEIGHT} from "../screens/Test";
import {PickerItem} from "../types";
import normalize from "../utils/normalizer";

import AppText from "./Text";

const ROTATION = 90;

const Item: React.FC<PickerItem> = ({item, index, offset}) => {
    const udv = useDerivedValue(() => {
        if (
            offset.value >= (index - 3) * ITEM_HEIGHT &&
            offset.value <= (index + 3) * ITEM_HEIGHT
        ) {
            return offset.value;
        } else if (offset.value < (index - 3) * ITEM_HEIGHT) {
            return null;
        } else if (offset.value > (index + 3) * ITEM_HEIGHT) {
            return null;
        }
    });
    const style = useAnimatedStyle(() => {
        const scale =
            udv.value === null
                ? 0
                : interpolate(
                      udv.value,
                      [
                          (index - 2) * ITEM_HEIGHT,
                          (index - 1) * ITEM_HEIGHT,
                          index * ITEM_HEIGHT,
                          (index + 1) * ITEM_HEIGHT,
                          (index + 2) * ITEM_HEIGHT,
                      ],
                      [0.5, 0.65, 1, 0.65, 0.5],
                      Extrapolate.CLAMP,
                  );
        const opacity =
            udv.value === null
                ? 0
                : interpolate(
                      udv.value,
                      [
                          (index - 3) * ITEM_HEIGHT,
                          (index - 2) * ITEM_HEIGHT,
                          (index - 1) * ITEM_HEIGHT,
                          index * ITEM_HEIGHT,
                          (index + 1) * ITEM_HEIGHT,
                          (index + 2) * ITEM_HEIGHT,
                          (index + 3) * ITEM_HEIGHT,
                      ],
                      [0, 0.35, 0.4, 1, 0.4, 0.35, 0],
                      Extrapolate.CLAMP,
                  );
        const rotation =
            udv.value === null
                ? 0
                : interpolate(
                      udv.value,
                      [
                          (index - 3) * ITEM_HEIGHT,
                          (index - 2) * ITEM_HEIGHT,
                          (index - 2) * ITEM_HEIGHT * 0.6,
                          (index - 1) * ITEM_HEIGHT,
                          index * ITEM_HEIGHT,
                          (index + 1) * ITEM_HEIGHT,
                          (index + 2) * ITEM_HEIGHT * 0.6,
                          (index + 2) * ITEM_HEIGHT,
                          (index + 3) * ITEM_HEIGHT,
                      ],
                      [
                          -ROTATION * 1.5,
                          -ROTATION * 0.7,
                          -ROTATION * 0.6,
                          -ROTATION * 0.5,
                          0,
                          ROTATION * 0.5,
                          ROTATION * 0.6,
                          ROTATION * 0.7,
                          ROTATION * 1.5,
                      ],
                      Extrapolate.CLAMP,
                  );
        return {
            height: ITEM_HEIGHT,
            opacity,
            maxWidth: 100,
            alignItems: "center",
            justifyContent: "center",
            transform: [
                {scale},
                {rotateX: `${rotation}deg`},
                {perspective: 600},
            ],
        };
    }, [udv, index, offset, item, index]);
    return (
        <Animated.View style={style}>
            <AppText textAlign="center" color="light" fontSize={normalize(50)}>
                {item.title}
            </AppText>
        </Animated.View>
    );
};

export default Item;
