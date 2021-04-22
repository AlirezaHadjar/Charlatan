import React from "react";
import {Dimensions, PixelRatio} from "react-native";

import Container from "../components/Container";
import Header from "../components/Header";
import AppText from "../components/Text";
import Box from "../theme/Box";
import normalize from "../utils/normalizer";

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get("window");
const PIXEL_RATIO = PixelRatio.get();

// eslint-disable-next-line @typescript-eslint/ban-types
const Test: React.FC<{}> = ({}) => {
    return (
        <Container>
            <Header screenName="Details" />
            <Box flex={1} justifyContent="center" alignItems="center">
                <AppText>{`Screen Height: ${SCREEN_HEIGHT}`}</AppText>
                <AppText>{`Screen Width: ${SCREEN_WIDTH}`}</AppText>
                <AppText>{`Pixel Ratio: ${PIXEL_RATIO}`}</AppText>
                <AppText>{`Font Size of 20: ${normalize(20)}`}</AppText>
                <AppText>{`Font Size of 20: ${PixelRatio.getPixelSizeForLayoutSize(
                    SCREEN_HEIGHT,
                )}`}</AppText>
            </Box>
        </Container>
    );
};

export default Test;
