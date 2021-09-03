import {BoxProps} from "@shopify/restyle";
import React, {useEffect} from "react";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import Box from "../theme/Box";
import {ThemeType} from "../theme/Theme";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type DependencyList = ReadonlyArray<any>;

export interface AnimatableProps extends BoxProps<ThemeType> {
    duration?: number;
    relocation?: number;
    deps?: DependencyList;
}

const Animatable: React.FC<AnimatableProps> = ({
    children,
    duration = 1000,
    relocation = 10,
    deps,
    ...rest
}) => {
    const progress = useSharedValue(0);
    useEffect(() => {
        progress.value = 0;
        progress.value = withTiming(1, {duration: 200}, isFinished => {
            if (isFinished) progress.value = withTiming(1, {duration});
        });
    }, [duration, progress, deps]);

    const styles = useAnimatedStyle(() => {
        const opacity = interpolate(progress.value, [0, 1], [0.5, 1]);
        const translateY = interpolate(progress.value, [0, 1], [relocation, 0]);
        return {
            opacity,
            transform: [{translateY}],
        };
    }, []);
    return (
        <Box {...rest}>
            <Animated.View style={styles}>{children}</Animated.View>
        </Box>
    );
};

export default Animatable;
