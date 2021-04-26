import React, {useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, Dimensions, BackHandler} from "react-native";
import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
    // eslint-disable-next-line import/no-extraneous-dependencies
} from "@react-navigation/core";
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

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<GameRoutes, "AssignRole">,
    StackNavigationProp<AppRoute>
>;

export type TimerProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

const Timer: React.FC<TimerProps> = ({navigation}) => {
    const translation = useTranslation();
    const setupTime = useSelector(getTime);
    const [time, setTime] = useState(setupTime * 1000);
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

    return (
        <Container style={styles.container}>
            <Header
                screenName={translation.Timer.header}
                onBackPress={handleBackButtonPress}
                icon={<BackCross />}
            />
            <Box paddingHorizontal="m" alignItems="center" flex={1} top="15%">
                <Box marginBottom="xl">
                    <AppText
                        color={
                            +minutes > 1 || !isPlaying
                                ? "mainTextColor"
                                : "danger"
                        }
                        fontSize={normalize(
                            80,
                        )}>{`${minutes} : ${seconds}`}</AppText>
                </Box>
                <Button
                    variant="icon"
                    icon={isPlaying ? <Stop /> : <Play />}
                    title=""
                    height={(width * 31) / 100}
                    width={(width * 31) / 100}
                    onPress={handleButtonPress}
                    backgroundColor="buttonTertiary"
                />
            </Box>
        </Container>
    );
};

export default Timer;
