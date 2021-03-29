import React, {useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, Dimensions} from "react-native";
import {StackNavigationProp} from "@react-navigation/stack";
// eslint-disable-next-line import/no-extraneous-dependencies
import {CompositeNavigationProp, RouteProp} from "@react-navigation/core";

import Button from "../../components/Button";
import Play from "../../assets/SVGs/Play";
import Eye from "../../assets/SVGs/Eye";
import Container from "../../components/Container";
import Header from "../../components/Header";
import Box from "../../theme/Box";
import normalize from "../../utils/normalizer";
import {useSelector} from "../../store/useSelector";
import {
    startGame,
    getPlayers,
    getSelectedLocation,
    getSpiesIds,
    resetGame,
} from "../../store/reducers/data";
import AppText from "../../components/Text";
import {Location, Player} from "../../types";
import Pin from "../../assets/SVGs/Pin";
import {useAppDispatch} from "../../store/configureStore";
import {AppRoute} from "../../navigations/AppNavigator";
import {GameRoutes} from "../../navigations/GameNavigator";
import {useTranslation} from "../../hooks/translation";

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
    const players = useSelector(getPlayers);
    const traslation = useTranslation();
    const location = useSelector(getSelectedLocation);
    const dispatch = useAppDispatch();
    const spiesIds = useSelector(getSpiesIds);
    const [roleIsHidden, setRoleIsHidden] = useState(true);
    const [roleDisplayed, setRoleDisplayed] = useState(false);
    const [modifiedPlayers, setModifiedPlayers] = useState(
        players.map((pl, index) => ({
            ...pl,
            selected: index === 0 ? true : false,
        })),
    );
    useEffect(() => {
        dispatch(startGame());
    }, [dispatch]);
    const selectedPlayer = useMemo(() => {
        return modifiedPlayers.find((pl) => pl.selected);
    }, [modifiedPlayers]);
    const renderSpy = useCallback(
        () => (
            <Box alignItems="center">
                <AppText fontSize={normalize(17)} color="thirdText">
                    {traslation.AssignRole.preRole}
                </AppText>
                <AppText fontSize={normalize(90)} color="thirdText">
                    {traslation.AssignRole.spy}
                </AppText>
            </Box>
        ),
        [traslation.AssignRole.preRole, traslation.AssignRole.spy],
    );
    const renderCitizen = useCallback(
        (location: Location) => (
            <Box alignItems="center">
                <AppText fontSize={normalize(17)} color="thirdText">
                    {traslation.AssignRole.preRole}
                </AppText>
                <AppText fontSize={normalize(70)} color="thirdText">
                    {traslation.AssignRole.citizen}
                </AppText>
                <Box flexDirection="row">
                    <Box marginEnd="s">
                        <Pin color="thirdText" />
                    </Box>
                    <AppText fontSize={normalize(17)} color="thirdText">
                        {location.name}
                    </AppText>
                </Box>
            </Box>
        ),
        [traslation.AssignRole.citizen, traslation.AssignRole.preRole],
    );
    const renderGuideText = useCallback(() => {
        const index = modifiedPlayers.indexOf(selectedPlayer);
        const isLast = index === modifiedPlayers.length - 1;
        const text = isLast ? "" : traslation.AssignRole.nextButtonGuide;
        return (
            <Box maxWidth="50%">
                <AppText fontSize={normalize(12)} color="thirdText">
                    {text}
                </AppText>
            </Box>
        );
    }, [
        modifiedPlayers,
        selectedPlayer,
        traslation.AssignRole.nextButtonGuide,
    ]);
    const renderRole = useCallback(
        (player: Player) => {
            if (spiesIds.includes(player.id)) return renderSpy();
            return renderCitizen(location);
        },
        [location, renderCitizen, renderSpy, spiesIds],
    );
    const handleNext = useCallback(() => {
        const clonedPlayers = [...modifiedPlayers];
        const index = clonedPlayers.indexOf(selectedPlayer);
        const isLast = index === clonedPlayers.length - 1;
        if (isLast) return navigation.navigate("Timer");
        clonedPlayers.map((pl) => (pl.selected = false));
        clonedPlayers[index + 1].selected = true;
        setRoleDisplayed(false);
        setModifiedPlayers(clonedPlayers);
    }, [modifiedPlayers, navigation, selectedPlayer]);

    const renderButton = useCallback(() => {
        const index = modifiedPlayers.indexOf(selectedPlayer);
        const isLast = index === modifiedPlayers.length - 1;
        return (
            <Button
                fontSize={normalize(18)}
                variant="simple"
                title={
                    isLast
                        ? traslation.AssignRole.startButtonTitle
                        : traslation.AssignRole.nextButtonTitle
                }
                onPressOut={handleNext}
                backgroundColor="buttonTertiary"
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
        traslation.AssignRole.nextButtonTitle,
        traslation.AssignRole.startButtonTitle,
    ]);
    const handleBackButtonPress = useCallback(() => {
        dispatch(resetGame());
        navigation.navigate("Main");
    }, [dispatch, navigation]);
    return (
        <Container style={styles.container}>
            <Header
                screenName={traslation.AssignRole.header}
                onBackPress={handleBackButtonPress}
            />
            <Box padding="m" flex={1}>
                <Box flex={1}>
                    <Box alignItems="center" top="20%">
                        <AppText fontSize={normalize(30)}>
                            {selectedPlayer.name}
                        </AppText>
                        <Button
                            height={(width * 31) / 100}
                            width={(width * 31) / 100}
                            marginTop="xl"
                            onPressIn={() => {
                                if (!roleDisplayed) setRoleDisplayed(true);
                                setRoleIsHidden(false);
                            }}
                            onPressOut={() => setRoleIsHidden(true)}
                            marginBottom="m"
                            variant="icon"
                            icon={<Eye />}
                            title=""
                            backgroundColor="buttonTertiary"
                        />
                        {!roleIsHidden ? (
                            renderRole(selectedPlayer)
                        ) : (
                            <AppText
                                fontSize={normalize(17)}
                                color="thirdText"
                                textAlign="center">
                                {roleDisplayed
                                    ? traslation.AssignRole.seeRoleGuideAgain
                                    : traslation.AssignRole.seeRoleGuide}
                            </AppText>
                        )}
                    </Box>
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
