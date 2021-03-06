import React from "react";
import {Dimensions, FlatList, FlatListProps, StyleSheet} from "react-native";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";

import {useRTL} from "../../../hooks/isRTL";
import {getPlayers} from "../../../store/reducers/data";
import {useSelector} from "../../../store/useSelector";
import Box from "../../../theme/Box";
import {Game} from "../../../types";
import {ListIndicator} from "../ListIndicator";
import AppFlatList from "../../FlatList";

import ListItem from "./ListItem";

export interface ListProps {
    items: Game[];
    onPress?: (id: string) => void;
}

const {width, height} = Dimensions.get("window");
const CONTAINER_WIDTH = width;

const BOX_HEIGHT = (height * 56) / 100;
const BOX_WIDTH = (width * 73) / 100;
const MARGIN = (width * 3) / 100;
const wholeWidth = BOX_WIDTH + 2 * MARGIN;

const AnimatedFlatList =
    Animated.createAnimatedComponent<Readonly<FlatListProps<Game>>>(
        AppFlatList,
    );

const styles = StyleSheet.create({
    flatlist: {
        paddingHorizontal: CONTAINER_WIDTH / 2 - BOX_WIDTH / 2 - MARGIN,
    },
});

const List: React.FC<ListProps> = ({items, onPress}) => {
    const isRTL = useRTL();
    const offsetX = useSharedValue(0);
    const users = useSelector(getPlayers);

    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: event => {
                const offset = event?.contentOffset?.x;
                if (!offset) return;
                offsetX.value = event.contentOffset.x;
            },
        },
        [],
    );

    return (
        <Box
            width={CONTAINER_WIDTH}
            marginBottom="m"
            alignSelf="center"
            alignItems="center">
            <AnimatedFlatList
                showsHorizontalScrollIndicator={false}
                data={items}
                scrollEventThrottle={16}
                onScroll={scrollHandler}
                inverted={isRTL}
                overScrollMode="never"
                snapToInterval={wholeWidth}
                pagingEnabled
                horizontal
                contentContainerStyle={styles.flatlist}
                keyExtractor={(item, index) => item.id.toString() + index}
                renderItem={({item, index}) => (
                    <ListItem
                        item={item}
                        onPress={onPress}
                        margin={MARGIN}
                        height={BOX_HEIGHT}
                        users={users}
                        width={BOX_WIDTH}
                        index={index}
                        offsetX={offsetX}
                    />
                )}
            />
            <Box paddingVertical="m">
                <ListIndicator
                    itemWidth={wholeWidth}
                    itemsLength={items.length}
                    offsetX={offsetX}
                />
            </Box>
        </Box>
    );
};

export default List;
