import {useNavigation} from "@react-navigation/core";
import React from "react";
import {Dimensions, TouchableOpacity} from "react-native";

import ArrowLeft from "../assets/SVGs/ArrowLeft";
import Box from "../theme/Box";
import normalize from "../utils/normalizer";

import AppText from "./Text";

export interface HeaderProps {
    end?: JSX.Element;
    screenName: string;
}

const {height} = Dimensions.get("window");

const Header: React.FC<HeaderProps> = ({end, screenName}) => {
    const navigation = useNavigation();
    return (
        <Box
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="m"
            height={(height * 10) / 100}>
            <Box flex={1}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Box flexDirection="row" alignItems="center">
                        <Box marginEnd="m">
                            <ArrowLeft />
                        </Box>
                        <AppText color="mainTextColor" fontSize={normalize(20)}>
                            {screenName}
                        </AppText>
                    </Box>
                </TouchableOpacity>
            </Box>
            <Box>{end}</Box>
        </Box>
    );
};

export default Header;
