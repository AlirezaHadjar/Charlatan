import React from "react";
import {Linking, ScrollView, TouchableOpacity} from "react-native";

import Container from "../../components/Container";
import Header from "../../components/Header";
import {useTranslation} from "../../hooks/translation";
import Box from "../../theme/Box";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import Email from "../../assets/SVGs/Email";
import {useSelector} from "../../store/useSelector";
import {getLanguageName} from "../../store/reducers/language";

const version = require("../../../package.json")?.version;

const email = "charlatan.game@gmail.com";

const AboutUs: React.FC = () => {
    const translation = useTranslation();
    const language = useSelector(getLanguageName);

    const data = [
        {
            title: translation.AboutUs.developer,
            email: "asiahadjar@gmail.com",
            name: translation.AboutUs.alirezaHadjar,
        },
        {
            name: translation.AboutUs.mohammadMahmoudi,
            email: "smMahmoudi16@gmail.com",
            title: translation.AboutUs.uiDesigner,
        },
    ];

    const handleEmail = async (email: string) => {
        const url = `mailto:${email}`;

        const canOpen = await Linking.canOpenURL(url);
        if (!canOpen) return;
        return Linking.openURL(url);
    };

    return (
        <Container>
            <Header screenName={translation.AboutUs.title} />
            <Box paddingHorizontal="m" flex={1}>
                <ScrollView contentContainerStyle={{flex: 1}}>
                    <Box
                        padding="m"
                        flex={1}
                        borderRadius="xl"
                        backgroundColor="thirdBackground">
                        <Box flex={1}>
                            {data.map(person => (
                                <Box
                                    alignItems="flex-start"
                                    marginBottom="m"
                                    key={person.name}>
                                    <Box>
                                        <AppText fontSize={normalize(26)}>
                                            {person.title}:
                                        </AppText>
                                    </Box>
                                    <Box
                                        alignItems="flex-start"
                                        marginVertical="s">
                                        <AppText>{person.name}</AppText>
                                        <TouchableOpacity
                                            onPress={() =>
                                                handleEmail(person.email)
                                            }>
                                            <AppText textDecorationLine="underline">
                                                {person.email}
                                            </AppText>
                                        </TouchableOpacity>
                                    </Box>
                                </Box>
                            ))}
                            <Box
                                flexDirection="row"
                                alignItems="center"
                                marginVertical="m">
                                <Box marginEnd="m">
                                    <Email />
                                </Box>
                                <TouchableOpacity
                                    onPress={() => handleEmail(email)}>
                                    <AppText textDecorationLine="underline">
                                        {email}
                                    </AppText>
                                </TouchableOpacity>
                            </Box>
                        </Box>
                        <Box alignSelf="center">
                            <AppText>{`${translation.AboutUs.version} ${version}`}</AppText>
                        </Box>
                    </Box>
                </ScrollView>
            </Box>
        </Container>
    );
};

export default AboutUs;
