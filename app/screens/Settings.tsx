import React from "react";
import {StyleSheet, ScrollView} from "react-native";

import Container from "../components/Container";
import Header from "../components/Header";
import Item from "../components/list/settings/Item";
import Box from "../theme/Box";
import Players from "../assets/SVGs/Players";
import Pin from "../assets/SVGs/Pin";
import Clock from "../assets/SVGs/Clock";
import Person from "../assets/SVGs/Person";
import Language from "../assets/SVGs/Language";
import {useTranslation} from "../hooks/translation";
import {RootStackParamList} from "../navigations/types";

const styles = StyleSheet.create({
    container: {},
});

interface Data {
    title: string;
    icon: JSX.Element;
    screen: keyof RootStackParamList;
}

interface Section {
    data: Data[];
}

const Settings: React.FC = () => {
    const translation = useTranslation();

    const sections: Section[] = [
        {
            data: [
                {
                    title: translation.Settings.players,
                    icon: <Players />,
                    screen: "Players",
                },
                {
                    title: translation.Settings.locations,
                    icon: <Pin />,
                    screen: "Locations",
                },
                {
                    title: translation.Settings.time,
                    icon: <Clock />,
                    screen: "Time",
                },
            ],
        },
        {
            data: [
                // {
                //     title: translation.Settings.changeTheme,
                //     icon: <Players />,
                //     screen: <Pallet />,
                // },
                {
                    title: translation.Settings.changeLanguage,
                    icon: <Language />,
                    screen: "Language",
                },
                {
                    title: translation.Settings.aboutUs,
                    icon: <Person />,
                    screen: "AboutUs",
                },
            ],
        },
    ];
    return (
        <Container style={styles.container}>
            <Header screenName={translation.Settings.title} />
            <ScrollView>
                <Box paddingHorizontal="m" flex={1}>
                    {sections.map((section, index) => (
                        <Box
                            key={index}
                            marginVertical="xl"
                            borderRadius="xl"
                            overflow="hidden">
                            {section.data.map(item => (
                                <Item
                                    key={item.title}
                                    title={item.title}
                                    icon={item.icon}
                                    screen={item.screen}
                                />
                            ))}
                        </Box>
                    ))}
                </Box>
            </ScrollView>
        </Container>
    );
};

export default Settings;
