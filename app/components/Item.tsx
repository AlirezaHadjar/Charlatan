import React, {memo, useMemo} from "react";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
} from "react-native-reanimated";

import {PickerItem} from "../types";
import normalize from "../utils/normalizer";

import AppText from "./Text";

const ROTATION = 90;
const perspective = 600;

const scaleAnimation = (
    udv: Animated.SharedValue<number>,
    index: number,
    itemHeight: number,
) => {
    "worklet";

    return udv.value === null
        ? 0
        : interpolate(
              udv.value,
              [
                  (index - 2) * itemHeight,
                  (index - 1) * itemHeight,
                  index * itemHeight,
                  (index + 1) * itemHeight,
                  (index + 2) * itemHeight,
              ],
              [0.5, 0.65, 1, 0.65, 0.5],
              Extrapolate.CLAMP,
          );
};
const opacityAnimation = (
    udv: Animated.SharedValue<number>,
    index: number,
    itemHeight: number,
) => {
    "worklet";

    return udv.value === null
        ? 0
        : interpolate(
              udv.value,
              [
                  (index - 3) * itemHeight,
                  (index - 2) * itemHeight,
                  (index - 1) * itemHeight,
                  index * itemHeight,
                  (index + 1) * itemHeight,
                  (index + 2) * itemHeight,
                  (index + 3) * itemHeight,
              ],
              [0, 0.35, 0.4, 1, 0.4, 0.35, 0],
              Extrapolate.CLAMP,
          );
};
const rotationAnimation = (
    udv: Animated.SharedValue<number>,
    index: number,
    itemHeight: number,
) => {
    "worklet";

    return udv.value === null
        ? 0
        : interpolate(
              udv.value,
              [
                  (index - 3) * itemHeight,
                  (index - 2) * itemHeight,
                  (index - 1) * itemHeight,
                  index * itemHeight,
                  (index + 1) * itemHeight,
                  (index + 2) * itemHeight,
                  (index + 3) * itemHeight,
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

const Item: React.FC<PickerItem> = ({
    item,
    index,
    offset,
    itemHeight,
    itemWidth,
    maxWidth,
}) => {
    const udv = useDerivedValue(() => {
        if (
            offset.value >= (index - 3) * itemHeight &&
            offset.value <= (index + 3) * itemHeight
        ) {
            return offset.value;
        } else if (offset.value < (index - 3) * itemHeight) {
            return null;
        } else if (offset.value > (index + 3) * itemHeight) {
            return null;
        }
    });
    const style = useAnimatedStyle(
        () => ({
            height: itemHeight,
            width: itemWidth,
            opacity: opacityAnimation(udv, index, itemHeight),
            maxWidth,
            alignItems: "center",
            justifyContent: "center",
            transform: [
                {scale: scaleAnimation(udv, index, itemHeight)},
                {rotateX: `${rotationAnimation(udv, index, itemHeight)}deg`},
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
                    // color=""
                    fontSize={normalize(40)}>
                    {item.title}
                </AppText>
            </Animated.View>
        ),
        [item.title, style],
    );
};

export default memo(Item);
