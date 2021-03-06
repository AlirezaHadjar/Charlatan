import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import {StyleSheet, Dimensions} from "react-native";
import {useTheme} from "@shopify/restyle";

import Container from "../components/Container";
import Box from "../theme/Box";
import AppText from "../components/Text";
import normalize from "../utils/normalizer";
import Button from "../components/Button";
import Play from "../assets/SVGs/Play";
import Icon from "../components/Icon";
import {ThemeType} from "../theme/Theme";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface MainProps {}

// const styles = StyleSheet.create({
//     Container: {
//         // backgroundColor: "red",
//     },
// });

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const {height, width} = Dimensions.get("window");

const Main: React.FC<MainProps> = ({}) => {
    const theme = useTheme<ThemeType>();
    return (
        <Container
            alignItems="center"
            paddingBottom="lxl"
            paddingHorizontal="ml">
            <Box>
                <AppText fontSize={normalize(80)}>Spy Hunt!</AppText>
            </Box>
            <Box position="absolute" top="65%">
                <Button
                    title=""
                    variant="simple"
                    icon={<Play />}
                    alignSelf="center"
                />
            </Box>
            <Box
                position="absolute"
                bottom={theme.spacing.m + theme.spacing.s}
                width="100%"
                flexDirection="row-reverse"
                justifyContent="space-between">
                <Icon />
                <Icon />
            </Box>
        </Container>
    );
};

export default Main;
