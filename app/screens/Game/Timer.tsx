import React, {useCallback, useMemo, useState} from "react";
import {StyleSheet, Dimensions, BackHandler, Vibration} from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
} from "@react-navigation/core";
import {useDerivedValue, withTiming} from "react-native-reanimated";
import {StackNavigationProp} from "@react-navigation/stack";

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
import {useTranslation} from "../../hooks/translation";
import {setAlert} from "../../store/reducers/alert";
import {useInterval} from "../../hooks/interval";
import CircularProgressbar from "../../components/CircularProgressbar";

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<GameRoutes, "AssignRole">,
    StackNavigationProp<AppRoute>
>;

export type TimerProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const {height, width} = Dimensions.get("window");
const VISIBLE_TIPS = 3;
const TIP_HEIGHT = (height * 10) / 100;
const EXPANDED_TIPS_CONTAINER_HEIGHT = VISIBLE_TIPS * TIP_HEIGHT;

const styles = StyleSheet.create({
    container: {},
});

// const helper = [
//     {title: "title111", id: "1"},
//     {title: "asddf", id: "2"},
//     {title: "sdfasdf", id: "3"},
//     {title: "ertydfgh", id: "4"},
//     {title: "dfghrte", id: "5"},
//     {title: "sdfgertw", id: "6"},
//     {title: "dfhjrdt", id: "7"},
// ];

const Timer: React.FC<TimerProps> = ({navigation}) => {
    const translation = useTranslation();
    const setupTime = useSelector(getTime);
    const [time, setTime] = useState(setupTime * 1000);
    const timeAnimated = useDerivedValue(() => {
        return withTiming(time / (setupTime * 1000), {duration: 1000});
    }, [time, setupTime]);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [tipsShown, setTipsShown] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const handleUpdate = useCallback(() => {
        const newTime = time - 1000;
        setTime(newTime);
        if (Math.floor(newTime / 1000) === 0) {
            setIsPlaying(false);
            Vibration.vibrate(1000);
        }
    }, [time]);

    useInterval(handleUpdate, isPlaying ? 1000 : null);

    const handleNext = useCallback(() => {
        navigation.navigate("Vote");
    }, [navigation]);

    const handleButtonPress = useCallback(() => {
        if (!isPlaying)
            return Math.floor(time / 1000) > 0 && setIsPlaying(true);
        setIsPlaying(false);
        handleNext();
    }, [handleNext, isPlaying, time]);

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

    // const tipsContainerStyles = useAnimatedStyle(() => {
    //     const opacity = interpolate(
    //         tipsContainerHeight.value,
    //         [0, EXPANDED_TIPS_CONTAINER_HEIGHT],
    //         [0, 1],
    //         Extrapolate.CLAMP,
    //     );
    //     return {
    //         height: tipsContainerHeight.value,
    //         opacity,
    //         width: "100%",
    //     };
    // }, [tipsContainerHeight.value]);

    // const arrowStyles = useAnimatedStyle(() => {
    //     const rotation = interpolate(
    //         tipsContainerHeight.value,
    //         [0, EXPANDED_TIPS_CONTAINER_HEIGHT],
    //         [0, 90],
    //         Extrapolate.CLAMP,
    //     );
    //     return {
    //         transform: [{rotate: "180deg"}, {rotate: `${rotation}deg`}],
    //     };
    // });

    // const handleTipsShown = useCallback(() => {
    //     setTipsShown(shown => !shown);
    // }, []);

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
                <CircularProgressbar progress={timeAnimated}>
                    <AppText
                        color={
                            +minutes > 1 || !isPlaying
                                ? "mainTextColor"
                                : "secondBackground"
                        }
                        fontSize={normalize(
                            70,
                        )}>{`${minutes} : ${seconds}`}</AppText>
                </CircularProgressbar>
                {time > 0 ? (
                    <Button
                        marginTop="xl"
                        variant="icon"
                        icon={isPlaying ? <Stop /> : <Play />}
                        title=""
                        height={(height * 15) / 100}
                        width={(height * 15) / 100}
                        onPress={handleButtonPress}
                        backgroundColor="buttonTertiary"
                    />
                ) : (
                    <Box alignItems="center" marginTop="l">
                        <AppText fontSize={normalize(40)}>
                            {translation.Timer.timesUp}
                        </AppText>
                        <Button
                            marginTop="m"
                            fontSize={normalize(26)}
                            variant="simple"
                            title={translation.Timer.next}
                            onPress={handleNext}
                            backgroundColor="secondBackground"
                            height={(width * 20) / 100}
                            width={(width * 40) / 100}>
                            <Play scale={0.4} />
                        </Button>
                    </Box>
                )}
            </Box>
        </Container>
    );
};

/* <TouchableOpacity onPress={handleTipsShown}>
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
                </Animated.View> 
                */

export default Timer;
