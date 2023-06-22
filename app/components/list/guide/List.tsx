import React from "react";
import {Dimensions, StyleSheet} from "react-native";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import {FlashList, FlashListProps} from "@shopify/flash-list";

import Box from "../../../theme/Box";
import {Guide} from "../../../types";
import {ListIndicator} from "../ListIndicator";

import ListItem from "./ListItem";

export interface ListProps {
    items: Guide[];
    onPress?: (id: string) => void;
}

const {width} = Dimensions.get("window");
const CONTAINER_WIDTH = width;

const BOX_WIDTH = (width * 90) / 100;
const MARGIN = (width * 3) / 100;

const AnimatedFlatList =
    Animated.createAnimatedComponent<Readonly<FlashListProps<Guide>>>(
        FlashList,
    );

const List: React.FC<ListProps> = ({items}) => {
    const offsetX = useSharedValue(0);
    const wholeWidth = BOX_WIDTH + 2 * MARGIN;

    const scrollHandler = useAnimatedScrollHandler(
        {
            onScroll: event => {
                offsetX.value = event.contentOffset.x;
            },
        },
        [offsetX.value],
    );

    const styles = StyleSheet.create({
        flatlist: {
            paddingHorizontal: CONTAINER_WIDTH / 2 - BOX_WIDTH / 2 - MARGIN,
        },
    });
    return (
        <Box
            width={CONTAINER_WIDTH}
            paddingBottom="m"
            flex={1}
            alignSelf="center"
            alignItems="center">
            <Box flex={1} minHeight={2} minWidth={2}>
                <AnimatedFlatList
                    showsHorizontalScrollIndicator={false}
                    data={items}
                    scrollEventThrottle={16}
                    estimatedItemSize={345}
                    onScroll={scrollHandler}
                    overScrollMode="never"
                    snapToInterval={wholeWidth}
                    pagingEnabled
                    horizontal
                    contentContainerStyle={styles.flatlist}
                    keyExtractor={(item, index) => item.id.toString() + index}
                    renderItem={({item, index}) => (
                        <ListItem
                            item={item}
                            margin={MARGIN}
                            width={BOX_WIDTH}
                            index={index}
                            offsetX={offsetX}
                        />
                    )}
                />
            </Box>
            <Box paddingTop="m">
                <ListIndicator
                    inverted={false}
                    itemWidth={wholeWidth}
                    itemsLength={items.length}
                    offsetX={offsetX}
                />
            </Box>
        </Box>
    );
};

export default List;
