import React, {useEffect} from "react";
import Animated, {
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

export interface AnimatableProps {
    duration?: number;
    relocation?: number;
}

const Animatable: React.FC<AnimatableProps> = ({
    children,
    duration = 1000,
    relocation = 10,
}) => {
    const progress = useSharedValue(0);
    useEffect(() => {
        progress.value = 0;
        progress.value = withTiming(1, {duration});
    }, [duration, progress]);

    const styles = useAnimatedStyle(() => {
        const opacity = interpolate(progress.value, [0, 1], [0.5, 1]);
        const translateY = interpolate(progress.value, [0, 1], [relocation, 0]);
        return {
            opacity,
            transform: [{translateY}],
        };
    }, []);
    return <Animated.View style={styles}>{children}</Animated.View>;
};

export default Animatable;
