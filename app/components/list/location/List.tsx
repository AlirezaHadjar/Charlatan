import React from "react";
import {FlatList} from "react-native";

import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";
import Box from "../../../theme/Box";
import {Location} from "../../../types";

import ListItem from "./ListItem";

export interface ListProps {
    items: Location[];
    selectedIds?: string[];
    end?: JSX.Element;
    onEndPress?: (id: string) => void;
    onChangeText?: (text: string, id: string) => void;
    endDisabled?: boolean;
}

const List: React.FC<ListProps> = ({
    items,
    end = null,
    selectedIds = [],
    onEndPress,
    onChangeText,
    endDisabled,
}) => {
    const language = useSelector(getLanguageName);
    return (
        <Box width="100%" marginBottom="m">
            <FlatList
                showsVerticalScrollIndicator={false}
                data={items}
                removeClippedSubviews={false}
                numColumns={3}
                columnWrapperStyle={{
                    alignItems: "center",
                }}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderItem={({item}) => (
                    <ListItem
                        id={item.id}
                        name={item.name[language]}
                        end={end}
                        onEndPress={onEndPress}
                        endDisabled={endDisabled}
                        onChangeText={onChangeText}
                        backgroundColor={
                            selectedIds.includes(item.id)
                                ? "buttonSecondary"
                                : "secondBackground"
                        }
                    />
                )}
            />
        </Box>
    );
};

export default List;
