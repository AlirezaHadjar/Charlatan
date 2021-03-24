import React, {useCallback, useEffect, useMemo, useState} from "react";
import {StyleSheet, Dimensions} from "react-native";

import Button from "../components/Button";
import Play from "../assets/SVGs/Play";
import Eye from "../assets/SVGs/Eye";
import Container from "../components/Container";
import Header from "../components/Header";
import Box from "../theme/Box";
import normalize from "../utils/normalizer";
import {useSelector} from "../store/useSelector";
import {
    assignSpyRole,
    getPlayers,
    getRandomLocation,
    getSpiesIds,
} from "../store/reducers/data";
import AppText from "../components/Text";
import {Location, Player} from "../types";
import Pin from "../assets/SVGs/Pin";
import {useAppDispatch} from "../store/configureStore";

const {width, height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

const Game: React.FC<{}> = ({}) => {
    const players = useSelector(getPlayers);
    const location = useSelector(getRandomLocation);
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
        dispatch(assignSpyRole());
    }, [dispatch]);
    const selectedPlayer = useMemo(() => {
        return modifiedPlayers.find((pl) => pl.selected);
    }, [modifiedPlayers]);
    const renderSpy = useCallback(
        () => (
            <Box alignItems="center">
                <AppText fontSize={normalize(17)} color="thirdText">
                    You Are
                </AppText>
                <AppText fontSize={normalize(90)} color="thirdText">
                    Spy
                </AppText>
            </Box>
        ),
        [],
    );
    const renderCitizen = useCallback(
        (location: Location) => (
            <Box alignItems="center">
                <AppText fontSize={normalize(17)} color="thirdText">
                    You Are
                </AppText>
                <AppText fontSize={normalize(70)} color="thirdText">
                    Citizen
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
        [],
    );
    const renderGuideText = useCallback(() => {
        const index = modifiedPlayers.indexOf(selectedPlayer);
        const isLast = index === modifiedPlayers.length - 1;
        const text = isLast
            ? ""
            : "Tap Next and Pass the Phone to Next Player.";
        return (
            <Box maxWidth="50%">
                <AppText fontSize={normalize(12)} color="thirdText">
                    {text}
                </AppText>
            </Box>
        );
    }, [modifiedPlayers, selectedPlayer]);
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
        if (isLast) return console.log("finished");
        clonedPlayers.map((pl) => (pl.selected = false));
        clonedPlayers[index + 1].selected = true;
        setRoleDisplayed(false);
        setModifiedPlayers(clonedPlayers);
    }, [modifiedPlayers, selectedPlayer]);

    const renderButton = useCallback(() => {
        const index = modifiedPlayers.indexOf(selectedPlayer);
        const isLast = index === modifiedPlayers.length - 1;
        return (
            <Button
                fontSize={normalize(18)}
                variant="simple"
                title={isLast ? "Play" : "Next"}
                onPressOut={handleNext}
                backgroundColor="buttonTertiary"
                height={(width * 15) / 100}
                width={(width * 31) / 100}>
                <Box flex={0.5}>
                    <Play scale={0.4} />
                </Box>
            </Button>
        );
    }, [handleNext, modifiedPlayers, selectedPlayer]);
    return (
        <Container style={styles.container}>
            <Header screenName="Assign Role" />
            <Box padding="m" flex={1}>
                <Box flex={1}>
                    <Box alignItems="center" top={(height * 15) / 100}>
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
                            <AppText fontSize={normalize(17)} color="thirdText">
                                Hold to See Your Role.
                            </AppText>
                        )}
                    </Box>
                </Box>
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
        </Container>
    );
};

export default Game;
