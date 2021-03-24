import React from "react";

import Container from "../components/Container";
import Header from "../components/Header";
import Picker from "../components/Picker";
import AppText from "../components/Text";
import Box from "../theme/Box";

const renderMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i++) minutes.push({id: `${i}`, title: `${i}`});
    return minutes;
};

const Time: React.FC<{}> = ({}) => {
    return (
        <Container>
            <Header screenName="Time" />
            <Box paddingHorizontal="m" flex={1}>
                <Box flexDirection="row" top="50%">
                    <Box flex={1} alignItems="center">
                        <AppText>Minutes</AppText>
                        <Picker items={renderMinutes()} />
                    </Box>
                    <Box flex={1} alignItems="center">
                        <AppText>Seconds</AppText>
                        <Picker items={renderMinutes()} />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Time;
