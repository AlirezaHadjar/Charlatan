import React, {useCallback} from "react";
import {FlatList} from "react-native";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";

import Box from "../theme/Box";

import Item from "./Item";

export interface PickerProps {
    numberOfVisibleItems?: number;
    itemHeight?: number;
    items: {id: string; title: string}[];
}

const AnimatedFlatlist = Animated.createAnimatedComponent(FlatList);

export const ITEM_HEIGHT = 60;
export const NUM = 3;

const Picker: React.FC<PickerProps> = ({
    numberOfVisibleItems = NUM,
    itemHeight = ITEM_HEIGHT,
    items = [],
}) => {
    const translationY = useSharedValue(0.00000001);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y + 0.00000001;
    });

    const renderItem = useCallback(
        ({item, index}) => {
            return <Item index={index} item={item} offset={translationY} />;
        },
        [translationY],
    );
    const keyExtractor = useCallback(
        (item, index) => `${item.id}-${index}`,
        [],
    );

    return (
        <Box height={numberOfVisibleItems * itemHeight}>
            <AnimatedFlatlist
                onScroll={scrollHandler}
                showsVerticalScrollIndicator={false}
                snapToInterval={itemHeight}
                contentContainerStyle={{
                    paddingVertical: itemHeight * 1,
                }}
                keyExtractor={keyExtractor}
                data={items}
                renderItem={renderItem}
            />
        </Box>
    );
};

export default Picker;
