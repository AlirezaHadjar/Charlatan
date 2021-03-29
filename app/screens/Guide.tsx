import React from "react";
import {ScrollView} from "react-native";

import Container from "../components/Container";
import Header from "../components/Header";
import AppText from "../components/Text";
import Box from "../theme/Box";
import {useTranslation} from "../hooks/translation";

const Guide: React.FC<{}> = ({}) => {
    const translation = useTranslation();
    return (
        <Container>
            <Header screenName={translation.Guide.header} />
            <Box paddingHorizontal="m" flex={1}>
                <Box
                    backgroundColor="secondBackground"
                    width="100%"
                    borderTopEndRadius="hero1"
                    borderTopStartRadius="hero1"
                    padding="m"
                    flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <AppText lineHeight={30}>
                            {translation.Guide.text}
                        </AppText>
                    </ScrollView>
                </Box>
            </Box>
        </Container>
    );
};

export default Guide;
