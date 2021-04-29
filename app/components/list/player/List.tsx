import React from "react";
import {FlatList} from "react-native";

import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";
import Box from "../../../theme/Box";
import {Player} from "../../../types";

import ListItem from "./ListItem";

interface ModifiedPlayer extends Player {
    selected?: boolean;
}

export interface ListProps {
    items: Player[];
    selectedIds?: string[];
    end?: JSX.Element;
    onEndPress?: (id: string) => void;
    onBlur?: (text: string, id: string) => void;
    onChangeText?: (text: string, id: string) => void;
    endDisabled?: boolean;
    endDisableText?: string;
}

const List: React.FC<ListProps> = ({
    items,
    selectedIds = [],
    end = null,
    onEndPress,
    onBlur,
    onChangeText,
    endDisabled = false,
    endDisableText = "",
}) => {
    const language = useSelector(getLanguageName);
    return (
        <Box width="100%" marginBottom="m">
            <FlatList
                showsVerticalScrollIndicator={false}
                data={items}
                removeClippedSubviews={false}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderItem={({item}) => (
                    <ListItem
                        id={item.id}
                        name={item.name[language]}
                        end={end}
                        endDisabled={endDisabled}
                        onBlur={onBlur}
                        endDisableText={endDisableText}
                        onEndPress={onEndPress}
                        onChangeText={onChangeText}
                        textColor={
                            selectedIds.includes(item.id)
                                ? "buttonPrimary"
                                : "buttonSecondary"
                        }
                        backgroundColor={
                            selectedIds.includes(item.id)
                                ? "buttonSecondary"
                                : "buttonPrimary"
                        }
                    />
                )}
            />
        </Box>
    );
};

export default List;
