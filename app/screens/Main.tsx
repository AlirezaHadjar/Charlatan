import React, {useEffect} from "react";
import {useTheme} from "@shopify/restyle";
import {useFocusEffect} from "@react-navigation/native";

import Box from "../theme/Box";
import AppText from "../components/Text";
import Button from "../components/Button";
import normalize from "../utils/normalizer";
import Play from "../assets/SVGs/Play";
import Cog from "../assets/SVGs/Cog";
import Question from "../assets/SVGs/Question";
import Icon from "../components/Icon";
import {ThemeType} from "../theme/Theme";
import {useTranslation} from "../hooks/translation";
import {useAppDispatch} from "../store/configureStore";
import {resetGame, setActiveGameId} from "../store/reducers/data";
import AnimatedContainer from "../components/AnimatedContainer";
import Animatable from "../components/Animatable";
import {RootStackProps} from "../navigations/types";

export type MainProps = RootStackProps<"Main">;

const Main: React.FC<MainProps> = ({navigation}) => {
    const theme = useTheme<ThemeType>();
    const translation = useTranslation();
    // const {toggle} = useDarkTheme();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(resetGame());
    }, [dispatch]);

    useFocusEffect(() => {
        dispatch(setActiveGameId(""));
    });

    return (
        <AnimatedContainer
            hasIcon
            alignItems="center"
            paddingBottom="lxl"
            paddingHorizontal="ml">
            <Box top="5%">
                <AppText fontSize={normalize(55)} variant="bold">
                    {translation.Main.title}
                </AppText>
            </Box>
            <Box position="absolute" top="29%">
                <Animatable>
                    <Button
                        title=""
                        variant="icon"
                        scaleTo={0.95}
                        icon={<Play />}
                        borderRadius="hero3"
                        alignSelf="center"
                        onPress={() => navigation.navigate("SelectGame")}
                    />
                </Animatable>
            </Box>
            <Box
                position="absolute"
                bottom={theme.spacing.m + theme.spacing.s}
                width="100%">
                <Box
                    width="100%"
                    flexDirection="row-reverse"
                    justifyContent="space-between">
                    <Icon
                        icon={<Question />}
                        onPress={() => navigation.navigate("Guide")}
                    />
                    <Box flexDirection="row" flex={1}>
                        <Icon
                            icon={<Cog />}
                            onPress={() => navigation.navigate("Settings")}
                        />
                    </Box>
                </Box>
            </Box>
        </AnimatedContainer>
    );
};

export default Main;
