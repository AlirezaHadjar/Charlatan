import {useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions, FlatList, View} from "react-native";
import Animated from "react-native-reanimated";

import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";
import Box from "../../../theme/Box";
import {ThemeType} from "../../../theme/Theme";
import {Location} from "../../../types";

import ListItem from "./ListItem";

export interface ListProps {
    items: Location[];
    selectedIds?: string[];
    end?: JSX.Element;
    onEndPress?: (id: string) => void;
    onChangeText?: (text: string, id: string) => void;
    onBlur?: (text: string, id: string) => void;
    endDisabled?: boolean;
    enabled?: boolean;
    endDisableText?: string;
}

const {width} = Dimensions.get("window");

const BOX_SIZE = (width * 28) / 100;

const List: React.FC<ListProps> = ({
    items,
    selectedIds = [],
    onEndPress,
    onChangeText,
    onBlur,
    enabled = true,
    endDisabled,
    endDisableText = "",
}) => {
    const language = useSelector(getLanguageName);
    const {spacing} = useTheme<ThemeType>();
    return (
        <Animated.ScrollView
            style={{
                marginBottom: spacing.m,
                alignSelf: "center",
            }}
            contentContainerStyle={{
                flexDirection: "row",
                flexWrap: "wrap",
                width: BOX_SIZE * 3 + spacing.s * 2,
            }}>
            {items.map((item, index) => {
                const selected = selectedIds.includes(item.id);
                return (
                    <ListItem
                        key={item.id.toString() + index}
                        enabled={enabled}
                        id={item.id}
                        name={item.name[language]}
                        index={index}
                        onEndPress={onEndPress}
                        endDisableText={endDisableText}
                        endDisabled={endDisabled}
                        onChangeText={onChangeText}
                        onBlur={onBlur}
                        containerStyle={{
                            marginEnd: index % 3 !== 2 ? spacing.s : 0,
                        }}
                        backgroundColor={
                            selected ? "buttonSecondary" : "thirdBackground"
                        }
                    />
                );
            })}
        </Animated.ScrollView>
    );
};

export default List;
