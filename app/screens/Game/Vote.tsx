import React, {useCallback, useMemo, useState} from "react";
import {StyleSheet, Dimensions, BackHandler} from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import {useFocusEffect} from "@react-navigation/core";

import Container from "../../components/Container";
import Header from "../../components/Header";
import List from "../../components/list/player/List";
import {
    getActiveGameId,
    getGame,
    getGames,
    getPlayersByPlayers,
    resetGame,
    setGameResult,
} from "../../store/reducers/data";
import {useSelector} from "../../store/useSelector";
import Box, {RotatedBox} from "../../theme/Box";
import BackCross from "../../assets/SVGs/BackCross";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {User, Vote as VoteType, VotingResult, Winners} from "../../types";
import Button from "../../components/Button";
import Play from "../../assets/SVGs/Play";
import {useAppDispatch} from "../../store/configureStore";
import {useTranslation} from "../../hooks/translation";
import {getLanguageName} from "../../store/reducers/language";
import {setAlert} from "../../store/reducers/alert";
import {useGames} from "../../hooks/games";
import ItemCheck from "../../components/ItemCheck";
import {GameNavigatorStackProps} from "../../navigations/types";

export type VoteProps = GameNavigatorStackProps<"Vote">;

const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

const getWinner = (mostVoted: VotingResult[], spiesIds: string[]) => {
    const spiesInVotes = spiesIds.filter(id =>
        mostVoted.find(vote => vote.playerId === id),
    );
    const votesAreOnlySpies = mostVoted.length === spiesIds.length;
    // There Are More Than One Person That have been Most Voted
    if (mostVoted.length > 1) {
        if (votesAreOnlySpies) return Winners.Citizens;
        return Winners.Spies;
    }
    // There is Only One person That has been Most Voted
    if (spiesInVotes.length > 0) return Winners.Citizens;
    return Winners.Spies;
};

const getCorrectGuessedIds = (
    spiesIds: string[],
    votes: VoteType[],
    players: User[],
) => {
    const citizens = players.filter(player => !spiesIds.includes(player.id));
    const correctVotes = votes.filter(vote => spiesIds.includes(vote.votedId));
    const correctVotersIds = correctVotes.map(vote => vote.voterId);
    const citizensWhoGuessedCorrectly = citizens.filter(citizen =>
        correctVotersIds.includes(citizen.id),
    );
    return citizensWhoGuessedCorrectly.map(citizen => citizen.id);
};

