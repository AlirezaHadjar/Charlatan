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
import {useTranslation} from "../../hooks/translation";
import {useLocation} from "../../hooks/useLocation";
import {defaultData} from "../../storage/default";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {getLanguageName} from "../../store/reducers/language";

const {height} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20,
    },
});

const Locations: React.FC = () => {
    const locations = useSelector(getLocations);
    const [bottomSheetVisible, setBottomSheetVisible] = useState(false);
    const translation = useTranslation();
    const dispatch = useAppDispatch();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    const handleAddLocation = useCallback(
        (name: string) => {
            dispatch(addLocation({fa: name, en: name}));
            Keyboard.dismiss();
            setBottomSheetVisible(false);
        },
        [dispatch],
    );
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
                            endDisabled={true}
                            onBlur={handleBlur}
                            endDisableText={
                                translation.Locations.lengthBelowAlert
                            }
                            // onChangeText={handleEditLocation}
                            enabled={false}
                            onEndPress={handleRemoveLocation}
                        />
                    </Box>
                    {/* <Box alignItems="flex-end">
                        <Icon
                            icon={<Plus />}
                            backgroundColor="secondBackground"
                            onPress={handlePlusPress}
                        />
                    </Box> */}
                </Box>
                {/* <InputSheet
                isVisible={bottomSheetVisible}
                onClose={handleBottomSheetClose}
                onSubmit={handleAddLocation}
                disableText={translation.Locations.addTextInputAlert}
                placeholder={translation.Locations.addLocationTextInputPlaceholder}
            /> */}
            </KeyboardAvoidingView>
        </Container>
    );
};

export default Locations;
