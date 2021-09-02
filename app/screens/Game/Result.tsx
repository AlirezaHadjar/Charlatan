import React, {useCallback, useMemo} from "react";
import {BackHandler, Dimensions, StyleSheet} from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import {useSharedValue} from "react-native-reanimated";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Citizen from "../../assets/SVGs/Citizen";
import Spy from "../../assets/SVGs/Spy";
import Play from "../../assets/SVGs/Play";
import BackCross from "../../assets/SVGs/BackCross";
import Box from "../../theme/Box";
import {useSelector} from "../../store/useSelector";
import {getActiveGameId, getGame, getPlayers} from "../../store/reducers/data";
import {Round, Winners} from "../../types";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {useTranslation} from "../../hooks/translation";
import {GameRoutes} from "../../navigations/GameNavigator";
import GameBoard from "../../components/list/game/ListItem";
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

const BOX_HEIGHT = (height * 30) / 100;
const BOX_WIDTH = (width * 73) / 100;
const MARGIN = (width * 3) / 100;

const Result: React.FC<ResultProps> = ({navigation}) => {
    const translation = useTranslation();
    const activeGameId = useSelector(getActiveGameId);
    const users = useSelector(getPlayers);
    const offsetX = useSharedValue(0);
    const selectedGame = useSelector(getGame(activeGameId));
    const isNotLastRound = useMemo(
        () =>
            selectedGame &&
            selectedGame.currentRoundIndex < selectedGame.rounds.length,
        [selectedGame],
    );
    const selectedRound = useMemo(
        () =>
            selectedGame &&
            selectedGame.rounds[selectedGame.currentRoundIndex - 1],
        [selectedGame],
    );
    const renderWinnerText = () => {
        const text =
            selectedRound.winner === Winners.Spies
                ? translation.Result.spies
                : translation.Result.citizens;
        return (
            <Box>
                <AppText
                    textAlign="center"
                    fontSize={normalize(60)}
                    variant="bold">
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

    const renderCharacter = useCallback((selectedRound: Round) => {
        if (!selectedRound) return;
        const {winner} = selectedRound;
        if (winner === Winners.Spies) return <Spy />;
        return <Citizen />;
    }, []);

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
                screenName={""}
                onBackPress={handleBackButtonPress}
                icon={<BackCross />}
            />
            {selectedRound && (
                <Box alignItems="center" flex={1} top={(-height * 8) / 100}>
                    {renderWinnerText()}
                    <Box zIndex={1} marginTop="m">
                        <GameBoard
                            onlyResult
                            item={selectedGame}
                            margin={MARGIN}
                            height={BOX_HEIGHT}
                            users={users}
                            width={BOX_WIDTH}
                            index={0}
                            offsetX={offsetX}
                        />
                    </Box>

                    {isNotLastRound && (
                        <Button
                            fontSize={normalize(18)}
                            variant="simple"
                            title={translation.Result.PlayNextRound}
                            onPress={handlePlayAgain}
                            backgroundColor="secondBackground"
                            marginVertical="m"
                            height={(height * 8) / 100}
                            width={(width * 60) / 100}>
                            <Play scale={0.5} />
                        </Button>
                    )}
                </Box>
            )}
            <Box bottom={0} position="absolute" alignSelf="center" zIndex={-1}>
                {renderCharacter(selectedRound)}
            </Box>
        </Container>
    );
};

export default Result;
