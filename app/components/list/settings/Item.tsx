import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

import Box from "../../../theme/Box";
import {LISTITEM_HEIGHT} from "../../../../Constants";
import AppText from "../../Text";
import Chevron from "../../../assets/SVGs/Chevron";
import {AppRoute} from "../../../navigations/AppNavigator";
import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";

export interface ItemProps {
    icon: JSX.Element;
    title: string;
    screen: keyof AppRoute;
}
type Screen = StackNavigationProp<AppRoute>;

const styles = StyleSheet.create({
    container: {
        marginBottom: 1,
    },
});

const Item: React.FC<ItemProps> = ({icon, title, screen}) => {
    const navigation = useNavigation<Screen>();
    const language = useSelector(getLanguageName);
    const flexDirection = language === "en" ? "row" : "row-reverse";
    const marginEnd = language === "en" ? "m" : undefined;
    const marginStart = language !== "en" ? "m" : undefined;
    const chevronRotate = language === "en" ? 0 : 180;
    return (
        <TouchableOpacity onPress={() => navigation.navigate(screen)}>
            <Box
                width="100%"
                backgroundColor="thirdBackground"
                height={LISTITEM_HEIGHT}
                flexDirection={flexDirection}
                style={styles.container}
                paddingHorizontal="m"
                alignItems="center">
                <Box flexDirection={flexDirection} flex={1} alignItems="center">
                    <Box marginEnd={marginEnd} marginStart={marginStart}>
                        {icon}
                    </Box>
                    <AppText>{title}</AppText>
                </Box>
                <Box style={{transform: [{rotate: `${chevronRotate}deg`}]}}>
                    <Chevron />
                </Box>
            </Box>
        </TouchableOpacity>
    );
};

export default Item;
