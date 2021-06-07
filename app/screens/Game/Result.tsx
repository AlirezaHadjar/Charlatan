import React, {useCallback, useMemo} from "react";
import {BackHandler, Dimensions, StyleSheet} from "react-native";
import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
    // eslint-disable-next-line import/no-extraneous-dependencies
} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Citizen from "../../assets/SVGs/Citizen";
import Spy from "../../assets/SVGs/Spy";
import Refresh from "../../assets/SVGs/Refresh";
import BackCross from "../../assets/SVGs/BackCross";
import Box from "../../theme/Box";
import {useSelector} from "../../store/useSelector";
import {getActiveGameId, getGame} from "../../store/reducers/data";
import {Winners} from "../../types";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {useTranslation} from "../../hooks/translation";
import {GameRoutes} from "../../navigations/GameNavigator";
import {AppRoute} from "../../navigations/AppNavigator";
import Button from "../../components/Button";

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<GameRoutes, "AssignRole">,
    StackNavigationProp<AppRoute>
>;

export type ResultProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

const Result: React.FC<ResultProps> = ({navigation}) => {
    const translation = useTranslation();
    const activeGameId = useSelector(getActiveGameId);
    const selectedGame = useSelector(getGame(activeGameId));
    const selectedRound = useMemo(
        () => selectedGame.rounds[selectedGame.currentRoundIndex - 1],
        [selectedGame.currentRoundIndex, selectedGame.rounds],
    );
    const renderWinnerText = () => {
        const text =
            selectedRound.winner === Winners.Spies
                ? translation.Result.spies
                : translation.Result.citizens;
        return (
            <Box>
                <AppText textAlign="center" fontSize={normalize(60)}>
                    {text}
                </AppText>
                <Box marginTop="s">
                    <AppText textAlign="center" fontSize={normalize(25)}>
                        {translation.Result.winningText}
                    </AppText>
                </Box>
            </Box>
        );
    };
    const handleBackButtonPress = useCallback(() => {
        navigation.navigate("Main");
        return true;
    }, [navigation]);

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
    const handlePlayAgain = useCallback(() => {
        navigation.navigate("StartGame");
    }, [navigation]);
    return (
        <Container style={styles.container}>
            <Header
                screenName={translation.Result.header}
                onBackPress={handleBackButtonPress}
                icon={<BackCross />}
            />
            {selectedRound && (
                <Box alignItems="center" flex={1} paddingTop="lxl">
                    {renderWinnerText()}
                    {selectedGame.currentRoundIndex <
                        selectedGame.rounds.length - 1 && (
                        <Button
                            fontSize={normalize(19)}
                            variant="simple"
                            title={translation.Result.playAgain}
                            onPress={handlePlayAgain}
                            backgroundColor="secondBackground"
                            marginVertical="m"
                            height={(height * 8) / 100}
                            width={(width * 53) / 100}>
                            <Box flex={0.3}>
                                <Refresh scale={1} />
                            </Box>
                        </Button>
                    )}
                    <Box bottom={0} position="absolute">
                        {selectedRound.winner === Winners.Citizens ? (
                            <Citizen />
                        ) : (
                            <Spy />
                        )}
                    </Box>
                </Box>
            )}
        </Container>
    );
};

export default Result;
