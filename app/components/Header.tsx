// eslint-disable-next-line import/no-extraneous-dependencies
import {useNavigation} from "@react-navigation/core";
import React, {useCallback} from "react";
import {Dimensions, Pressable} from "react-native";

import ArrowLeft from "../assets/SVGs/ArrowLeft";
import Box from "../theme/Box";
import normalize from "../utils/normalizer";

import Animatable from "./Animatable";
import AppText from "./Text";

export interface HeaderProps {
    end?: JSX.Element;
    screenName: string;
    onBackPress?: () => void;
    icon?: JSX.Element;
}

const {height} = Dimensions.get("window");

const Header: React.FC<HeaderProps> = ({
    end,
    screenName,
    onBackPress,
    icon = <ArrowLeft />,
}) => {
    const navigation = useNavigation();
    const handlePress = useCallback(() => {
        if (onBackPress) return onBackPress();
        return navigation.goBack();
    }, [navigation, onBackPress]);
    return (
        <Animatable zIndex={10}>
            <Box
                flexDirection="row"
                alignItems="center"
                paddingHorizontal="m"
                height={(height * 10) / 100}>
                <Box flex={1}>
                    <Box
                        flexDirection="row"
                        alignItems="center"
                        height="100%"
                        justifyContent="space-between">
                        <Pressable onPress={handlePress} hitSlop={10}>
                            <Box
                                marginEnd="m"
                                zIndex={1}
                                height="100%"
                                alignItems="center"
                                justifyContent="center">
                                {icon}
                            </Box>
                        </Pressable>
                        <Box
                            zIndex={-1}
                            width="100%"
                            alignItems="center"
                            position="absolute">
                            <AppText
                                variant="bold"
                                color="mainTextColor"
                                fontSize={normalize(24)}>
                                {screenName}
                            </AppText>
                        </Box>
                        <Box>{end}</Box>
                    </Box>
                </Box>
            </Box>
        </Animatable>
    );
};

export default Header;
