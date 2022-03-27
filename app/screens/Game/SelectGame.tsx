// eslint-disable-next-line import/no-extraneous-dependencies
import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useCallback, useMemo, useState} from "react";
import {
    BackHandler,
    Dimensions,
    TextInput,
    TouchableOpacity,
} from "react-native";
import {useTheme} from "@shopify/restyle";

import {useGames} from "../../hooks/games";
import Container from "../../components/Container";
import Header from "../../components/Header";
import GameList from "../../components/list/game/List";
import UserList from "../../components/list/player/List";
import AppText from "../../components/Text";
import {AppRoute} from "../../navigations/AppNavigator";
import {GameRoutes} from "../../navigations/GameNavigator";
import {
    getPlayers,
    getGames,
    editGame,
    getGame,
    getActiveGameId,
    setActiveGameId,
    editRound,
    editSpiesLength,
    startGame,
    addNewGame,
    startOverAGame,
    deleteGame,
    resetScores,
} from "../../store/reducers/data";
import {useSelector} from "../../store/useSelector";
import Box from "../../theme/Box";
import {useAppDispatch} from "../../store/configureStore";
import Button from "../../components/Button";
import {useTranslation} from "../../hooks/translation";
import normalize from "../../utils/normalizer";
import Trash from "../../assets/SVGs/Trash";
import Play from "../../assets/SVGs/Play";
import Refresh from "../../assets/SVGs/Refresh";
import Plus from "../../assets/SVGs/Plus";
import {setAlert} from "../../store/reducers/alert";
import {Stage} from "../../types";
import ItemCheck from "../../components/ItemCheck";
import {ThemeType} from "../../theme/Theme";
import DigitControl from "../../components/DigitControl";

const {width, height} = Dimensions.get("window");

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<AppRoute, "SelectGame">,
    StackNavigationProp<GameRoutes>
>;

