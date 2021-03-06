import React, {useEffect} from "react";
import {StyleSheet, View} from "react-native";
import Animated, {
    Easing,
    useAnimatedProps,
    useSharedValue,
    withRepeat,
    withTiming,
} from "react-native-reanimated";
import Svg, {Path} from "react-native-svg";

export interface Props {
    containerColor?: string;
    width?: number;
    stroke?: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

const Loading: React.FC<Props> = ({
    containerColor = "#000",
    width = 100,
    stroke = 5,
}) => {
    const offset = useSharedValue(0);

    useEffect(() => {
        offset.value = withRepeat(
            withTiming(100, {
                duration: 3000,
                easing: Easing.ease,
            }),
            -1,
            false,

            () => {
                offset.value = 0;
            },
        );
    }, [offset]);

    const strokeDashoffset = useAnimatedProps(() => ({
        strokeDashoffset: offset.value,
    }));

    const styles = StyleSheet.create({
        container: {
            width,
            height: stroke / 2,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: width / 2,
            overflow: "hidden",
            alignSelf: "center",
            margin: 10,
        },
    });
    return (
        <View style={[styles.container, {transform: [{rotate: "180deg"}]}]}>
            <Svg>
                <AnimatedPath
                    d={`M 0 0 L ${width} 0`}
                    stroke={containerColor}
                    strokeWidth={stroke}
                    animatedProps={strokeDashoffset}
                    strokeDasharray={["140%", "10%"]}
                    strokeLinecap="butt"
                />
            </Svg>
        </View>
    );
};

export default Loading;
