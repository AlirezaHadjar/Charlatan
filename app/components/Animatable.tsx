import {BoxProps} from "@shopify/restyle";
import React, {useEffect} from "react";
import Animated, {
    FadeInDown,
    interpolate,
    Layout,
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
    duration,
    ...rest
}) => {
    return (
        <Box {...rest}>
            <Animated.View
                layout={Layout.duration(duration).springify()}
                entering={FadeInDown.duration(duration).springify()}>
                {children}
            </Animated.View>
        </Box>
    );
};

export default Animatable;
