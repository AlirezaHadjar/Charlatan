import React, {useCallback, useMemo, useRef, useState} from "react";
import {StyleSheet, Keyboard, TouchableOpacity, TextInput} from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";

import Container from "../components/Container";
import Header from "../components/Header";
import List from "../components/list/location/List";
import {useAppDispatch} from "../store/configureStore";
import {
    addLocation,
    editLocation,
    getLocations,
    removeLocation,
} from "../store/reducers/data";
import {useSelector} from "../store/useSelector";
import Cross from "../assets/SVGs/Cross";
import Plus from "../assets/SVGs/Plus";
import Check from "../assets/SVGs/Check";
import Box from "../theme/Box";
import Icon from "../components/Icon";
import {LISTITEM_HEIGHT} from "../../SpyHunt";
import CustomBackdrop from "../components/CustomBackdrop";

const styles = StyleSheet.create({
    container: {},
});

const Locations: React.FC<{}> = ({}) => {
    const locations = useSelector(getLocations);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const addLocationSheet = useRef<BottomSheet>(null);
    const handleEditLocation = useCallback(
        (text: string, id: string) => {
            dispatch(editLocation({id, name: text}));
        },
        [dispatch],
    );
    const handleRemoveLocation = useCallback(
        (id: string) => {
            dispatch(removeLocation(id));
        },
        [dispatch],
    );
    const handleAddLocation = useCallback(() => {
        dispatch(addLocation(query));
        setQuery("");
        Keyboard.dismiss();
        setTimeout(() => addLocationSheet.current?.snapTo(0), 1000);
    }, [dispatch, query]);
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
    return (
        <Container style={styles.container}>
            <Header screenName="Locations" />
            <Box paddingHorizontal="m" flex={1} paddingBottom="m">
                <Box flex={1}>
                    <List
                        items={locations}
                        end={itemCross}
                        onChangeText={handleEditLocation}
                        onEndPress={handleRemoveLocation}
                    />
                </Box>
                <Box alignItems="flex-end">
                    <Icon
                        icon={<Plus />}
                        backgroundColor="danger"
                        onPress={() => addLocationSheet.current?.snapTo(1)}
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
                                            addLocationSheet.current?.collapse(),
                                        200,
                                    );
                                }}
                                animatedIndex={props.animatedIndex}
                                animatedPosition={props.animatedPosition}
                                style={props.style}
                            />
                        )}
                        ref={addLocationSheet}
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
                                    <TouchableOpacity
                                        onPress={handleAddLocation}>
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
                [handleAddLocation, query],
            )}
        </Container>
    );
};

export default Locations;
