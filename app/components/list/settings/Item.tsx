import React from "react";
import {StyleSheet, TouchableOpacity} from "react-native";
import {useNavigation} from "@react-navigation/native";
import {StackNavigationProp} from "@react-navigation/stack";

import Box, {RotatedBox} from "../../../theme/Box";
import {LISTITEM_HEIGHT} from "../../../../SpyHunt";
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
    return (
        <TouchableOpacity onPress={() => navigation.navigate(screen)}>
            <Box
                width="100%"
                backgroundColor="thirdBackground"
                height={LISTITEM_HEIGHT}
                flexDirection="row"
                style={styles.container}
                paddingHorizontal="m"
                alignItems="center">
                <Box flexDirection="row" flex={1} alignItems="center">
                    <Box marginEnd="m">{icon}</Box>
                    <AppText>{title}</AppText>
                </Box>
                <RotatedBox>
                    <Chevron />
                </RotatedBox>
            </Box>
        </TouchableOpacity>
    );
};

export default Item;
