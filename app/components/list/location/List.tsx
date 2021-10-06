import {useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions, FlatList} from "react-native";

import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";
import Box from "../../../theme/Box";
import {ThemeType} from "../../../theme/Theme";
import {Location} from "../../../types";
import AppFlatList from "../../FlatList";

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
        <Box width="100%" marginBottom="m">
            <AppFlatList
                showsVerticalScrollIndicator={false}
                data={items}
                removeClippedSubviews={false}
                numColumns={3}
                style={{alignSelf: "center"}}
                contentContainerStyle={{
                    width: BOX_SIZE * 3 + spacing.s * 4,
                }}
                columnWrapperStyle={{
                    alignItems: "center",
                }}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderItem={({item, index}) => {
                    const selected = selectedIds.includes(item.id);
                    return (
                        <ListItem
                            enabled={enabled}
                            id={item.id}
                            name={item.name[language]}
                            index={index}
                            onEndPress={onEndPress}
                            endDisableText={endDisableText}
                            endDisabled={endDisabled}
                            onChangeText={onChangeText}
                            onBlur={onBlur}
                            backgroundColor={
                                selected ? "buttonSecondary" : "thirdBackground"
                            }
                        />
                    );
                }}
            />
        </Box>
    );
};

export default List;
