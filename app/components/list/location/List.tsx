import {useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions, FlatList} from "react-native";

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
    endDisabled?: boolean;
}

const {width} = Dimensions.get("window");

const BOX_SIZE = (width * 28) / 100;

const List: React.FC<ListProps> = ({
    items,
    end = null,
    selectedIds = [],
    onEndPress,
    onChangeText,
    endDisabled,
}) => {
    const language = useSelector(getLanguageName);
    const {spacing} = useTheme<ThemeType>();
    return (
        <Box width="100%" marginBottom="m">
            <FlatList
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
