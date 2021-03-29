import React, {useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, Dimensions} from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import {CompositeNavigationProp, RouteProp} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";

import Header from "../../components/Header";
import Container from "../../components/Container";
import Button from "../../components/Button";
import Box from "../../theme/Box";
import Stop from "../../assets/SVGs/Stop";
import Play from "../../assets/SVGs/Play";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {useSelector} from "../../store/useSelector";
import {getTime} from "../../store/reducers/data";
import {AppRoute} from "../../navigations/AppNavigator";
import {GameRoutes} from "../../navigations/GameNavigator";

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
    const setupTime = useSelector(getTime);
    const [time, setTime] = useState(setupTime * 1000);
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
            setIsPlaying(false);
        }, 1000);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isPlaying]);
    const handleButtonPress = useCallback(() => {
        if (!isPlaying)
            return Math.floor(time / 1000) > 0 && setIsPlaying(true);
        setIsPlaying(false);
        navigation.navigate("Vote");
    }, [isPlaying, navigation, time]);

    return (
        <Container style={styles.container}>
            <Header screenName="Timer" />
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
