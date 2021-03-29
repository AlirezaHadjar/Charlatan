// eslint-disable-next-line import/no-extraneous-dependencies
import {useNavigation} from "@react-navigation/core";
import React, {useCallback} from "react";
import {Dimensions, Pressable} from "react-native";

import ArrowLeft from "../assets/SVGs/ArrowLeft";
import Box from "../theme/Box";
import normalize from "../utils/normalizer";

import AppText from "./Text";

export interface HeaderProps {
    end?: JSX.Element;
    screenName: string;
    onBackPress?: () => void;
}

const {height} = Dimensions.get("window");

const Header: React.FC<HeaderProps> = ({end, screenName, onBackPress}) => {
    const navigation = useNavigation();
    const handlePress = useCallback(() => {
        if (onBackPress) return onBackPress();
        return navigation.goBack();
    }, [navigation, onBackPress]);
    return (
        <Box
            flexDirection="row"
            alignItems="center"
            paddingHorizontal="m"
            height={(height * 10) / 100}>
            <Box flex={1}>
                <Pressable onPress={handlePress} hitSlop={40}>
                    <Box flexDirection="row" alignItems="center">
                        <Box marginEnd="m">
                            <ArrowLeft />
                        </Box>
                        <AppText color="mainTextColor" fontSize={normalize(20)}>
                            {screenName}
                        </AppText>
                    </Box>
                </Pressable>
            </Box>
            <Box>{end}</Box>
        </Box>
    );
};

export default Header;
