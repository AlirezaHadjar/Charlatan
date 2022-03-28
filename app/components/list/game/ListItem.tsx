import {useTheme} from "@shopify/restyle";
import React, {useMemo} from "react";
import {Pressable, StyleSheet, FlatList} from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedStyle,
} from "react-native-reanimated";

import Box from "../../../theme/Box";
import {ThemeType} from "../../../theme/Theme";
import Player from "../../../assets/SVGs/Player";
import {Game, Player as PlayerType, User} from "../../../types";
import normalize from "../../../utils/normalizer";
import {useTranslation} from "../../../hooks/translation";
import AppText from "../../Text";
import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";

import Separator from "./Separator";

export interface ListItemProps {
    item: Game;
    width: number;
    height: number;
    index: number;
    users: User[];
    offsetX: Animated.SharedValue<number>;
    margin: number;
    onPress?: (id: string) => void;
    onlyResult?: boolean;
}

const getPlayerName = (users: User[], player: PlayerType) => {
    const index = users.findIndex(user => user.id === player.id);
    if (index === -1)
        return {
            en: "Not Found",
            fa: "یافت نشد",
        };
    return users[index].name;
};

const ListItem: React.FC<ListItemProps> = ({
    item,
    onPress,
    width,
    users = [],
    height,
    margin,
    offsetX,
    index,
    onlyResult = false,
}) => {
    const theme = useTheme<ThemeType>();
    const translation = useTranslation();
    const language = useSelector(getLanguageName);
    const remainingRounds = useMemo(
        () => item.rounds.length - item.currentRoundIndex,
        [item.currentRoundIndex, item.rounds.length],
    );
    const sortedPlayers = useMemo(() => {
        const cloned = [...item.players];
        return cloned.sort((a, b) => b.score - a.score);
    }, [item.players]);

    const wholeWidth = width + 2 * margin;

    const styles = StyleSheet.create({
        card: {
            width,
            height,
            borderRadius: theme.borderRadii.ssl,
            alignItems: "center",
            marginHorizontal: margin,
            overflow: "hidden",
        },
    });

    const animatedStyles = useAnimatedStyle(() => {
        const scaleY = interpolate(
            offsetX.value,
            [
                (index - 1) * wholeWidth,
                index * wholeWidth,
                (index + 1) * wholeWidth,
            ],
            [0.92, 1, 0.92],
            Extrapolate.CLAMP,
        );
        return {
            transform: [{scaleY}],
        };
    }, [index, offsetX.value]);

    const handleColor: (index: number) => keyof ThemeType["colors"] = index => {
        if (index === 0) return "gold";
        if (index === 1) return "silver";
        if (index === 2) return "bronze";
        return "badRank";
    };

    const getScore = ({score, previousScore}: PlayerType) => {
        if (!onlyResult) return score;
        if (
            previousScore === score ||
            previousScore > score ||
            previousScore === undefined
        )
            return score;
        const diff = score - previousScore;
        return `(${previousScore} + ${diff})  ${score}`;
    };

    return (
        <Pressable
            onPress={() => onPress && onPress(item.id)}
            disabled={onlyResult}>
            <Animated.View style={[animatedStyles, styles.card]}>
                <Box
                    position="absolute"
                    width="100%"
                    opacity={onlyResult ? 0.9 : 1}
                    height="100%"
                    backgroundColor={onlyResult ? "cardGrey" : "cardBackground"}
                />
                {!onlyResult && (
                    <Box flex={0.2} alignItems="center" justifyContent="center">
                        <Box
                            width="100%"
                            alignItems="center"
                            justifyContent="center"
                            flex={1}>
                            <AppText
                                color="fourthText"
                                variant="bold"
                                fontSize={normalize(25)}>
                                {item.name}
                            </AppText>
                        </Box>
                        <Separator
                            text={
                                remainingRounds > 0 &&
                                `${remainingRounds} ${translation.components.GameList.roundRemaining}`
                            }
                        />
                    </Box>
                )}
                <Box flex={1}>
                    <FlatList
                        data={sortedPlayers}
                        keyExtractor={item => item.id}
                        contentContainerStyle={{
                            paddingTop: theme.spacing.m,
                        }}
                        ListHeaderComponent={
                            sortedPlayers.length > 0 && (
                                <Box
                                    paddingVertical="s"
                                    paddingHorizontal="l"
                                    width="100%"
                                    marginBottom="s"
                                    justifyContent="space-between"
                                    flexDirection="row"
                                    alignItems="center">
                                    <Box alignItems="flex-start">
                                        <AppText
                                            variant="bold"
                                            fontSize={normalize(18)}
                                            color="silver">
                                            {
                                                translation.components.GameList
                                                    .player
                                            }
                                        </AppText>
                                    </Box>
                                    <AppText
                                        variant="bold"
                                        fontSize={normalize(18)}
                                        color="danger">
                                        {translation.components.GameList.score}
                                    </AppText>
                                </Box>
                            )
                        }
                        renderItem={({item, index}) => (
                            <Box
                                paddingVertical="s"
                                paddingHorizontal="l"
                                width="100%"
                                justifyContent="space-between"
                                flexDirection="row"
                                alignItems="center">
                                <Player />
                                <Box
                                    flex={1}
                                    marginHorizontal="m"
                                    alignItems="flex-start">
                                    <AppText
                                        variant="bold"
                                        fontSize={normalize(22)}
                                        color={handleColor(index)}>
                                        {`${index + 1}.  `}
                                        {getPlayerName(users, item)[language]}
                                    </AppText>
                                </Box>
                                <AppText
                                    variant="bold"
                                    fontSize={normalize(22)}
                                    color={
                                        onlyResult ? "silver" : "fourthText"
                                    }>
                                    {getScore(item)}
                                </AppText>
                            </Box>
                        )}
                    />
                </Box>
                {sortedPlayers.length === 0 && (
                    <Box
                        position="absolute"
                        width="100%"
                        height="100%"
                        alignItems="center"
                        justifyContent="center">
                        <AppText
                            color="fourthText"
                            variant="bold"
                            fontSize={normalize(22)}>
                            {translation.components.GameList.ThereIsNoPlayer}
                        </AppText>
                    </Box>
                )}
            </Animated.View>
        </Pressable>
    );
};

export default ListItem;
