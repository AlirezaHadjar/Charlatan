import React from "react";
import {FlatList} from "react-native";

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
    onChangeText?: (text: string, id: string) => void;
    endDisabled?: boolean;
}

const List: React.FC<ListProps> = ({
    items,
    selectedIds = [],
    end = null,
    onEndPress,
    onChangeText,
    endDisabled = false,
}) => {
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
                        name={item.name}
                        end={end}
                        endDisabled={endDisabled}
                        onEndPress={onEndPress}
                        onChangeText={onChangeText}
                        textColor={
                            selectedIds.includes(item.id)
                                ? "light"
                                : "secondText"
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
