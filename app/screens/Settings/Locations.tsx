import React, {useCallback, useMemo, useState} from "react";
import {
    StyleSheet,
    Keyboard,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView,
    Platform,
    Dimensions,
} from "react-native";

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
import {useTranslation} from "../../hooks/translation";
import {useLocation} from "../../hooks/useLocation";
import {defaultData} from "../../storage/default";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {getLanguageName} from "../../store/reducers/language";
import AppTouchable from "../../components/Touchable";
import AppBottomSheet from "../../components/BottomSheet";

const {height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

const Locations: React.FC = () => {
    const locations = useSelector(getLocations);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const languageName = useSelector(getLanguageName);
    const translation = useTranslation();
    const dispatch = useAppDispatch();
    const [query, setQuery] = useState("");
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
    const handleBlur = useCallback(
        (text: string, id: string) => {
            if (text.trim() === "") handleRemoveLocation(id);
            // dispatch();
        },
        [handleRemoveLocation],
    );

    const handleAddLocation = useCallback(() => {
        dispatch(addLocation({fa: query, en: query}));
        setQuery("");
        Keyboard.dismiss();
        setBottomSheetVisible(false);
    }, [dispatch, query]);
    const itemCross = useMemo(
        () => (
            <Box
                width={30}
                height={30}
                backgroundColor="mainTextColor"
                opacity={locations.length <= 5 ? 0.5 : 1}
                alignItems="center"
                justifyContent="center"
                borderRadius="m">
                <Cross />
            </Box>
        ),
        [locations.length],
    );
    const handlePlusPress = useCallback(() => {
        setBottomSheetVisible(true);
    }, []);
    const handleBottomSheetClose = useCallback(() => {
        Keyboard.dismiss();
        setBottomSheetVisible(false);
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
                    <AppText fontSize={normalize(14)} color="thirdText">
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
                            endDisabled={locations.length < 6}
                            onBlur={handleBlur}
                            endDisableText={
                                translation.Locations.lengthBelowAlert
                            }
                            onChangeText={handleEditLocation}
                            onEndPress={handleRemoveLocation}
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
                <AppBottomSheet
                    isVisible={bottomSheetVisible}
                    onClose={handleBottomSheetClose}>
                    <Box
                        width="100%"
                        height={LISTITEM_HEIGHT}
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
                                    translation.Locations
                                        .addLocationTextInputPlaceholder
                                }
                                style={{
                                    fontFamily: "Kalameh Bold",
                                    fontWeight: "normal",
                                    textAlign:
                                        languageName === "en"
                                            ? "left"
                                            : "right",
                                }}
                                value={query}
                                onChangeText={text => setQuery(text)}
                            />
                        </Box>
                        <AppTouchable
                            disabled={query.trim() === ""}
                            disableText={
                                translation.Locations.addTextInputAlert
                            }
                            onPress={handleAddLocation}>
                            <Box
                                width={30}
                                height={30}
                                alignItems="center"
                                justifyContent="center"
                                borderRadius="m"
                                backgroundColor="secondBackground">
                                <Check />
                            </Box>
                        </AppTouchable>
                    </Box>
                </AppBottomSheet>
            </KeyboardAvoidingView>
        </Container>
    );
};

export default Locations;
