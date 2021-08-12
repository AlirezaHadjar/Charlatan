import React, {useCallback, useMemo, useState} from "react";
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import {useDispatch} from "react-redux";
import {TextInput} from "react-native-gesture-handler";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Box from "../../theme/Box";
import {useSelector} from "../../store/useSelector";
import {
    addPlayer,
    editPlayer,
    getPlayers,
    removePlayer,
} from "../../store/reducers/data";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import Icon from "../../components/Icon";
import Plus from "../../assets/SVGs/Plus";
import Check from "../../assets/SVGs/Check";
import Cross from "../../assets/SVGs/Cross";
import List from "../../components/list/player/List";
import {useTranslation} from "../../hooks/translation";
import {usePlayer} from "../../hooks/usePlayer";
import {getLanguageName} from "../../store/reducers/language";
import AppTouchable from "../../components/Touchable";
import AppBottomSheet from "../../components/BottomSheet";

const {width} = Dimensions.get("window");

const Players: React.FC = () => {
    const players = useSelector(getPlayers);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const languageName = useSelector(getLanguageName);
    const translation = useTranslation();
    const dispatch = useDispatch();
    const [query, setQuery] = useState("");

    usePlayer(players);

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
                opacity={players.length <= 3 ? 0.3 : 1}
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
            dispatch(removePlayer(id));
        },
        [dispatch],
    );
    const handleBlur = useCallback(
        (text: string, id: string) => {
            if (text.trim() === "") handleRemovePlayer(id);
        },
        [handleRemovePlayer],
    );
    const handleAddPlayer = useCallback(() => {
        dispatch(addPlayer({en: query, fa: query}));
        setQuery("");
        setBottomSheetVisible(false);
    }, [dispatch, query]);
    const handlePlusPress = useCallback(() => {
        setBottomSheetVisible(true);
    }, []);
    const handleBottomSheetClose = useCallback(() => {
        Keyboard.dismiss();
        setBottomSheetVisible(false);
    }, []);
    return (
        <Container>
            <Header screenName={translation.Players.header} />
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
                            endDisableText={
                                translation.Players.lengthBelowAlert
                            }
                            onChangeText={handleEditPlayer}
                            onBlur={handleBlur}
                            onEndPress={handleRemovePlayer}
                        />
                    </Box>
                    <Box alignItems="flex-end">
                        <Icon
                            icon={<Plus />}
                            backgroundColor="secondBackground"
                            onPress={handlePlusPress}
                        />
                    </Box>
                </Box>
            </KeyboardAvoidingView>
            <AppBottomSheet
                isVisible={bottomSheetVisible}
                onClose={handleBottomSheetClose}>
                <Box
                    width="100%"
                    borderRadius="l"
                    justifyContent="center"
                    flexDirection={
                        languageName === "en" ? "row" : "row-reverse"
                    }
                    paddingHorizontal="m"
                    alignItems="center"
                    borderWidth={1}>
                    <Box flex={1}>
                        <TextInput
                            maxLength={15}
                            placeholder={
                                translation.Players
                                    .addPlayerTextInputPlaceholder
                            }
                            style={{
                                fontFamily: "Kalameh Bold",
                                fontWeight: "normal",
                                width: "100%",
                                textAlign:
                                    languageName === "en" ? "left" : "right",
                            }}
                            value={query}
                            onChangeText={text => setQuery(text)}
                        />
                    </Box>
                    <AppTouchable
                        onPress={handleAddPlayer}
                        disabled={query.trim() === ""}
                        disableText={translation.Players.addTextInputAlert}>
                        <Box
                            width={30}
                            height={30}
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="m"
                            backgroundColor="mainTextColor">
                            <Check />
                        </Box>
                    </AppTouchable>
                </Box>
            </AppBottomSheet>
        </Container>
    );
};

export default Players;
