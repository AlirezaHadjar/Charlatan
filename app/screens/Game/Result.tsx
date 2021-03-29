import React from "react";
import {StyleSheet, Dimensions} from "react-native";
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

export interface ResultProps {}

const {height, width} = Dimensions.get("window");

const styles = StyleSheet.create({
    container: {},
});

const Result: React.FC<ResultProps> = ({}) => {
    const gameResult = useSelector(getGameResult);
    const renderWinnerText = () => {
        const text = gameResult.winner === Winners.Spies ? "Spies" : "Citizens";
        return (
            <Box>
                <AppText textAlign="center" fontSize={normalize(60)}>
                    {text}
                </AppText>
                <Box marginTop="s">
                    <AppText textAlign="center" fontSize={normalize(25)}>
                        Won the Game!
                    </AppText>
                </Box>
            </Box>
        );
    };
    return (
        <Container style={styles.container}>
            <Header screenName="Result" />
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
