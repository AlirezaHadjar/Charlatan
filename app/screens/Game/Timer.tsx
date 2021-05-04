import React, {useCallback, useEffect, useMemo, useState} from "react";
import {
    StyleSheet,
    Dimensions,
    BackHandler,
    TouchableOpacity,
} from "react-native";
import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
    // eslint-disable-next-line import/no-extraneous-dependencies
} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
    useDerivedValue,
    withTiming,
} from "react-native-reanimated";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Box from "../../theme/Box";
import Stop from "../../assets/SVGs/Stop";
import BackCross from "../../assets/SVGs/BackCross";
import Play from "../../assets/SVGs/Play";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {useSelector} from "../../store/useSelector";
import {getTime, resetGame} from "../../store/reducers/data";
import {AppRoute} from "../../navigations/AppNavigator";
import {GameRoutes} from "../../navigations/GameNavigator";
import {useAppDispatch} from "../../store/configureStore";
import Arrow from "../../assets/SVGs/ArrowLeft";
import {useTranslation} from "../../hooks/translation";
import {setAlert} from "../../store/reducers/alert";
import Picker from "../../components/Picker";

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<GameRoutes, "AssignRole">,
    StackNavigationProp<AppRoute>
>;

export type TimerProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const {width, height} = Dimensions.get("window");
const VISIBLE_TIPS = 3;
const TIP_HEIGHT = (height * 10) / 100;
const EXPANDED_TIPS_CONTAINER_HEIGHT = VISIBLE_TIPS * TIP_HEIGHT;

const styles = StyleSheet.create({
    container: {},
});

const helper = [
    {title: "title111", id: "1"},
    {title: "asddf", id: "2"},
    {title: "sdfasdf", id: "3"},
    {title: "ertydfgh", id: "4"},
    {title: "dfghrte", id: "5"},
    {title: "sdfgertw", id: "6"},
    {title: "dfhjrdt", id: "7"},
];

const Timer: React.FC<TimerProps> = ({navigation}) => {
    const translation = useTranslation();
    const setupTime = useSelector(getTime);
    const [time, setTime] = useState(setupTime * 1000);
    const [tipsShown, setTipsShown] = useState(false);
    const tipsContainerHeight = useDerivedValue(() => {
        if (tipsShown) return withTiming(EXPANDED_TIPS_CONTAINER_HEIGHT);
        return withTiming(0);
    });
    const dispatch = useAppDispatch();
    const [isPlaying, setIsPlaying] = useState(false);
    const minutes = useMemo(() => {
        const res = Math.floor(time / 60000);
        if (res < 10) return `0${res}`;
        return `${res}`;
    }, [time]);
    const seconds = useMemo(() => {
        const res = Math.floor(time / 1000) % 60;
        if (res < 10) return `0${res}`;
        return `${res}`;
    }, [time]);

    useEffect(() => {
        if (!isPlaying) return;
        let remainingTime = time;
        const startTime = Date.now() + time + 1000;
        const countdown = setInterval(() => {
            remainingTime = startTime - Date.now();
            if (Math.floor(remainingTime) >= 0) {
                setTime(remainingTime);
                return;
            }
            clearInterval(countdown);
            handleButtonPress();
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);

    const handleButtonPress = useCallback(() => {
        if (!isPlaying)
            return Math.floor(time / 1000) > 0 && setIsPlaying(true);
        setIsPlaying(false);
        navigation.navigate("Vote");
    }, [isPlaying, navigation, time]);

    const handleBackButtonPress = useCallback(() => {
        dispatch(
            setAlert({
                id: Date.now.toString(),
                text: translation.Timer.backAlert,
                variant: "ask",
                onAccept: () => {
                    dispatch(resetGame());
                    navigation.navigate("Main");
                },
            }),
        );
        return true;
    }, [dispatch, navigation, translation.Timer.backAlert]);

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener(
                "hardwareBackPress",
                handleBackButtonPress,
            );
            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    handleBackButtonPress,
                );
        }, [handleBackButtonPress]),
    );

    const tipsContainerStyles = useAnimatedStyle(() => {
        const opacity = interpolate(
            tipsContainerHeight.value,
            [0, EXPANDED_TIPS_CONTAINER_HEIGHT],
            [0, 1],
            Extrapolate.CLAMP,
        );
        return {
            height: tipsContainerHeight.value,
            opacity,
            width: "100%",
        };
    }, [tipsContainerHeight.value]);

    const arrowStyles = useAnimatedStyle(() => {
        const rotation = interpolate(
            tipsContainerHeight.value,
            [0, EXPANDED_TIPS_CONTAINER_HEIGHT],
            [0, 90],
            Extrapolate.CLAMP,
        );
        return {
            transform: [{rotate: "180deg"}, {rotate: `${rotation}deg`}],
        };
    });

    const handleTipsShown = useCallback(() => {
        setTipsShown((shown) => !shown);
    }, []);

    return (
        <Container style={styles.container}>
            <Header
                screenName={translation.Timer.header}
                onBackPress={handleBackButtonPress}
                icon={<BackCross />}
            />
            <Box
                paddingHorizontal="m"
                alignItems="center"
                flex={1}
                justifyContent="center">
                <Box marginVertical="m">
                    <AppText
                        color={
                            +minutes > 1 || !isPlaying
                                ? "mainTextColor"
                                : "secondBackground"
                        }
                        fontSize={normalize(
                            80,
                        )}>{`${minutes} : ${seconds}`}</AppText>
                </Box>
                {/* <TouchableOpacity onPress={handleTipsShown}>
                    <Box
                        width="100%"
                        alignItems="center"
                        paddingHorizontal="m"
                        flexDirection="row">
                        <Box flex={1}>
                            <AppText fontSize={normalize(30)}>
                                Suggested Questions
                            </AppText>
                        </Box>
                        <Animated.View style={arrowStyles}>
                            <Arrow />
                        </Animated.View>
                    </Box>
                </TouchableOpacity>
                <Animated.View style={tipsContainerStyles}>
                    <Picker
                        items={helper}
                        numberOfVisibleItems={VISIBLE_TIPS}
                        itemHeight={TIP_HEIGHT}
                    />
                </Animated.View> */}
                <Button
                    marginVertical="m"
                    variant="icon"
                    icon={isPlaying ? <Stop /> : <Play />}
                    title=""
                    height={(height * 15) / 100}
                    width={(height * 15) / 100}
                    onPress={handleButtonPress}
                    backgroundColor="buttonTertiary"
                />
            </Box>
        </Container>
    );
};

export default Timer;
