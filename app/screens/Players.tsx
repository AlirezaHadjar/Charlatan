import React, {useCallback, useMemo, useRef, useState} from "react";
import {Dimensions, Keyboard, TouchableOpacity} from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";
import {TextInput} from "react-native-gesture-handler";

import Container from "../components/Container";
import Header from "../components/Header";
import Box from "../theme/Box";
import {useSelector} from "../store/useSelector";
import {
    addPlayer,
    editPlayer,
    getPlayers,
    removePlayer,
} from "../store/reducers/data";
import AppText from "../components/Text";
import normalize from "../utils/normalizer";
import Icon from "../components/Icon";
import Plus from "../assets/SVGs/Plus";
import Check from "../assets/SVGs/Check";
import Cross from "../assets/SVGs/Cross";
import List from "../components/list/player/List";
import {useAppDispatch} from "../store/configureStore";
import CustomBackdrop from "../components/CustomBackdrop";
import {LISTITEM_HEIGHT} from "../../SpyHunt";

const {width} = Dimensions.get("window");

const Players: React.FC<{}> = ({}) => {
    const players = useSelector(getPlayers);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const addPlayerSheet = useRef<BottomSheet>(null);
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
                alignItems="center"
                justifyContent="center"
                borderRadius="m">
                <Cross />
            </Box>
        ),
        [],
    );
    const handleEditPlayer = useCallback(
        (text: string, id: string) => {
            dispatch(editPlayer({id, name: text}));
        },
        [dispatch],
    );
    const handleRemovePlayer = useCallback(
        (id: string) => {
            dispatch(removePlayer(id));
        },
        [dispatch],
    );
    const handleAddPlayer = useCallback(() => {
        dispatch(addPlayer(query));
        setQuery("");
        Keyboard.dismiss();
        setTimeout(() => addPlayerSheet.current?.snapTo(0), 1000);
    }, [dispatch, query]);
    return (
        <Container>
            <Header screenName="Players" />
            {players.length === 0 && renderEmptyPlayers()}
            <Box paddingHorizontal="m" flex={1} paddingBottom="m">
                <Box flex={1}>
                    <List
                        items={players}
                        end={itemCross}
                        onChangeText={handleEditPlayer}
                        onEndPress={handleRemovePlayer}
                    />
                </Box>
                <Box alignItems="flex-end">
                    <Icon
                        icon={<Plus />}
                        backgroundColor="danger"
                        onPress={() => addPlayerSheet.current?.snapTo(1)}
                    />
                </Box>
            </Box>
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
                        snapPoints={[0, "20%"]}>
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
                                            placeholder="Enter a Player Name"
                                            value={query}
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
                [handleAddPlayer, query],
            )}
        </Container>
    );
};

export default Players;
