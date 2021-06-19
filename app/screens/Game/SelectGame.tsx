import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
    // eslint-disable-next-line import/no-extraneous-dependencies
} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useCallback, useMemo} from "react";
import {
    BackHandler,
    Dimensions,
    TextInput,
    TouchableOpacity,
} from "react-native";

import Container from "../../components/Container";
import Header from "../../components/Header";
import GameList from "../../components/list/game/List";
import UserList from "../../components/list/player/List";
import AppText from "../../components/Text";
import {AppRoute} from "../../navigations/AppNavigator";
import Check from "../../assets/SVGs/Check";
import {GameRoutes} from "../../navigations/GameNavigator";
import {
    getPlayers,
    getGames,
    editGame,
    getGame,
    getActiveGameId,
    setActiveGameId,
} from "../../store/reducers/data";
import {useSelector} from "../../store/useSelector";
import Box from "../../theme/Box";
import {useAppDispatch} from "../../store/configureStore";
import Button from "../../components/Button";
import {useTranslation} from "../../hooks/translation";
import normalize from "../../utils/normalizer";
import Trash from "../../assets/SVGs/Trash";
import Play from "../../assets/SVGs/Play";
import Plus from "../../assets/SVGs/Plus";

const {width, height} = Dimensions.get("window");

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<AppRoute, "SelectGame">,
    StackNavigationProp<GameRoutes>
>;

export type SelectGameProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

type Stage = "Select" | "Finilize";

const SelectGame: React.FC<SelectGameProps> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const games = useSelector(getGames);
    const translation = useTranslation();
    // const theme = useTheme<ThemeType>();
    const activeGameId = useSelector(getActiveGameId);
    const selectedGame = useSelector(getGame(activeGameId));
    const players = useSelector(getPlayers);

    // const styles = StyleSheet.create({
    // boxContainer: {
    //     width: (width * 10) / 100,
    //     height: (width * 10) / 100,
    //     backgroundColor: theme.colors.buttonPrimary,
    //     borderRadius: theme.borderRadii.m,
    //     marginHorizontal: theme.spacing.m,
    //     alignItems: "center",
    //     justifyContent: "center",
    // },
    // disabled: {
    //     backgroundColor: theme.colors.buttonDisabled,
    // },
    // });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const stage: Stage = useMemo(
        () => (!activeGameId ? "Select" : "Finilize"),
        [activeGameId],
    );

    const headerTitle = useMemo(
        () => (!activeGameId ? "Select Game" : "Start Game"),
        [activeGameId],
    );

    const handleGameSelect = useCallback(
        (id: string) => {
            dispatch(setActiveGameId(id));
        },
        [dispatch],
    );

    const handBackPress = useCallback(() => {
        if (activeGameId) {
            dispatch(setActiveGameId(""));
            return true;
        }
        navigation.goBack();
        return true;
    }, [activeGameId, navigation, dispatch]);

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
            if (playerIndex === -1) players.push({id, score: 0});
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

    const itemCheck = useMemo(
        () => (
            <Box
                width={30}
                height={30}
                backgroundColor="mainTextColor"
                alignItems="center"
                justifyContent="center"
                borderRadius="m">
                <Check />
            </Box>
        ),
        [],
    );

    const SelectContent = useMemo(
        () => (
            <Box flex={1}>
                <AppText textAlign="center" fontSize={normalize(25)}>
                    Choose The Game
                </AppText>
                <Box flex={1} justifyContent="center">
                    <GameList items={games} onPress={handleGameSelect} />
                </Box>
                <Button
                    alignSelf="flex-end"
                    marginEnd="m"
                    fontSize={normalize(18)}
                    reverse
                    variant="simple"
                    title="New Game"
                    // onPress={handleNext}
                    backgroundColor="secondBackground"
                    height={(width * 15) / 100}
                    width={(width * 40) / 100}>
                    <Plus scale={0.6} />
                </Button>
            </Box>
        ),
        [games, handleGameSelect],
    );
    const EditContent = useMemo(() => {
        if (!selectedGame) return;
        console.log("Change");
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
                        height={(height * 8) / 100}
                        backgroundColor="contrast">
                        <TextInput
                            value={selectedGame.name}
                            onChangeText={text =>
                                dispatch(
                                    editGame({id: selectedGame.id, name: text}),
                                )
                            }
                            style={{
                                width: "100%",
                                fontSize: normalize(25),
                                fontFamily: "Kalameh Bold",
                                fontWeight: "normal",
                                height: "100%",
                                textAlign: "center",
                            }}
                        />
                    </Box>
                    {/* <AppText>Players:</AppText> */}
                    <Box paddingVertical="m">
                        <UserList
                            items={players}
                            selectedIds={selectedIds}
                            end={itemCheck}
                            onEndPress={handleSelectPlayer}
                        />
                    </Box>
                    {/* <Box
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="center">
                        <AppTouchable
                            disableText={translation.Players.removeSpyAlert}
                            disabled={selectedGame.rounds.length < 2}
                            onPress={() => {
                                dispatch(
                                    editRound({
                                        gameId: selectedGame.id,
                                        mode: "sub",
                                    }),
                                );
                            }}
                            style={[
                                styles.boxContainer,
                                selectedGame.rounds.length < 2
                                    ? styles.disabled
                                    : {},
                            ]}>
                            <Minus color="secondBackground" scale={0.9} />
                        </AppTouchable>
                        <AppText color="thirdText" fontSize={normalize(70)}>
                            {selectedGame.rounds.length}
                        </AppText>
                        <AppTouchable
                            disableText={translation.Players.addSpyAlert}
                            disabled={selectedGame.rounds.length >= 15}
                            onPress={() => {
                                dispatch(
                                    editRound({
                                        gameId: selectedGame.id,
                                        mode: "add",
                                    }),
                                );
                            }}
                            style={[
                                styles.boxContainer,
                                selectedGame.rounds.length >= 15
                                    ? styles.disabled
                                    : {},
                            ]}>
                            <Plus color="secondBackground" scale={0.9} />
                        </AppTouchable>
                    </Box> */}
                    {/* <Box flexDirection="row">
                        <Button
                            title="Delete"
                            height={70}
                            width={125}
                            backgroundColor="danger"
                        />
                        {selectedGame.currentRoundIndex <
                            selectedGame.rounds.length && (
                            <Button
                                title="Continue"
                                height={70}
                                width={125}
                                backgroundColor="buttonPrimary"
                                onPress={() => {
                                    dispatch(startGame());
                                    navigation.navigate("StartGame");
                                }}
                            />
                        )}
                        <Button
                            backgroundColor="buttonTertiary"
                            title="Start From First"
                            height={70}
                            width={125}
                        />
                    </Box> */}
                </Box>
                <Box flex={1} />
                <Button
                    alignSelf="flex-end"
                    fontSize={normalize(18)}
                    variant="simple"
                    title={translation.AssignRole.nextButtonTitle}
                    // onPress={handleNext}
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
        itemCheck,
        players,
        selectedGame,
        translation.AssignRole.nextButtonTitle,
    ]);

    const Content = useMemo(() => {
        if (activeGameId) return EditContent;
        return SelectContent;
    }, [EditContent, SelectContent, activeGameId]);

    return (
        <Container>
            <Header
                screenName={headerTitle}
                onBackPress={handBackPress}
                end={
                    <TouchableOpacity>
                        <Trash />
                    </TouchableOpacity>
                }
            />
            <Box flex={1}>
                <Box width="100%" flex={1}>
                    {Content}
                </Box>
            </Box>
        </Container>
    );
};

export default SelectGame;
