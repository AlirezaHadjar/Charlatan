import React, {useCallback, useMemo, useRef, useState} from "react";
import {
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from "react-native";
import BottomSheet, {BottomSheetView} from "@gorhom/bottom-sheet";

import Container from "../../components/Container";
import Header from "../../components/Header";
import List from "../../components/list/location/List";
import {useAppDispatch} from "../../store/configureStore";
import {
    addLocation,
    editLocation,
    getLocations,
    removeLocation,
    setLocations,
} from "../../store/reducers/data";
import {useSelector} from "../../store/useSelector";
import Cross from "../../assets/SVGs/Cross";
import Plus from "../../assets/SVGs/Plus";
import Check from "../../assets/SVGs/Check";
import Box from "../../theme/Box";
import Icon from "../../components/Icon";
import {LISTITEM_HEIGHT} from "../../../SpyHunt";
import CustomBackdrop from "../../components/CustomBackdrop";
import {useTranslation} from "../../hooks/translation";
import {useLocation} from "../../hooks/useLocation";
import {defaultData} from "../../storage/default";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";

const {height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

const Locations: React.FC<{}> = ({}) => {
    const locations = useSelector(getLocations);
    const translation = useTranslation();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
    const addLocationSheet = useRef<BottomSheet>(null);
    const textInputRef = useRef<TextInput>(null);
    const handleEditLocation = useCallback(
        (text: string, id: string) => {
            dispatch(editLocation({id, name: {fa: text, en: text}}));
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
        dispatch(addLocation({fa: query, en: query}));
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
                opacity={locations.length < 5 ? 0.3 : 1}
                alignItems="center"
                justifyContent="center"
                borderRadius="m">
                <Cross />
            </Box>
        ),
        [locations.length],
    );
    const handlePlusPress = useCallback(() => {
        textInputRef.current?.focus();
        setTimeout(() => addLocationSheet.current?.snapTo(1), 500);
    }, []);
    const snapPoints = useMemo(() => {
        const second = Platform.OS === "ios" ? "55%" : "25%";
        return [0, second];
    }, []);
    const renderResetButton = useCallback(
        () => (
            <TouchableOpacity
                onPress={() => dispatch(setLocations(defaultData.locations))}>
                <Box
                    borderRadius="hero1"
                    height={(height * 4) / 100}
                    alignItems="center"
                    justifyContent="space-between"
                    flexDirection="row"
                    paddingHorizontal="s"
                    backgroundColor="buttonSecondary">
                    <AppText fontSize={normalize(14)}>
                        {translation.Locations.reset}
                    </AppText>
                </Box>
            </TouchableOpacity>
        ),
        [dispatch, translation.Locations.reset],
    );

    useLocation(locations);

    return (
        <Container style={styles.container}>
            <Header
                screenName={translation.Locations.header}
                end={renderResetButton()}
            />
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={{flex: 1}}>
                <Box paddingHorizontal="s" flex={1} paddingBottom="m">
                    <Box flex={1}>
                        <List
                            items={locations}
                            end={itemCross}
                            endDisabled={locations.length < 5}
                            onChangeText={handleEditLocation}
                            onEndPress={handleRemoveLocation}
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
                {useMemo(
                    () => (
                        <BottomSheet
                            backdropComponent={(props) => (
                                <CustomBackdrop
                                    onPress={() => {
                                        textInputRef.current?.blur();
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
                                                    translation.Locations
                                                        .addLocationTextInputPlaceholder
                                                }
                                                ref={textInputRef}
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
                                                backgroundColor="danger">
                                                <Check />
                                            </Box>
                                        </TouchableOpacity>
                                    </Box>
                                </Box>
                            </BottomSheetView>
                        </BottomSheet>
                    ),
                    [
                        handleAddLocation,
                        query,
                        snapPoints,
                        translation.Locations.addLocationTextInputPlaceholder,
                    ],
                )}
            </KeyboardAvoidingView>
        </Container>
    );
};

export default Locations;