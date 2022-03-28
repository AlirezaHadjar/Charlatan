import {BoxProps} from "@shopify/restyle";
import React from "react";
import Animated, {FadeInDown, Layout} from "react-native-reanimated";

import Box from "../theme/Box";
import {ThemeType} from "../theme/Theme";

export interface AnimatableProps extends BoxProps<ThemeType> {
    duration?: number;
    relocation?: number;
}

const Animatable: React.FC<AnimatableProps> = ({
    children,
    duration = 200,
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