export type SelectGameProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const SelectGame: React.FC<SelectGameProps> = ({navigation}) => {
    const theme = useTheme<ThemeType>();
    const dispatch = useAppDispatch();
    const games = useSelector(getGames);
    const translation = useTranslation();
    const activeGameId = useSelector(getActiveGameId);
    const selectedGame = useSelector(getGame(activeGameId));
    const players = useSelector(getPlayers);

    useGames(games);

    const [stage, setStage] = useState<Stage>("Config");

    const headerTitle = useMemo(
        () =>
            translation.SelectGame[!activeGameId ? "selectGame" : "startGame"],
        [activeGameId, translation.SelectGame],
    );

    const handleGameSelect = useCallback(
        (id: string) => {
            dispatch(setActiveGameId(id));
        },
        [dispatch],
    );
    const handleNewGame = useCallback(() => {
        const id = Date.now().toString();
        dispatch(addNewGame({id}));
        dispatch(setActiveGameId(id));
    }, [dispatch]);

    const handBackPress = useCallback(() => {
        if (stage === "Finalize") {
            setStage("Config");
            return true;
        }
        if (activeGameId) {
            dispatch(setActiveGameId(""));
            return true;
        }
        navigation.goBack();
        return true;
    }, [stage, activeGameId, navigation, dispatch]);

    useFocusEffect(
        useCallback(() => {
            BackHandler.addEventListener("hardwareBackPress", handBackPress);
            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    handBackPress,
                );
        }, [handBackPress]),
    );

    const handleSelectPlayer = useCallback(
        (id: string) => {
            if (!selectedGame) return;
            const players = [...selectedGame.players];
            const playerIndex = players.findIndex(player => player.id === id);
            if (playerIndex === -1)
                players.push({id, score: 0, previousScore: 0});
            else players.splice(playerIndex, 1);
            dispatch(
                editGame({
                    id: selectedGame.id,
                    players,
                }),
            );
        },
        [dispatch, selectedGame],
    );

    const SelectContent = useMemo(() => {
        return (
            <Box flex={1}>
                {games.length > 0 ? (
                    <>
                        <AppText textAlign="center" fontSize={normalize(25)}>
                            {translation.SelectGame.ChooseTheGame}
                        </AppText>
                        <Box flex={1} justifyContent="center">
                            <GameList
                                items={games}
                                onPress={handleGameSelect}
                            />
                        </Box>
                    </>
                ) : (
                    <Box justifyContent="center" flex={1}>
                        <AppText textAlign="center" fontSize={normalize(30)}>
                            {translation.SelectGame.ThereIsNoGame}
                        </AppText>
                    </Box>
                )}
                <Button
                    alignSelf="flex-end"
                    marginEnd="m"
                    fontSize={normalize(18)}
                    reverse
                    variant="simple"
                    title={translation.SelectGame.NewGame}
                    onPress={handleNewGame}
                    backgroundColor="secondBackground"
                    height={(width * 15) / 100}
                    width={(width * 40) / 100}>
                    <Plus scale={0.6} />
                </Button>
            </Box>
        );
    }, [games, handleGameSelect, handleNewGame, translation.SelectGame]);

    const EditContent = useMemo(() => {
        if (!selectedGame) return;
        const selectedIds = selectedGame
            ? selectedGame.players.map(player => player.id)
            : [];
        return (
            <Box flex={1} paddingHorizontal="m">
                <Box flex={3}>
                    <Box
                        width="100%"
                        borderRadius="hero2"
                        borderWidth={3}
                        borderColor="cardIndicator"
                        marginVertical="s"
                        paddingHorizontal="m"
                        backgroundColor="contrast">
                        <TextInput
                            value={selectedGame.name}
                            autoCapitalize="words"
                            onChangeText={text =>
                                dispatch(
                                    editGame({id: selectedGame.id, name: text}),
                                )
                            }
                            style={{
                                width: "100%",
                                color: theme.colors.fourthText,
                                fontSize: normalize(21),
                                fontFamily: "Kalameh Bold",
                                fontWeight: "normal",
                                textAlign: "center",
                            }}
                        />
                    </Box>
                    <Box paddingVertical="m">
                        <UserList
                            items={players}
                            selectedIds={selectedIds}
                            end={<ItemCheck />}
                            onEndPress={handleSelectPlayer}
                        />
                    </Box>
                </Box>
                <Box flex={1} />
                <Button
                    alignSelf="flex-end"
                    fontSize={normalize(18)}
                    variant="simple"
                    title={translation.SelectGame.nextButtonTitle}
                    onPress={() => setStage("Finalize")}
                    disableText={translation.SelectGame.playersLowerBound}
                    disabled={selectedGame.players.length < 3}
                    backgroundColor="secondBackground"
                    height={(width * 15) / 100}
                    width={(width * 31) / 100}>
                    <Play scale={0.4} />
                </Button>
            </Box>
        );
    }, [
        dispatch,
        handleSelectPlayer,
        players,
        selectedGame,
        theme.colors.fourthText,
        translation.SelectGame.nextButtonTitle,
        translation.SelectGame.playersLowerBound,
    ]);

    const handleConfigChange = (type: "round" | "spy", mode: "add" | "sub") => {
        if (!selectedGame) return;

        if (type === "round") {
            dispatch(editRound({gameId: selectedGame.id, mode}));
            return;
        }
        if (type === "spy") {
            dispatch(editSpiesLength({gameId: selectedGame.id, mode}));
            return;
        }
    };

    const FinalizeContent = useMemo(() => {
        if (!selectedGame) return;
        return (
            <Box flex={1} paddingHorizontal="m">
                <Box flex={1}>
                    <Box
                        paddingVertical="m"
                        flexDirection="row"
                        alignItems="center">
                        <AppText fontSize={normalize(23)} variant="bold">
                            {translation.SelectGame.RoundsLength}
                        </AppText>
                        <Box flex={1} />
                        <DigitControl
                            value={selectedGame.rounds.length}
                            decrementDisableText={
                                translation.SelectGame.roundsNotEnough
                            }
                            incrementDisableText={
                                translation.SelectGame.roundsUpperBound
                            }
                            decrementDisabled={selectedGame.rounds.length <= 1}
                            incrementDisabled={selectedGame.rounds.length >= 10}
                            onDecrementPress={() =>
                                handleConfigChange("round", "sub")
                            }
                            onIncrementPress={() =>
                                handleConfigChange("round", "add")
                            }
                        />
                    </Box>
                    <Box
                        paddingVertical="m"
                        flexDirection="row"
                        alignItems="center">
                        <AppText fontSize={normalize(23)} variant="bold">
                            {translation.SelectGame.SpiesLength}
                        </AppText>
                        <Box flex={1} />
                        <DigitControl
                            backgroundColor="fourthText"
                            value={selectedGame.spiesLength}
                            decrementDisableText={
                                translation.SelectGame.spiesLowerBound
                            }
                            incrementDisableText={
                                translation.SelectGame.spiesUpperBound
                            }
                            decrementDisabled={selectedGame.spiesLength <= 1}
                            incrementDisabled={
                                selectedGame.spiesLength >=
                                Math.floor(selectedGame.players.length / 3)
                            }
                            onDecrementPress={() =>
                                handleConfigChange("spy", "sub")
                            }
                            onIncrementPress={() =>
                                handleConfigChange("spy", "add")
                            }
                        />
                    </Box>
                </Box>
                <Box
                    flexDirection={selectedGame.isNew ? "row-reverse" : "row"}
                    justifyContent="space-between">
                    <Button
                        title={
                            translation.SelectGame[
                                selectedGame.isNew ? "start" : "startOver"
                            ]
                        }
                        backgroundColor="transparent"
                        fontSize={normalize(18)}
                        disabled={selectedGame.rounds.length < 1}
                        disableText={translation.SelectGame.roundsNotEnough}
                        onPress={() => {
                            dispatch(startOverAGame());
                            dispatch(resetScores());
                            dispatch(startGame());
                            // dispatch(setActiveGameId(""));
                            navigation.navigate("StartGame");
                        }}
                        width={(width * 40) / 100}
                        height={(height * 8) / 100}>
                        {!selectedGame.isNew ? (
                            <Refresh scale={1} />
                        ) : (
                            <Play scale={0.4} />
                        )}
                    </Button>
                    {selectedGame.currentRoundIndex <
                        selectedGame.rounds.length &&
                        selectedGame.currentRoundIndex > 0 && (
                            <Button
                                title={translation.SelectGame.continue}
                                onPress={() => {
                                    dispatch(startGame());
                                    // dispatch(setActiveGameId(""));
                                    navigation.navigate("StartGame");
                                }}
                                fontSize={normalize(18)}
                                width={(width * 40) / 100}
                                height={(height * 8) / 100}>
                                <Play scale={0.4} />
                            </Button>
                        )}
                </Box>
            </Box>
        );
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selectedGame]);

    const GameContent = useMemo(() => {
        if (stage === "Config") return EditContent;
        return FinalizeContent;
    }, [EditContent, FinalizeContent, stage]);

    const Content = useMemo(() => {
        if (activeGameId) return GameContent;
        return SelectContent;
    }, [GameContent, SelectContent, activeGameId]);

    const handleDelete = () => {
        if (!selectedGame) return;

        dispatch(setActiveGameId(""));
        dispatch(deleteGame(selectedGame.id));
    };

    const handleDeletePress = () => {
        dispatch(
            setAlert({
                text: translation.SelectGame.deleteGameAssurement,
                acceptButtonText: translation.SelectGame.yes,
                cancelButtonText: translation.SelectGame.no,
                id: Date.now.toString(),
                onAccept: handleDelete,
                variant: "ask",
            }),
        );
    };

    return (
        <Container>
            <Header
                screenName={headerTitle}
                onBackPress={handBackPress}
                end={
                    selectedGame && (
                        <TouchableOpacity onPress={handleDeletePress}>
                            <Trash />
                        </TouchableOpacity>
                    )
                }
            />
            <Box flex={1} paddingBottom="m">
                <Box width="100%" flex={1}>
                    {Content}
                </Box>
            </Box>
        </Container>
    );
};

export default SelectGame;