const Vote: React.FC<VoteProps> = ({navigation}) => {
    const translation = useTranslation();
    const activeGameId = useSelector(getActiveGameId);
    const games = useSelector(getGames);
    const selectedGame = useSelector(getGame(activeGameId));
    const selectedRound = useMemo(
        () =>
            selectedGame && selectedGame.rounds[selectedGame.currentRoundIndex],
        [selectedGame],
    );
    const spiesIds = useMemo(
        () => (selectedRound ? selectedRound.spiesIds : []),
        [selectedRound],
    );
    const players = useSelector(
        getPlayersByPlayers(selectedGame && selectedGame.players),
    );
    const language = useSelector(getLanguageName);
    const dispatch = useAppDispatch();
    const [votes, setVotes] = useState<VoteType[]>([]);
    const [modifiedPlayers, setModifiedPlayers] = useState(
        players.map((pl, index) => ({
            ...pl,
            selected: index === 0 ? true : false,
        })),
    );
    const selectedPlayer = useMemo(() => {
        return modifiedPlayers.find(pl => pl.selected);
    }, [modifiedPlayers]);
    const votingPeople = useMemo(() => {
        return modifiedPlayers.filter(pl => !pl.selected);
    }, [modifiedPlayers]);
    const votedPeopleIds = useMemo(() => {
        const selected = votes.filter(
            vote => vote.voterId === selectedPlayer.id,
        );
        return selected.map(vote => vote.votedId);
    }, [selectedPlayer.id, votes]);

    useGames(games);

    const handleVote = useCallback(
        (votedId: string) => {
            const clonedVotes = [...votes];
            const index = clonedVotes.findIndex(
                vote =>
                    vote.votedId === votedId &&
                    vote.voterId === selectedPlayer.id,
            );
            if (index === -1)
                clonedVotes.push({votedId, voterId: selectedPlayer.id});
            else clonedVotes.splice(index, 1);
            const voterVotesLength = clonedVotes.filter(
                vote => vote.voterId === selectedPlayer.id,
            ).length;
            const voterFirstVoteIndex = clonedVotes.findIndex(
                vote => vote.voterId === selectedPlayer.id,
            );
            if (
                voterVotesLength > spiesIds.length &&
                voterFirstVoteIndex !== -1
            )
                clonedVotes.splice(voterFirstVoteIndex, 1);
            setVotes(clonedVotes);
        },
        [selectedPlayer.id, spiesIds.length, votes],
    );
    const renderSpiesText = (spiesLength: number) => {
        const SpyText = translation.Vote.selectTheSpy;
        const spiesText = translation.Vote.selectTheSpies(spiesLength);
        return (
            <AppText fontSize={normalize(20)} variant="medium">
                {spiesLength > 1 ? spiesText : SpyText}
            </AppText>
        );
    };
    const handleWinner = useCallback(() => {
        const votingResult: VotingResult[] = players.map(player => {
            const {length} = votes.filter(vote => vote.votedId === player.id);
            return {
                playerId: player.id,
                numberOfVotes: length,
                playerName: player.name[language],
            };
        });
        let mostVoted: VotingResult[] = [
            {playerName: "", numberOfVotes: 0, playerId: ""},
        ];
        votingResult.forEach(result => {
            if (result.numberOfVotes === 0) return;
            if (result.numberOfVotes > mostVoted[0].numberOfVotes)
                mostVoted = [result];
            else if (result.numberOfVotes === mostVoted[0].numberOfVotes)
                mostVoted.push(result);
        });
        const winner = getWinner(mostVoted, spiesIds);
        const citizensWhoGuessedCorrectlyIds = getCorrectGuessedIds(
            spiesIds,
            votes,
            players,
        );
        dispatch(
            setGameResult({
                gameId: selectedGame.id,
                round: {
                    votingResult,
                    winner,
                    citizensWhoGuessedCorrectlyIds,
                },
            }),
        );
        navigation.navigate("SpiesGuess");
    }, [
        dispatch,
        language,
        navigation,
        players,
        selectedGame,
        spiesIds,
        votes,
    ]);
    const handleNext = useCallback(() => {
        const clonedPlayers = [...modifiedPlayers];
        const index = clonedPlayers.indexOf(selectedPlayer);
        const isLast = index === clonedPlayers.length - 1;
        if (isLast) return handleWinner();
        clonedPlayers.map(pl => (pl.selected = false));
        clonedPlayers[index + 1].selected = true;
        setModifiedPlayers(clonedPlayers);
    }, [handleWinner, modifiedPlayers, selectedPlayer]);

    const renderButton = useCallback(() => {
        const index = modifiedPlayers.indexOf(selectedPlayer);
        const isLast = index === modifiedPlayers.length - 1;
        const voterVotesLength = votes.filter(
            vote => vote.voterId === selectedPlayer.id,
        ).length;
        const isDisabled = voterVotesLength < spiesIds.length;
        return (
            <Button
                disabled={isDisabled}
                fontSize={normalize(18)}
                disableText={translation.Vote.spiesLengthError(spiesIds.length)}
                variant="simple"
                title={
                    isLast
                        ? translation.Vote.finishButtonTitle
                        : translation.Vote.nextButtonTitle
                }
                onPress={handleNext}
                backgroundColor="buttonTertiary"
                opacity={isDisabled ? 0.5 : 1}
                height={(width * 15) / 100}
                width={(width * 31) / 100}>
                <RotatedBox flex={0.5}>
                    <Play scale={0.4} />
                </RotatedBox>
            </Button>
        );
    }, [
        handleNext,
        modifiedPlayers,
        selectedPlayer,
        spiesIds.length,
        translation.Vote,
        votes,
    ]);
    const handleBackButtonPress = useCallback(() => {
        dispatch(
            setAlert({
                id: Date.now.toString(),
                text: translation.Vote.backAlert,
                variant: "ask",
                onAccept: () => {
                    dispatch(resetGame());
                    navigation.navigate("Main");
                },
            }),
        );
        return true;
    }, [dispatch, navigation, translation.Vote.backAlert]);
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
                screenName={translation.Vote.header}
                onBackPress={handleBackButtonPress}
                icon={<BackCross />}
            />
            <Box paddingHorizontal="m" flex={1} paddingVertical="m">
                <Box flex={1} alignItems="center">
                    <AppText fontSize={normalize(30)} color="buttonPrimary">
                        {selectedPlayer.name[language]}
                    </AppText>
                    <Box marginTop="lxl" marginBottom="m">
                        {renderSpiesText(spiesIds.length)}
                    </Box>
                    <Box flex={1} width="100%">
                        <List
                            selectedIds={votedPeopleIds}
                            items={votingPeople}
                            end={<ItemCheck />}
                            onEndPress={handleVote}
                        />
                    </Box>
                </Box>
                <Box alignItems="flex-end">{renderButton()}</Box>
            </Box>
        </Container>
    );
};

export default Vote;
