import React, {useCallback} from "react";
import {StyleSheet} from "react-native";
// eslint-disable-next-line import/no-extraneous-dependencies
import {CompositeNavigationProp, RouteProp} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Citizen from "../../assets/SVGs/Citizen";
import Spy from "../../assets/SVGs/Spy";
import Box from "../../theme/Box";
import {useSelector} from "../../store/useSelector";
import {getGameResult} from "../../store/reducers/data";
import {Winners} from "../../types";
import AppText from "../../components/Text";
import normalize from "../../utils/normalizer";
import {useTranslation} from "../../hooks/translation";
import {GameRoutes} from "../../navigations/GameNavigator";
import {AppRoute} from "../../navigations/AppNavigator";

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<GameRoutes, "AssignRole">,
    StackNavigationProp<AppRoute>
>;

export type ResultProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const styles = StyleSheet.create({
    container: {},
});

const Result: React.FC<ResultProps> = ({navigation}) => {
    const translation = useTranslation();
    const gameResult = useSelector(getGameResult);
    const renderWinnerText = () => {
        const text =
            gameResult.winner === Winners.Spies
                ? translation.Result.spies
                : translation.Result.citizens;
        return (
            <Box>
                <AppText textAlign="center" fontSize={normalize(60)}>
                    {text}
                </AppText>
                <Box marginTop="s">
                    <AppText textAlign="center" fontSize={normalize(25)}>
                        {translation.Result.winningText}
                    </AppText>
                </Box>
            </Box>
        );
    };
    const handleBackButtonPress = useCallback(() => {
        navigation.navigate("Main");
    }, [navigation]);
    return (
        <Container style={styles.container}>
            <Header
                screenName={translation.Result.header}
                onBackPress={handleBackButtonPress}
            />
            <Box alignItems="center" flex={1} paddingTop="lxl">
                {renderWinnerText()}
                <Box bottom={0} position="absolute">
                    {gameResult.winner === Winners.Citizens ? (
                        <Citizen />
                    ) : (
                        <Spy />
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default Result;
