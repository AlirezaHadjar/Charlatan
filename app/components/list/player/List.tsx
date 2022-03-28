import {useTheme} from "@shopify/restyle";
import React from "react";
import {ScrollView} from "react-native";

import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";
import {ThemeType} from "../../../theme/Theme";
import {User} from "../../../types";

import ListItem from "./ListItem";

interface ModifiedPlayer extends User {
    selected?: boolean;
}

export interface ListProps {
    items: User[];
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
    const theme = useTheme<ThemeType>();
    return (
        <ScrollView
            contentContainerStyle={{
                paddingBottom: theme.spacing.m,
                flex: 1,
            }}>
            {items.map((item, index) => {
                const End = end?.type;
                const selected = selectedIds.includes(item.id);
                return (
                    <ListItem
                        id={item.id}
                        key={item.id.toString()}
                        index={index}
                        name={item.name[language]}
                        end={<End selected={selected} />}
                        endDisabled={endDisabled}
                        onBlur={onBlur}
                        endDisableText={endDisableText}
                        onEndPress={onEndPress}
                        onChangeText={onChangeText}
                        textColor={
                            selected ? "buttonPrimary" : "buttonSecondary"
                        }
                        backgroundColor={
                            selected ? "buttonSecondary" : "buttonPrimary"
                        }
                    />
                );
            })}
        </ScrollView>
    );
};

export default List;
