import React, {useCallback, useEffect} from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import {useTheme} from "@shopify/restyle";
import Animated, {
    Easing,
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";
import {StackNavigationProp} from "@react-navigation/stack";
import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
    useIsFocused,
} from "@react-navigation/native";

import Box from "../theme/Box";
import AppText from "../components/Text";
import Button from "../components/Button";
import normalize from "../utils/normalizer";
import Play from "../assets/SVGs/Play";
import Cog from "../assets/SVGs/Cog";
import Players from "../assets/SVGs/Players";
import Clock from "../assets/SVGs/Clock";
import Pin from "../assets/SVGs/Pin";
import Pallet from "../assets/SVGs/Pallet";
import Language from "../assets/SVGs/Language";
import Question from "../assets/SVGs/Question";
import Icon from "../components/Icon";
import {ThemeType} from "../theme/Theme";
import {AppRoute} from "../navigations/AppNavigator";
import {GameRoutes} from "../navigations/GameNavigator";
import {useTranslation} from "../hooks/translation";
import {useLanguage} from "../hooks/useLanguage";
import {useSelector} from "../store/useSelector";
import {getLanguageName, setLanguage} from "../store/reducers/language";
import {LanguageName} from "../types";
import {useAppDispatch} from "../store/configureStore";
import {resetGame} from "../store/reducers/data";
import {useDarkTheme} from "../contexts/ThemeContext";
import AnimatedContainer from "../components/AnimatedContainer";
import Animatable from "../components/Animatable";
import {requests} from "../api/requests";
import {useInterval} from "../hooks/interval";

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<AppRoute, "Main">,
    StackNavigationProp<GameRoutes>
>;

export type MainProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {height, width} = Dimensions.get("window");

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: "row",
        flex: 0.9,
        justifyContent: "space-evenly",
    },
});

const Main: React.FC<MainProps> = ({navigation}) => {
    const theme = useTheme<ThemeType>();
    const isOpen = useSharedValue(0);
    const isFocused = useIsFocused();
    const translation = useTranslation();
    const language = useSelector(getLanguageName);
    const {toggle} = useDarkTheme();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetGame());
    }, [dispatch]);

    useInterval(() => requests.hideAd(), isFocused ? 2000 : null);

    useFocusEffect(() => {
        requests.hideAd();
    });

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

    const animatedSettingStyles4 = useAnimatedStyle(() => {
        const shift = interpolate(
            isOpen.value,
            [0, 0.2],
            [10, 0],
            Extrapolate.CLAMP,
        );
        const opacity = interpolate(
            isOpen.value,
            [0, 0.2, 0.8, 1],
            [0, 0.8, 1, 1],
        );
        return {
            transform: [{translateY: shift}],
            opacity,
        };
    });

    const animatedSettingStyles5 = useAnimatedStyle(() => {
        const shift = interpolate(
            isOpen.value,
            [0, 0.4],
            [10, 0],
            Extrapolate.CLAMP,
        );
        // const opacity = interpolate(
        //     isOpen.value,
        //     [0, 0.2, 0.8, 1],
        //     [0, 0.8, 1, 1],
        // );
        return {
            transform: [{translateY: shift}],
            opacity: 0,
        };
    });

    const handleAnimation = () => {
        isOpen.value = withTiming(isOpen.value > 0 ? 0 : 1, {
            duration: 500,
            easing: Easing.ease,
        });
    };
    const handleLanguage = useCallback(() => {
        const des: LanguageName = language === "en" ? "fa" : "en";
        dispatch(setLanguage(des));
    }, [dispatch, language]);

    useLanguage(language);

    return (
        <AnimatedContainer
            hasIcon
            alignItems="center"
            paddingBottom="lxl"
            paddingHorizontal="ml">
            <Box top="5%">
                <AppText fontSize={normalize(55)} variant="bold">
                    {translation.Main.title}
                </AppText>
            </Box>
            <Box position="absolute" top="29%">
                <Animatable>
                    <Button
                        title=""
                        variant="icon"
                        scaleTo={0.95}
                        icon={<Play />}
                        borderRadius="hero3"
                        alignSelf="center"
                        onPress={() => navigation.navigate("SelectGame")}
                    />
                </Animatable>
            </Box>
            <Box
                position="absolute"
                bottom={theme.spacing.m + theme.spacing.s}
                width="100%">
                <Box width={(width * 13.9) / 100}>
                    <Box marginBottom="s">
                        <Animated.View style={animatedSettingStyles5}>
                            <Icon
                                disabled
                                icon={<Pallet />}
                                onPress={() => toggle()}
                                backgroundColor="buttonTertiary"
                                visible={isOpen}
                            />
                        </Animated.View>
                    </Box>
                    <Box marginBottom="s">
                        <Animated.View style={animatedSettingStyles4}>
                            <Icon
                                icon={<Language />}
                                onPress={handleLanguage}
                                backgroundColor="buttonTertiary"
                                visible={isOpen}
                            />
                        </Animated.View>
                    </Box>
                </Box>
                <Box
                    width="100%"
                    flexDirection="row-reverse"
                    justifyContent="space-between">
                    <Icon
                        icon={<Question />}
                        onPress={() => navigation.navigate("Guide")}
                    />
                    <Box flexDirection="row" flex={1}>
                        <Animated.View style={animatedCogStyles}>
                            <Icon icon={<Cog />} onPress={handleAnimation} />
                        </Animated.View>
                        <View style={styles.buttonContainer}>
                            <Animated.View style={animatedSettingStyles1}>
                                <Icon
                                    onPress={() =>
                                        navigation.navigate("Players")
                                    }
                                    icon={<Players />}
                                    backgroundColor="buttonTertiary"
                                    visible={isOpen}
                                />
                            </Animated.View>
                            <Animated.View style={animatedSettingStyles2}>
                                <Icon
                                    onPress={() =>
                                        navigation.navigate("Locations")
                                    }
                                    icon={<Pin />}
                                    backgroundColor="buttonTertiary"
                                    visible={isOpen}
                                />
                            </Animated.View>
                            <Animated.View style={animatedSettingStyles3}>
                                <Icon
                                    onPress={() => navigation.navigate("Time")}
                                    icon={<Clock />}
                                    backgroundColor="buttonTertiary"
                                    visible={isOpen}
                                />
                            </Animated.View>
                        </View>
                    </Box>
                </Box>
            </Box>
        </AnimatedContainer>
    );
};

export default Main;
