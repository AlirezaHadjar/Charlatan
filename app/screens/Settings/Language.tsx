import React, {useEffect, useState} from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Box from "../../theme/Box";
import {LISTITEM_HEIGHT} from "../../../SpyHunt";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {useSelector} from "../../store/useSelector";
import {getLanguageName, setLanguage} from "../../store/reducers/language";
import {languageDatas} from "../../language";
import {useAppDispatch} from "../../store/configureStore";
import {getLanguageFlag} from "../../utils/language";
import {useLanguage} from "../../hooks/useLanguage";
import {useTranslation} from "../../hooks/translation";

const HEIGHT = 1.5 * LISTITEM_HEIGHT;

const AnimatedBox = Animated.createAnimatedComponent(Box);

const styles = StyleSheet.create({
    container: {},
});

const findHeight = (selectedLanguage: string, languages: string[]) => {
    const index = languages.findIndex(
        language => language === selectedLanguage,
    );
    if (index === -1) return -HEIGHT;
    return index * HEIGHT;
};
const languages: (keyof typeof languageDatas)[] = Object.keys(
    languageDatas,
) as Array<keyof typeof languageDatas>;

const Language: React.FC = ({}) => {
    const translation = useTranslation();
    const languageState = useSelector(getLanguageName);
    const [language, setLanguageState] = useState(languageState);
    const translationY = useSharedValue(-HEIGHT);
    const dispatch = useAppDispatch();

    useLanguage(language);

    useEffect(() => {
        dispatch(setLanguage(language));
    }, [dispatch, language]);

    useEffect(() => {
        const height = findHeight(language, languages);
        translationY.value = withSpring(height);
    }, [language, translationY.value]);
    const animatedStyles = useAnimatedStyle(() => {
        return {
            transform: [{translateY: translationY.value}],
        };
    }, [translationY.value]);

    return (
        <Container style={styles.container}>
            <Header screenName={translation.Language.title} />
            <Box flex={1} paddingHorizontal="m">
                <Box
                    borderRadius="xl"
                    overflow="hidden"
                    backgroundColor="thirdBackground">
                    {languages.map(language => (
                        <TouchableOpacity
                            key={language}
                            onPress={() => setLanguageState(language)}>
                            <Box
                                width="100%"
                                height={HEIGHT}
                                paddingHorizontal="m"
                                flexDirection="row"
                                alignItems="center">
                                <Box paddingEnd="m">
                                    {getLanguageFlag(language)}
                                </Box>
                                <AppText fontSize={normalize(26)}>
                                    {translation.Language.languages[language]}
                                </AppText>
                            </Box>
                        </TouchableOpacity>
                    ))}
                    <AnimatedBox
                        width="100%"
                        height={HEIGHT}
                        paddingHorizontal="m"
                        flexDirection="row"
                        alignItems="center"
                        backgroundColor="secondBackground"
                        style={animatedStyles}
                        zIndex={-1}
                        position="absolute"
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Language;
