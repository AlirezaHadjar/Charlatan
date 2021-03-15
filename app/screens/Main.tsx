import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import {useTheme} from "@shopify/restyle";
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import Container from "../components/Container";
import Box from "../theme/Box";
import AppText from "../components/Text";
import normalize from "../utils/normalizer";
import Button from "../components/Button";
import Play from "../assets/SVGs/Play";
import Cog from "../assets/SVGs/Cog";
import Players from "../assets/SVGs/Players";
import Clock from "../assets/SVGs/Clock";
import Pin from "../assets/SVGs/Pin";
import Question from "../assets/SVGs/Question";
import Icon from "../components/Icon";
import {ThemeType} from "../theme/Theme";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainProps {}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {height, width} = Dimensions.get("window");

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        flex: 0.9,
        justifyContent: "space-evenly",
    },
});

const Main: React.FC<MainProps> = ({}) => {
    const theme = useTheme<ThemeType>();
    const isOpen = useSharedValue(0);
    const animatedCogStyles = useAnimatedStyle(() => {
        const rotation = interpolate(isOpen.value, [0, 1], [0, 90]);
        return {
            transform: [{rotate: `${rotation}deg`}],
        };
    });
    const animatedSettingStyles1 = useAnimatedStyle(() => {
        const shift = interpolate(
            isOpen.value,
            [0, 0.2],
            [-10, 0],
            Extrapolate.CLAMP,
        );
        const opacity = interpolate(
            isOpen.value,
            [0, 0.2, 0.8, 1],
            [0, 0.8, 1, 1],
        );
        return {
            transform: [{translateX: shift}],
            opacity,
        };
    });
    const animatedSettingStyles2 = useAnimatedStyle(() => {
        const shift = interpolate(
            isOpen.value,
            [0, 0.4],
            [-10, 0],
            Extrapolate.CLAMP,
        );
        const opacity = interpolate(
            isOpen.value,
            [0, 0.6, 0.8, 1],
            [0, 1, 1, 1],
        );
        return {
            transform: [{translateX: shift}],
            opacity,
        };
    });
    const animatedSettingStyles3 = useAnimatedStyle(() => {
        const shift = interpolate(
            isOpen.value,
            [0, 0.6],
            [-10, 0],
            Extrapolate.CLAMP,
        );
        const opacity = interpolate(
            isOpen.value,
            [0, 0.9, 0.95, 1],
            [0, 0.9, 1, 1],
        );
        return {
            transform: [{translateX: shift}],
            opacity,
        };
    });
    const handleAnimation = () => {
        isOpen.value = withTiming(isOpen.value > 0 ? 0 : 1, {
            duration: 500,
            easing: Easing.ease,
        });
    };
    return (
        <Container
            alignItems="center"
            paddingBottom="lxl"
            paddingHorizontal="ml">
            <Box>
                <AppText fontSize={normalize(80)}>Spy Hunt!</AppText>
            </Box>
            <Box position="absolute" top="65%">
                <Button
                    title=""
                    variant="icon"
                    icon={<Play />}
                    alignSelf="center"
                />
            </Box>
            <Box
                position="absolute"
                bottom={theme.spacing.m + theme.spacing.s}
                width="100%"
                flexDirection="row-reverse"
                justifyContent="space-between">
                <Icon icon={<Question />} />
                <Box flexDirection="row" flex={1}>
                    <Animated.View style={animatedCogStyles}>
                        <Icon icon={<Cog />} onPress={handleAnimation} />
                    </Animated.View>
                    <Animated.View style={[styles.buttonContainer]}>
                        <Animated.View style={animatedSettingStyles1}>
                            <Icon
                                icon={<Players />}
                                backgroundColor="buttonSecondary"
                                visible={isOpen}
                            />
                        </Animated.View>
                        <Animated.View style={animatedSettingStyles2}>
                            <Icon
                                icon={<Pin />}
                                backgroundColor="buttonSecondary"
                                visible={isOpen}
                            />
                        </Animated.View>
                        <Animated.View style={animatedSettingStyles3}>
                            <Icon
                                icon={<Clock />}
                                backgroundColor="buttonSecondary"
                                visible={isOpen}
                            />
                        </Animated.View>
                    </Animated.View>
                </Box>
            </Box>
        </Container>
    );
};

export default Main;
