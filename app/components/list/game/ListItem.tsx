import {useTheme} from "@shopify/restyle";
import React from "react";
import {Pressable, StyleSheet, FlatList, Dimensions} from "react-native";
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
import AppText from "../../Text";

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
}

const getPlayerName = (users: User[], player: PlayerType) => {
    const index = users.findIndex((user) => user.id === player.id);
    if (index === -1)
        return {
            en: "Not Found",
            fa: "یافت نشد",
        };
    return users[index].name;
};

const {width: SCREEN_WIDTH} = Dimensions.get("window");

const MORE_DOT_SIZE = (SCREEN_WIDTH * 2) / 100;

const ListItem: React.FC<ListItemProps> = ({
    item,
    onPress,
    width,
    users = [],
    height,
    margin,
    offsetX,
    index,
}) => {
    const theme = useTheme<ThemeType>();

    const wholeWidth = width + 2 * margin;

    const styles = StyleSheet.create({
        card: {
            width,
            height,
            borderRadius: theme.borderRadii.ssl,
            backgroundColor: theme.colors.cardBackground,
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

    // useEffect(() => {
    //     progress.value = 0;
    //     progress.value = withTiming(1, {duration: 200 + index * 200});
    // }, [index, progress]);

    return (
        <Pressable onPress={() => onPress(item.id)}>
            <Animated.View style={[animatedStyles, styles.card]}>
                <Box
                    width="100%"
                    flex={0.15}
                    alignItems="center"
                    justifyContent="center">
                    <AppText
                        color="fourthText"
                        variant="bold"
                        fontSize={normalize(25)}>
                        {item.name}
                    </AppText>
                </Box>
                <Separator text="1 Round Remaining" />
                <Box flex={1}>
                    <FlatList
                        data={item.players}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={{
                            paddingTop: theme.spacing.m,
                            flex: 1,
                        }}
                        // ListFooterComponent={
                        //     <Box
                        //         flexDirection="row"
                        //         paddingHorizontal="m"
                        //         paddingVertical="s">
                        //         <Box
                        //             width={MORE_DOT_SIZE}
                        //             height={MORE_DOT_SIZE}
                        //             borderRadius="hero1"
                        //             backgroundColor="mainTextColor"
                        //         />
                        //         <Box
                        //             width={MORE_DOT_SIZE}
                        //             height={MORE_DOT_SIZE}
                        //             borderRadius="hero1"
                        //             backgroundColor="mainTextColor"
                        //         />
                        //         <Box
                        //             width={MORE_DOT_SIZE}
                        //             height={MORE_DOT_SIZE}
                        //             borderRadius="hero1"
                        //             backgroundColor="mainTextColor"
                        //         />
                        //     </Box>
                        // }
                        ListHeaderComponent={
                            <Box
                                paddingVertical="s"
                                paddingHorizontal="l"
                                width="100%"
                                marginBottom="s"
                                justifyContent="space-between"
                                flexDirection="row"
                                alignItems="center">
                                <Box flex={1} alignItems="flex-start">
                                    <AppText
                                        variant="bold"
                                        fontSize={normalize(18)}
                                        color="fourthText">
                                        Player
                                    </AppText>
                                </Box>
                                <AppText
                                    variant="bold"
                                    fontSize={normalize(18)}
                                    color="danger">
                                    Score
                                </AppText>
                            </Box>
                        }
                        renderItem={({item}) => (
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
                                        color="fourthText">
                                        {getPlayerName(users, item).en}
                                    </AppText>
                                </Box>
                                <AppText
                                    variant="bold"
                                    fontSize={normalize(22)}
                                    color="fourthText">
                                    {item.score}
                                </AppText>
                            </Box>
                        )}
                    />
                </Box>
            </Animated.View>
        </Pressable>
    );
};

export default ListItem;
