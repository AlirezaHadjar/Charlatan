import React from "react";
import {StyleSheet, Dimensions, ViewProps} from "react-native";
import Animated, {
    useAnimatedProps,
    useDerivedValue,
    useSharedValue,
} from "react-native-reanimated";

import {ThemeType} from "../theme/Theme";

import Button from "./Button";

export interface IconProps {
    backgroundColor?: keyof ThemeType["colors"];
    onPress?: () => void;
    icon: JSX.Element;
    size?: number;
    visible?: Animated.SharedValue<number>;
}

const {width} = Dimensions.get("window");

const Icon: React.FC<IconProps> = ({
    icon,
    size = (width * 13.9) / 100,
    onPress,
    backgroundColor = "buttonSecondary",
    visible,
}) => {
    const isVisible = useSharedValue(1);
    useDerivedValue(() => {
        if (!visible) return;
        isVisible.value = visible.value;
    }, [visible]);
    const styles = StyleSheet.create({
        container: {
            width: size,
            alignItems: "center",
            justifyContent: "center",
            borderRadius: size / 2,
            height: size,
        },
    });
    const props = useAnimatedProps<ViewProps>(
        () => ({pointerEvents: isVisible.value > 0 ? "auto" : "none"}),
        [isVisible],
    );
    return (
        <Animated.View animatedProps={props}>
            <Button
                title=""
                variant="icon"
                backgroundColor={backgroundColor}
                style={styles.container}
                onPress={() => onPress && onPress()}
                icon={icon}
            />
        </Animated.View>
    );
};

export default Icon;
