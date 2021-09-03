import {useTheme} from "@shopify/restyle";
import React from "react";
import {StyleSheet, Dimensions, StyleProp, ViewStyle, View} from "react-native";
import Svg, {Circle} from "react-native-svg";
import Animated, {
    interpolateColor,
    useAnimatedProps,
} from "react-native-reanimated";

import {ThemeType} from "../theme/theme";

export interface CircularProgressbarProps {
    radius?: number;
    strokeWidth?: number;
    backgroundColor?: keyof ThemeType["colors"];
    progressColor?: keyof ThemeType["colors"];
    style?: StyleProp<ViewStyle>;
    progress: Animated.SharedValue<number>;
}

const {width} = Dimensions.get("window");

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const R = width / 3;
const STROKE = 30;

const CircularProgressbar: React.FC<CircularProgressbarProps> = ({
    radius = R,
    strokeWidth = STROKE,
    backgroundColor = "cardGrey",
    progressColor = "secondBackground",
    progress,
    children,
    style = {},
}) => {
    const theme = useTheme<ThemeType>();
    const styles = StyleSheet.create({
        container: {
            alignItems: "center",
            justifyContent: "center",
            width: 2 * radius + strokeWidth,
            height: 2 * radius + strokeWidth,
        },
        circleContainer: {
            position: "absolute",
            transform: [{rotate: "-90deg"}],
        },
    });
    const CIRCLE_LENGTH = 2 * Math.PI * radius;
    const props = useAnimatedProps(() => {
        const value = 1 - progress.value;
        const color = interpolateColor(
            value,
            [0, 1],
            [theme.colors[progressColor], "red"],
        );
        return {
            strokeDashoffset: CIRCLE_LENGTH * value,
            stroke: color,
        };
    }, [progress.value]);
    return (
        <View style={styles.container}>
            <Svg style={[styles.circleContainer, style]}>
                <Circle
                    cx={"50%"}
                    cy={"50%"}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={theme.colors[backgroundColor]}
                />
                <AnimatedCircle
                    cx={"50%"}
                    cy={"50%"}
                    r={radius}
                    // stroke={theme.colors[progressColor]}
                    strokeWidth={strokeWidth}
                    strokeDasharray={CIRCLE_LENGTH}
                    strokeLinecap="round"
                    animatedProps={props}
                />
            </Svg>
            {children}
        </View>
    );
};

export default CircularProgressbar;
