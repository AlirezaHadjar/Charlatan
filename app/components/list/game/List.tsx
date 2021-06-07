import {useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions, FlatList, StyleSheet} from "react-native";

import {getLanguageName} from "../../../store/reducers/language";
import {useSelector} from "../../../store/useSelector";
import Box from "../../../theme/Box";
import {ThemeType} from "../../../theme/Theme";
import {Game, Location} from "../../../types";
import normalize from "../../../utils/normalizer";
import Play from "../../../assets/SVGs/Play";

import ListItem from "./ListItem";
import Button from "../../Button";

export interface ListProps {
    items: Game[];
    onPress?: (id: string) => void;
}

const {width} = Dimensions.get("window");
const CONTAINER_WIDTH = width - 60;

const BOX_SIZE = (width * 60) / 100;

const List: React.FC<ListProps> = ({items, onPress}) => {
    const language = useSelector(getLanguageName);
    const {spacing} = useTheme<ThemeType>();
    const styles = StyleSheet.create({
        flatlist: {
            paddingHorizontal: CONTAINER_WIDTH / 2 - BOX_SIZE / 2,
        },
    });
    return (
        <Box
            width={CONTAINER_WIDTH}
            marginBottom="m"
            alignSelf="center"
            alignItems="center">
            <FlatList
                showsHorizontalScrollIndicator={false}
                data={items}
                snapToInterval={BOX_SIZE}
                pagingEnabled
                horizontal
                contentContainerStyle={styles.flatlist}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderItem={({item}) => (
                    <ListItem item={item} onPress={onPress} />
                )}
            />
            {/* <Button
                fontSize={normalize(18)}
                variant="simple"
                title="Continue"
                backgroundColor="secondBackground"
                marginTop="m"
                height={(width * 20) / 100}
                width={(width * 40) / 100}>
                <Box flex={0.5}>
                    <Play scale={0.4} />
                </Box>
            </Button> */}
        </Box>
    );
};

export default List;
