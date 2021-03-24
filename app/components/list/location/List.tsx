import React from "react";
import {FlatList} from "react-native";

import Box from "../../../theme/Box";
import {Location} from "../../../types";

import ListItem from "./ListItem";

export interface ListProps {
    items: Location[];
    end?: JSX.Element;
    onEndPress?: (id: string) => void;
    onChangeText: (text: string, id: string) => void;
}

const List: React.FC<ListProps> = ({
    items,
    end = null,
    onEndPress,
    onChangeText,
}) => {
    return (
        <Box width="100%" marginBottom="m">
            <FlatList
                showsVerticalScrollIndicator={false}
                data={items}
                removeClippedSubviews={false}
                numColumns={3}
                columnWrapperStyle={{
                    alignItems: "center",
                    justifyContent: "space-between",
                }}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderItem={({item}) => (
                    <ListItem
                        id={item.id}
                        name={item.name}
                        end={end}
                        onEndPress={onEndPress}
                        onChangeText={onChangeText}
                    />
                )}
            />
        </Box>
    );
};

export default List;
