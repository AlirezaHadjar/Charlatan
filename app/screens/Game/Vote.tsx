import React, {useCallback, useMemo, useState} from "react";
import {StyleSheet, Dimensions} from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import {CompositeNavigationProp, RouteProp} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";

import Container from "../../components/Container";
import Header from "../../components/Header";
import List from "../../components/list/player/List";
import {
    getPlayers,
    getSpiesIds,
    resetGame,
    setGameResult,
} from "../../store/reducers/data";
import {useSelector} from "../../store/useSelector";
import Box from "../../theme/Box";
import Check from "../../assets/SVGs/Check";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {Vote as VoteType, VotingResult, Winners} from "../../types";
import {GameRoutes} from "../../navigations/GameNavigator";
import {AppRoute} from "../../navigations/AppNavigator";
import Button from "../../components/Button";
import Play from "../../assets/SVGs/Play";
import {useAppDispatch} from "../../store/configureStore";
import {useTranslation} from "../../hooks/translation";

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<GameRoutes, "AssignRole">,
    StackNavigationProp<AppRoute>
>;

export type VoteProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const {width} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

const Vote: React.FC<VoteProps> = ({navigation}) => {
    const translation = useTranslation();
    const players = useSelector(getPlayers);
    const spiesIds = useSelector(getSpiesIds);
    const dispatch = useAppDispatch();
    const [votes, setVotes] = useState<VoteType[]>([]);
    const [modifiedPlayers, setModifiedPlayers] = useState(
        players.map((pl, index) => ({
            ...pl,
            selected: index === 0 ? true : false,
        })),
    );
    const selectedPlayer = useMemo(() => {
        return modifiedPlayers.find((pl) => pl.selected);
    }, [modifiedPlayers]);
    const votingPeople = useMemo(() => {
        return modifiedPlayers.filter((pl) => !pl.selected);
    }, [modifiedPlayers]);
    const votedPeopleIds = useMemo(() => {
        const selected = votes.filter(
            (vote) => vote.voterId === selectedPlayer.id,
        );
        return selected.map((vote) => vote.votedId);
    }, [selectedPlayer.id, votes]);

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
    const handleVote = useCallback(
        (votedId: string) => {
            const clonedVotes = [...votes];
            const index = clonedVotes.findIndex(
                (vote) =>
                    vote.votedId === votedId &&
                    vote.voterId === selectedPlayer.id,
            );
            if (index === -1)
                clonedVotes.push({votedId, voterId: selectedPlayer.id});
            else clonedVotes.splice(index, 1);
            const voterVotesLength = clonedVotes.filter(
                (vote) => vote.voterId === selectedPlayer.id,
            ).length;
            const voterFirstVoteIndex = clonedVotes.findIndex(
                (vote) => vote.voterId === selectedPlayer.id,
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
            <AppText fontSize={normalize(20)}>
                {spiesLength > 1 ? spiesText : SpyText}
            </AppText>
        );
    };
    const getWinner = useCallback(
        (mostVoted: VotingResult[], spiesIds: string[]) => {
            const spiesAreInVotes = spiesIds.some((id) =>
                mostVoted.find((vote) => vote.playerId === id),
            );
            if (mostVoted.length > 1 && spiesAreInVotes) return Winners.Spies;
            if (spiesAreInVotes) return Winners.Citizens;
            return Winners.Spies;
        },
        [],
    );
    const handleWinner = useCallback(() => {
        const votingResult: VotingResult[] = players.map((player) => {
            const {length} = votes.filter((vote) => vote.votedId === player.id);
            return {
                playerId: player.id,
                numberOfVotes: length,
                playerName: player.name,
            };
        });
        let mostVoted: VotingResult[] = [
            {playerName: "", numberOfVotes: 0, playerId: ""},
        ];
        votingResult.forEach((result) => {
            if (result.numberOfVotes === 0) return;
            if (result.numberOfVotes > mostVoted[0].numberOfVotes)
                mostVoted = [result];
            else if (result.numberOfVotes === mostVoted[0].numberOfVotes)
                mostVoted.push(result);
        });
        const winner = getWinner(mostVoted, spiesIds);
        dispatch(
            setGameResult({
                spiesWhoGuessedCorrectlyIds: [],
                winner,
                votingResult,
            }),
        );
        navigation.navigate("SpiesGuess");
    }, [dispatch, getWinner, navigation, players, spiesIds, votes]);
    const handleNext = useCallback(() => {
        const clonedPlayers = [...modifiedPlayers];
        const index = clonedPlayers.indexOf(selectedPlayer);
        const isLast = index === clonedPlayers.length - 1;
        if (isLast) return handleWinner();
        clonedPlayers.map((pl) => (pl.selected = false));
        clonedPlayers[index + 1].selected = true;
        setModifiedPlayers(clonedPlayers);
    }, [handleWinner, modifiedPlayers, selectedPlayer]);

    const renderButton = useCallback(() => {
        const index = modifiedPlayers.indexOf(selectedPlayer);
        const isLast = index === modifiedPlayers.length - 1;
        const voterVotesLength = votes.filter(
            (vote) => vote.voterId === selectedPlayer.id,
        ).length;
        const isDisabled = voterVotesLength < spiesIds.length;
        return (
            <Button
                disabled={isDisabled}
                fontSize={normalize(18)}
                variant="simple"
                title={
                    isLast
                        ? translation.Vote.finishButtonTitle
                        : translation.Vote.nextButtonTitle
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
        handleNext,
        modifiedPlayers,
        selectedPlayer,
        spiesIds.length,
        translation.Vote.finishButtonTitle,
        translation.Vote.nextButtonTitle,
        votes,
    ]);
    const handleBackButtonPress = useCallback(() => {
        dispatch(resetGame());
        navigation.navigate("Main");
    }, [dispatch, navigation]);
    return (
        <Container style={styles.container}>
            <Header
                screenName={translation.Vote.header}
                onBackPress={handleBackButtonPress}
            />
            <Box paddingHorizontal="m" flex={1} paddingVertical="m">
                <Box flex={1} alignItems="center">
                    <AppText fontSize={normalize(30)} color="buttonPrimary">
                        {selectedPlayer.name}
                    </AppText>
                    <Box marginTop="lxl" marginBottom="m">
                        {renderSpiesText(spiesIds.length)}
                    </Box>
                    <Box flex={1} width="100%">
                        <List
                            selectedIds={votedPeopleIds}
                            items={votingPeople}
                            end={itemCheck}
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
