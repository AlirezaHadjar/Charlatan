import React, {useCallback, useMemo, useState} from "react";
import {StyleSheet, Dimensions, BackHandler} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
    // eslint-disable-next-line import/no-extraneous-dependencies
} from "@react-navigation/core";

import Container from "../../components/Container";
import Header from "../../components/Header";
import List from "../../components/list/location/List";
import AppText from "../../components/Text";
import {
    getGameResult,
    getLocations,
    getPlayers,
    getSelectedLocation,
    getSpiesIds,
    resetGame,
    setGameResult,
} from "../../store/reducers/data";
import {useSelector} from "../../store/useSelector";
import Box from "../../theme/Box";
import normalize from "../../utils/normalizer";
import Check from "../../assets/SVGs/Check";
import BackCross from "../../assets/SVGs/BackCross";
import Play from "../../assets/SVGs/Play";
import {Guess as GuessType, Winners} from "../../types";
import {GameRoutes} from "../../navigations/GameNavigator";
import {AppRoute} from "../../navigations/AppNavigator";
import Button from "../../components/Button";
import {useAppDispatch} from "../../store/configureStore";
import {useTranslation} from "../../hooks/translation";
import {getLanguageName} from "../../store/reducers/language";
import {setAlert} from "../../store/reducers/alert";

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<GameRoutes, "AssignRole">,
    StackNavigationProp<AppRoute>
>;

export type SpiesGuessProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

const SpiesGuess: React.FC<SpiesGuessProps> = ({navigation}) => {
    const translation = useTranslation();
    const language = useSelector(getLanguageName);
    const players = useSelector(getPlayers);
    const spiesIds = useSelector(getSpiesIds);
    const locations = useSelector(getLocations);
    const location = useSelector(getSelectedLocation);
    const gameResult = useSelector(getGameResult);
    const dispatch = useAppDispatch();
    const [guesses, setGuesses] = useState<GuessType[]>([]);
    const spies = useMemo(
        () => players.filter((player) => spiesIds.includes(player.id)),
        [spiesIds, players],
    );
    const [modifiedSpies, setModifiedSpies] = useState(
        spies.map((pl, index) => ({
            ...pl,
            selected: index === 0 ? true : false,
        })),
    );
    const selectedSpy = useMemo(() => {
        return modifiedSpies.find((pl) => pl.selected);
    }, [modifiedSpies]);
    const guessedIds = useMemo(() => {
        const selected = guesses.filter(
            (guess) => guess.guesserId === selectedSpy.id,
        );
        return selected.map((guess) => guess.guessedId);
    }, [guesses, selectedSpy.id]);
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
    const handleGuess = useCallback(
        (guessedId: string) => {
            const clonedGuesses = [...guesses];
            const index = clonedGuesses.findIndex(
                (guess) =>
                    guess.guessedId === guessedId &&
                    guess.guesserId === selectedSpy.id,
            );
            if (index === -1)
                clonedGuesses.push({guessedId, guesserId: selectedSpy.id});
            else clonedGuesses.splice(index, 1);
            const guesserGuessesLength = clonedGuesses.filter(
                (guess) => guess.guesserId === selectedSpy.id,
            ).length;
            const voterFirstVoteIndex = clonedGuesses.findIndex(
                (guess) => guess.guesserId === selectedSpy.id,
            );
            if (guesserGuessesLength > 1 && voterFirstVoteIndex !== -1)
                clonedGuesses.splice(voterFirstVoteIndex, 1);
            setGuesses(clonedGuesses);
        },
        [guesses, selectedSpy.id],
    );
    const handleWinner = useCallback(() => {
        const guessedLocations = guesses.map((guess) => guess.guessedId);
        const guessesWhichWereCorrect = guesses.filter(
            (guess) => guess.guessedId === location.id,
        );
        const spiesWhoGuessedCorrectlyIds = guessesWhichWereCorrect.map(
            (guess) => guess.guesserId,
        );
        if (guessedLocations.includes(location.id))
            dispatch(
                setGameResult({
                    ...gameResult,
                    winner: Winners.Spies,
                    spiesWhoGuessedCorrectlyIds,
                }),
            );
        navigation.navigate("Result");
    }, [dispatch, gameResult, guesses, location, navigation]);
    const handleNext = useCallback(() => {
        const clonedSpies = [...modifiedSpies];
        const index = clonedSpies.indexOf(selectedSpy);
        const isLast = index === clonedSpies.length - 1;
        if (isLast) return handleWinner();
        clonedSpies.map((pl) => (pl.selected = false));
        clonedSpies[index + 1].selected = true;
        setModifiedSpies(clonedSpies);
    }, [handleWinner, modifiedSpies, selectedSpy]);
    const renderButton = useCallback(() => {
        const index = modifiedSpies.indexOf(selectedSpy);
        const isLast = index === modifiedSpies.length - 1;
        const voterVotesLength = guesses.filter(
            (guess) => guess.guesserId === selectedSpy.id,
        ).length;
        const isDisabled = voterVotesLength < 1;
        return (
            <Button
                disabled={isDisabled}
                fontSize={normalize(18)}
                variant="simple"
                title={
                    isLast
                        ? translation.SpiesGuess.finishButtonTitle
                        : translation.SpiesGuess.nextButtonTitle
                }
                onPressOut={handleNext}
                backgroundColor="buttonTertiary"
                opacity={isDisabled ? 0.5 : 1}
                height={(width * 15) / 100}
                width={(width * 31) / 100}>
                <Box flex={0.5}>
                    <Play scale={0.4} />
                </Box>
            </Button>
        );
    }, [
        guesses,
        handleNext,
        modifiedSpies,
        selectedSpy,
        translation.SpiesGuess.finishButtonTitle,
        translation.SpiesGuess.nextButtonTitle,
    ]);
    const handleBackButtonPress = useCallback(() => {
        dispatch(
            setAlert({
                id: Date.now.toString(),
                text: translation.SpiesGuess.backAlert,
                variant: "ask",
                onAccept: () => {
                    dispatch(resetGame());
                    navigation.navigate("Main");
                },
            }),
        );
        return true;
    }, [dispatch, navigation, translation.SpiesGuess.backAlert]);
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
                screenName={translation.SpiesGuess.header}
                onBackPress={handleBackButtonPress}
                icon={<BackCross />}
            />
            <Box paddingHorizontal="s" flex={1} paddingVertical="m">
                <Box flex={1} alignItems="center">
                    <AppText fontSize={normalize(30)} color="buttonPrimary">
                        {selectedSpy.name[language]}
                    </AppText>
                    <Box marginTop="lxl" marginBottom="m">
                        <AppText
                            fontSize={normalize(15)}
                            textAlign="center"
                            variant="medium">
                            {translation.SpiesGuess.guide}
                        </AppText>
                    </Box>
                    <Box flex={1} width="100%">
                        <List
                            selectedIds={guessedIds}
                            items={locations}
                            end={itemCheck}
                            onEndPress={handleGuess}
                        />
                    </Box>
                </Box>
                <Box alignItems="flex-end">{renderButton()}</Box>
            </Box>
        </Container>
    );
};

export default SpiesGuess;
