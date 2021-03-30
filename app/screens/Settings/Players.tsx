import React, {useCallback, useMemo, useRef, useState} from "react";
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    TextInput,
    TouchableOpacity,
} from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import {useTheme} from "@shopify/restyle";
import {useDispatch} from "react-redux";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Box from "../../theme/Box";
import {useSelector} from "../../store/useSelector";
import {
    addPlayer,
    editPlayer,
    getPlayers,
    getSpiesLength,
    removePlayer,
    setSpiesLength,
} from "../../store/reducers/data";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import Icon from "../../components/Icon";
import Plus from "../../assets/SVGs/Plus";
import Minus from "../../assets/SVGs/Minus";
import Check from "../../assets/SVGs/Check";
import Cross from "../../assets/SVGs/Cross";
import List from "../../components/list/player/List";
import {useTranslation} from "../../hooks/translation";
import CustomBackdrop from "../../components/CustomBackdrop";
import {LISTITEM_HEIGHT} from "../../../SpyHunt";
import {ThemeType} from "../../theme/Theme";
import {usePlayer} from "../../hooks/usePlayer";
import {useSpy} from "../../hooks/useSpy";

const {width, height} = Dimensions.get("window");

const Players: React.FC<{}> = ({}) => {
    const players = useSelector(getPlayers);
    const spiesLength = useSelector(getSpiesLength);
    const translation = useTranslation();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");
    const theme = useTheme<ThemeType>();
    const textInputRef = useRef<TextInput>(null);
    const addPlayerSheet = useRef<BottomSheet>(null);
    const spiesLengthSheet = useRef<BottomSheet>(null);

    const styles = StyleSheet.create({
        boxContainer: {
            width: (width * 10) / 100,
            height: (width * 10) / 100,
            backgroundColor: theme.colors.light,
            borderRadius: theme.borderRadii.m,
            marginHorizontal: theme.spacing.m,
            alignItems: "center",
            justifyContent: "center",
        },
        disabled: {
            backgroundColor: theme.colors.lightGrey,
        },
    });

    usePlayer(players);
    useSpy(spiesLength);

    const renderEmptyPlayers = useCallback(
        () => (
            <Box
                width="100%"
                alignItems="center"
                justifyContent="center"
                top="20%"
                flex={1}>
                <Box
                    backgroundColor="secondBackground"
                    width={(width * 37) / 100}
                    height={(width * 37) / 100}
                    alignItems="center"
                    marginBottom="m"
                    justifyContent="center"
                    style={{borderRadius: (width * 37) / 100}}>
                    <AppText fontSize={normalize(60)}>!</AppText>
                </Box>
                <AppText fontSize={normalize(28)}>There is no player!</AppText>
                <AppText>Tap + to add a player.</AppText>
            </Box>
        ),
        [],
    );
    const itemCross = useMemo(
        () => (
            <Box
                width={30}
                height={30}
                backgroundColor="mainTextColor"
                opacity={players.length < 4 ? 0.3 : 1}
                alignItems="center"
                justifyContent="center"
                borderRadius="m">
                <Cross />
            </Box>
        ),
        [players.length],
    );

    const handleEditPlayer = useCallback(
        (text: string, id: string) => {
            dispatch(editPlayer({id, name: {fa: text, en: text}}));
        },
        [dispatch],
    );
    const handleRemovePlayer = useCallback(
        (id: string) => {
            const maxSpiesLength = Math.floor((players.length - 1) / 3);
            dispatch(removePlayer(id));
            console.log(spiesLength, maxSpiesLength);
            if (spiesLength > maxSpiesLength)
                dispatch(setSpiesLength(maxSpiesLength));
        },
        [dispatch, players.length, spiesLength],
    );
    const handleAddPlayer = useCallback(() => {
        dispatch(addPlayer({en: query, fa: query}));
        setQuery("");
        Keyboard.dismiss();
        setTimeout(() => addPlayerSheet.current?.snapTo(0), 1000);
    }, [dispatch, query]);
    const renderSpiesButton = useCallback(
        () => (
            <TouchableOpacity
                onPress={() => spiesLengthSheet.current?.snapTo(1)}>
                <Box
                    borderRadius="hero1"
                    height={(height * 4) / 100}
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                    paddingHorizontal="s"
                    backgroundColor="buttonSecondary">
                    <Box
                        borderRadius="hero1"
                        backgroundColor="danger"
                        marginEnd="s"
                        paddingHorizontal="s">
                        <AppText>{spiesLength}</AppText>
                    </Box>
                    <AppText fontSize={normalize(15)}>
                        {spiesLength > 1
                            ? translation.Players.Spies
                            : translation.Players.Spy}
                    </AppText>
                </Box>
            </TouchableOpacity>
        ),
        [spiesLength, translation.Players.Spies, translation.Players.Spy],
    );
    const handlePlusPress = useCallback(() => {
        textInputRef.current?.focus();
        setTimeout(() => addPlayerSheet.current?.snapTo(1), 500);
    }, []);
    const snapPoints = useMemo(() => {
        const second = Platform.OS === "ios" ? "55%" : "25%";
        return [0, second];
    }, []);
    return (
        <Container>
            <Header
                screenName={translation.Players.header}
                end={renderSpiesButton()}
            />
            {players.length === 0 && renderEmptyPlayers()}
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{flex: 1}}>
                <Box paddingHorizontal="m" flex={1} paddingBottom="m">
                    <Box flex={1}>
                        <List
                            items={players}
                            end={itemCross}
                            endDisabled={players.length < 4}
                            onChangeText={handleEditPlayer}
                            onEndPress={handleRemovePlayer}
                        />
                    </Box>
                    <Box alignItems="flex-end">
                        <Icon
                            icon={<Plus />}
                            backgroundColor="danger"
                            onPress={handlePlusPress}
                        />
                    </Box>
                </Box>
            </KeyboardAvoidingView>
            {useMemo(
                () => (
                    <BottomSheet
                        backdropComponent={(props) => (
                            <CustomBackdrop
                                onPress={() => {
                                    setTimeout(
                                        () =>
                                            addPlayerSheet.current?.collapse(),
                                        200,
                                    );
                                }}
                                animatedIndex={props.animatedIndex}
                                animatedPosition={props.animatedPosition}
                                style={props.style}
                            />
                        )}
                        ref={addPlayerSheet}
                        snapPoints={snapPoints}>
                        <BottomSheetView>
                            <Box padding="m" width="100%" flex={1}>
                                <Box
                                    width="100%"
                                    height={LISTITEM_HEIGHT}
                                    borderRadius="l"
                                    justifyContent="center"
                                    flexDirection="row"
                                    paddingHorizontal="m"
                                    alignItems="center"
                                    borderWidth={1}>
                                    <Box flex={1}>
                                        <TextInput
                                            placeholder={
                                                translation.Players
                                                    .addPlayerTextInputPlaceholder
                                            }
                                            value={query}
                                            ref={textInputRef}
                                            onChangeText={(text) =>
                                                setQuery(text)
                                            }
                                        />
                                    </Box>
                                    <TouchableOpacity onPress={handleAddPlayer}>
                                        <Box
                                            width={30}
                                            height={30}
                                            alignItems="center"
                                            justifyContent="center"
                                            borderRadius="m"
                                            backgroundColor="mainTextColor">
                                            <Check />
                                        </Box>
                                    </TouchableOpacity>
                                </Box>
                            </Box>
                        </BottomSheetView>
                    </BottomSheet>
                ),
                [
                    handleAddPlayer,
                    query,
                    snapPoints,
                    translation.Players.addPlayerTextInputPlaceholder,
                ],
            )}
            {useMemo(
                () => (
                    <BottomSheet
                        backdropComponent={(props) => (
                            <CustomBackdrop
                                onPress={() => {
                                    setTimeout(
                                        () =>
                                            spiesLengthSheet.current?.collapse(),
                                        200,
                                    );
                                }}
                                animatedIndex={props.animatedIndex}
                                animatedPosition={props.animatedPosition}
                                style={props.style}
                            />
                        )}
                        ref={spiesLengthSheet}
                        snapPoints={[0, "30%"]}
                        backgroundComponent={() => <Box />}
                        style={{backgroundColor: theme.colors.danger}}>
                        <BottomSheetView style={{flex: 1}}>
                            <Box
                                padding="m"
                                width="100%"
                                flex={1}
                                alignItems="center">
                                <AppText color="light">
                                    {translation.Players.spiesBottomSheetTitle}
                                </AppText>
                                <BottomSheetView
                                    style={{
                                        flexDirection: "row",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        flex: 1,
                                    }}>
                                    <TouchableOpacity
                                        disabled={spiesLength < 2}
                                        onPress={() => {
                                            dispatch(
                                                setSpiesLength(spiesLength - 1),
                                            );
                                        }}
                                        style={[
                                            styles.boxContainer,
                                            spiesLength < 2
                                                ? styles.disabled
                                                : {},
                                        ]}>
                                        <Minus color="secondText" scale={0.9} />
                                    </TouchableOpacity>
                                    <AppText
                                        color="light"
                                        fontSize={normalize(70)}>
                                        {spiesLength}
                                    </AppText>
                                    <TouchableOpacity
                                        disabled={
                                            spiesLength >=
                                            Math.floor(players.length / 3)
                                        }
                                        onPress={() => {
                                            dispatch(
                                                setSpiesLength(spiesLength + 1),
                                            );
                                        }}
                                        style={[
                                            styles.boxContainer,
                                            spiesLength >=
                                            Math.floor(players.length / 3)
                                                ? styles.disabled
                                                : {},
                                        ]}>
                                        <Plus color="secondText" scale={0.9} />
                                    </TouchableOpacity>
                                </BottomSheetView>
                            </Box>
                        </BottomSheetView>
                    </BottomSheet>
                ),
                [
                    dispatch,
                    players.length,
                    spiesLength,
                    styles.boxContainer,
                    styles.disabled,
                    theme.colors.danger,
                    translation.Players.spiesBottomSheetTitle,
                ],
            )}
        </Container>
    );
};

export default Players;
