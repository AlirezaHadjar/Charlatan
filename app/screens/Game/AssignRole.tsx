import React, {useCallback, useMemo, useState} from "react";
import {StyleSheet, Dimensions, BackHandler} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
// eslint-disable-next-line import/no-extraneous-dependencies
import {
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
} from "@react-navigation/core";
import Animated, {
    Easing,
    interpolate,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import Button from "../../components/Button";
import Play from "../../assets/SVGs/Play";
import Eye from "../../assets/SVGs/Eye";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Box from "../../theme/Box";
import normalize from "../../utils/normalizer";
import {useSelector} from "../../store/useSelector";
import {
    resetGame,
    getActiveGameId,
    getGame,
    getPlayersByPlayers,
    getLocation,
} from "../../store/reducers/data";
import AppText from "../../components/Text";
import {Location, User} from "../../types";
import Pin from "../../assets/SVGs/Pin";
import BackCross from "../../assets/SVGs/BackCross";
import {useAppDispatch} from "../../store/configureStore";
import {AppRoute} from "../../navigations/AppNavigator";
import {GameRoutes} from "../../navigations/GameNavigator";
import {useTranslation} from "../../hooks/translation";
import {getLanguageName} from "../../store/reducers/language";
import {setAlert} from "../../store/reducers/alert";
import Animatable from "../../components/Animatable";

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<GameRoutes, "AssignRole">,
    StackNavigationProp<AppRoute>
>;

export type AssignRoleProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const Game: React.FC<AssignRoleProps> = ({navigation}) => {
    const activeGameId = useSelector(getActiveGameId);
    const selectedGame = useSelector(getGame(activeGameId));
    const selectedRound = useMemo(
        () =>
            selectedGame && selectedGame.rounds[selectedGame.currentRoundIndex],
        [selectedGame],
    );
    const selectedLocationId = useMemo(
        () => (selectedRound ? selectedRound.selectedLocationId : ""),
        [selectedRound],
    );
    const spiesIds = useMemo(
        () => (selectedRound ? selectedRound.spiesIds : []),
        [selectedRound],
    );
    const location = useSelector(getLocation(selectedLocationId));
    const players = useSelector(
        getPlayersByPlayers(selectedGame && selectedGame.players),
    );
    const translation = useTranslation();
    const language = useSelector(getLanguageName);
    const dispatch = useAppDispatch();
    const [roleIsHidden, setRoleIsHidden] = useState(true);
    const [roleDisplayed, setRoleDisplayed] = useState(false);
    const [modifiedPlayers, setModifiedPlayers] = useState(
        players.map((pl, index) => ({
            ...pl,
            selected: index === 0 ? true : false,
        })),
    );

    const selectedPlayer = useMemo(() => {
        return modifiedPlayers.find(pl => pl.selected);
    }, [modifiedPlayers]);

    const transition = useSharedValue(0);

    const renderSpy = useCallback(
        () => (
            <Box alignItems="center">
                <AppText
                    fontSize={normalize(75)}
                    color="thirdText"
                    variant="bold">
                    {translation.AssignRole.spy}
                </AppText>
            </Box>
        ),
        [translation.AssignRole.spy],
    );
    const renderCitizen = useCallback(
        (location: Location) => (
            <Box alignItems="center">
                <AppText
                    fontSize={normalize(75)}
                    color="thirdText"
                    variant="bold">
                    {translation.AssignRole.citizen}
                </AppText>
                <Box flexDirection="row" marginTop="m" alignItems="center">
                    <Box marginEnd="s">
                        <Pin color="thirdText" />
                    </Box>
                    <AppText
                        fontSize={normalize(30)}
                        color="thirdText"
                        variant="semiBold">
                        {location.name[language]}
                    </AppText>
                </Box>
            </Box>
        ),
        [language, translation.AssignRole.citizen],
    );
    const renderGuideText = useCallback(() => {
        const index = modifiedPlayers.indexOf(selectedPlayer);
        const isLast = index === modifiedPlayers.length - 1;
        const text = isLast ? "" : translation.AssignRole.nextButtonGuide;
        return (
            <Box maxWidth="50%">
                <Animatable>
                    <AppText
                        fontSize={normalize(16)}
                        color="thirdText"
                        variant="semiBold">
                        {text}
                    </AppText>
                </Animatable>
            </Box>
        );
    }, [
        modifiedPlayers,
        selectedPlayer,
        translation.AssignRole.nextButtonGuide,
    ]);
    const renderRole = useCallback(
        (player: User) => {
            if (spiesIds.includes(player.id)) return renderSpy();
            return renderCitizen(location);
        },
        [location, renderCitizen, renderSpy, spiesIds],
    );
    const handleNext = useCallback(() => {
        transition.value = withTiming(
            1,
            {duration: 1000, easing: Easing.ease},
            () => {
                transition.value = 0;
            },
        );
        const clonedPlayers = [...modifiedPlayers];
        const index = clonedPlayers.indexOf(selectedPlayer);
        const isLast = index === clonedPlayers.length - 1;
        if (isLast) return navigation.navigate("Timer");
        clonedPlayers.map(pl => (pl.selected = false));
        clonedPlayers[index + 1].selected = true;
        setRoleDisplayed(false);
        setModifiedPlayers(clonedPlayers);
    }, [modifiedPlayers, navigation, selectedPlayer, transition.value]);

    const renderButton = useCallback(() => {
        const index = modifiedPlayers.indexOf(selectedPlayer);
        const isLast = index === modifiedPlayers.length - 1;
        return (
            <Button
                fontSize={normalize(18)}
                variant="simple"
                title={
                    isLast
                        ? translation.AssignRole.startButtonTitle
                        : translation.AssignRole.nextButtonTitle
                }
                onPress={handleNext}
                backgroundColor="secondBackground"
                height={(width * 15) / 100}
                width={(width * 31) / 100}>
                <Play scale={0.4} />
            </Button>
        );
    }, [
        handleNext,
        modifiedPlayers,
        selectedPlayer,
        translation.AssignRole.nextButtonTitle,
        translation.AssignRole.startButtonTitle,
    ]);
    const handleBackButtonPress = useCallback(() => {
        dispatch(
            setAlert({
                id: Date.now.toString(),
                text: translation.AssignRole.backAlert,
                variant: "ask",
                onAccept: () => {
                    dispatch(resetGame());
                    navigation.navigate("Main");
                },
            }),
        );
        return true;
    }, [dispatch, navigation, translation.AssignRole.backAlert]);
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
    const selectedPlayerName = useMemo(
        () => (
            <Animatable deps={[selectedPlayer]}>
                <AppText fontSize={normalize(40)} variant="semiBold">
                    {selectedPlayer.name[language]}
                </AppText>
            </Animatable>
        ),
        [language, selectedPlayer],
    );

    const animationStyles = useAnimatedStyle(() => {
        const opacity = interpolate(
            transition.value,
            [0, 0.5, 0.55, 1],
            [1, 0, 0, 1],
        );
        const translateX = interpolate(
            transition.value,
            [0, 0.5, 0.52, 1],
            [0, -50, 50, 0],
        );
        return {
            opacity,
            transform: [{translateX}],
        };
    });

    return (
        <Container style={styles.container}>
            <Header
                screenName={translation.AssignRole.header}
                onBackPress={handleBackButtonPress}
                icon={<BackCross />}
            />
            <Box paddingBottom="m" paddingHorizontal="m" flex={1}>
                <Box flex={1}>
                    <Animated.View style={animationStyles}>
                        <Box alignItems="center" top={(height * 5) / 100}>
                            {selectedPlayerName}
                            <Button
                                height={(height * 15) / 100}
                                width={(height * 15) / 100}
                                marginTop="l"
                                onPressIn={() => {
                                    if (!roleDisplayed) setRoleDisplayed(true);
                                    setRoleIsHidden(false);
                                }}
                                onPressOut={() => setRoleIsHidden(true)}
                                marginBottom="l"
                                variant="icon"
                                icon={<Eye />}
                                title=""
                                backgroundColor="secondBackground"
                            />
                            <Animatable deps={[roleIsHidden]}>
                                {!roleIsHidden ? (
                                    renderRole(selectedPlayer)
                                ) : (
                                    <AppText
                                        fontSize={normalize(20)}
                                        color="thirdText"
                                        variant="medium"
                                        textAlign="center">
                                        {roleDisplayed
                                            ? translation.AssignRole
                                                  .seeRoleGuideAgain
                                            : translation.AssignRole
                                                  .seeRoleGuide}
                                    </AppText>
                                )}
                            </Animatable>
                        </Box>
                    </Animated.View>
                </Box>
                <Box height={(height * 15) / 100} justifyContent="flex-end">
                    {roleDisplayed && (
                        <Box
                            flexDirection="row-reverse"
                            alignItems="center"
                            justifyContent="space-between">
                            {renderButton()}
                            {renderGuideText()}
                        </Box>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Game;
