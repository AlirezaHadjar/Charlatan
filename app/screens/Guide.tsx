import React from "react";
import {Dimensions, ScrollView} from "react-native";

import Container from "../components/Container";
import Header from "../components/Header";
import AppText from "../components/Text";
import Box from "../theme/Box";
import {useTranslation} from "../hooks/translation";

const {height} = Dimensions.get("window");

const Guide: React.FC = () => {
    const translation = useTranslation();
    return (
        <Container>
            <Header screenName={translation.Guide.header} />
            <Box paddingHorizontal="m" flex={1}>
                <Box
                    backgroundColor="thirdBackground"
                    width="100%"
                    borderTopEndRadius="hero1"
                    borderTopStartRadius="hero1"
                    padding="m"
                    flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <AppText
                            lineHeight={(height * 3.2) / 100}
                            variant="regular">
                            {translation.Guide.text}
                        </AppText>
                    </ScrollView>
                </Box>
            </Box>
        </Container>
    );
};

export default Guide;
