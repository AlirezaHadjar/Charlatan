import {useTheme} from "@shopify/restyle";
import React, {ReactNode} from "react";
import {StyleSheet, Dimensions, StyleProp, ViewStyle, View} from "react-native";
import Svg, {Circle} from "react-native-svg";
import Animated, {
    createAnimatedPropAdapter,
    interpolateColor,
    processColor,
    useAnimatedProps,
} from "react-native-reanimated";

import {ThemeType} from "../theme/Theme";

export interface CircularProgressbarProps {
    radius?: number;
    strokeWidth?: number;
    backgroundColor?: keyof ThemeType["colors"];
    progressColor?: keyof ThemeType["colors"];
    style?: StyleProp<ViewStyle>;
    progress: Animated.SharedValue<number>;
    children?: ReactNode;
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
    const props = useAnimatedProps(
        () => {
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
        },
        [],
        createAnimatedPropAdapter(
            props => {
                if (Object.keys(props).includes("fill")) {
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    props.fill = {type: 0, payload: processColor(props.fill)};
                }
                if (Object.keys(props).includes("stroke")) {
                    props.stroke = {
                        type: 0,
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        payload: processColor(props.stroke),
                    };
                }
            },
            ["fill", "stroke"],
        ),
    );
    return (
        <View style={styles.container}>
            <Svg style={[styles.circleContainer, style]}>
                <Circle
                    cx={"50%"}
                    cy={"50%"}
                    r={radius}
                    strokeWidth={strokeWidth}
                    stroke={theme.colors[backgroundColor]}
                    fill={theme.colors.transparent}
                />
                <AnimatedCircle
                    cx={"50%"}
                    cy={"50%"}
                    r={radius}
                    strokeWidth={strokeWidth}
                    strokeDasharray={CIRCLE_LENGTH}
                    strokeLinecap="round"
                    animatedProps={props}
                    fill={theme.colors.transparent}
                />
            </Svg>
            {children}
        </View>
    );
};

export default CircularProgressbar;
