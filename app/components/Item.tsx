import React, {memo, useMemo} from "react";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
} from "react-native-reanimated";

import {PickerItem} from "../types";
import normalize from "../utils/normalizer";
import {ITEM_HEIGHT} from "../../SpyHunt";

import AppText from "./Text";

const ROTATION = 90;
const perspective = 600;

const scaleAnimation = (udv: Animated.SharedValue<number>, index: number) => {
    "worklet";

    return udv.value === null
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
};
const opacityAnimation = (udv: Animated.SharedValue<number>, index: number) => {
    "worklet";

    return udv.value === null
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
};
const rotationAnimation = (
    udv: Animated.SharedValue<number>,
    index: number,
) => {
    "worklet";

    return udv.value === null
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
              [
                  -ROTATION * 1.5,
                  -ROTATION * 1.5,
                  -ROTATION * 0.5,
                  0,
                  ROTATION * 0.5,
                  ROTATION * 1.5,
                  ROTATION * 1.5,
              ],
              Extrapolate.CLAMP,
          );
};

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
    const style = useAnimatedStyle(
        () => ({
            height: ITEM_HEIGHT,
            opacity: opacityAnimation(udv, index),
            maxWidth: 100,
            alignItems: "center",
            justifyContent: "center",
            transform: [
                {scale: scaleAnimation(udv, index)},
                {rotateX: `${rotationAnimation(udv, index)}deg`},
                {perspective},
            ],
        }),
        [udv, index, offset, item, index],
    );

    return useMemo(
        () => (
            <Animated.View style={style}>
                <AppText
                    textAlign="center"
                    color="light"
                    fontSize={normalize(40)}>
                    {item.title}
                </AppText>
            </Animated.View>
        ),
        [item.title, style],
    );
};

export default memo(Item);
