import {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import React, {useCallback, useEffect, useRef} from "react";
import {FlatList} from "react-native";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";

import {ITEM_HEIGHT} from "../../SpyHunt";
import Box from "../theme/Box";

import Item from "./Item";

export interface PickerProps {
    numberOfVisibleItems?: number;
    itemHeight?: number;
    items: {id: string; title: string}[];
    initialTitle?: string;
    onSelect?: (value: string) => void;
    isInBottomSheet?: boolean;
}

const NormalAnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const BottomSheetAnimatedFlatlist = Animated.createAnimatedComponent(
    BottomSheetFlatList,
);

export const NUM = 3;

const Picker: React.FC<PickerProps> = ({
    numberOfVisibleItems = NUM,
    itemHeight = ITEM_HEIGHT,
    items = [],
    initialTitle = "",
    onSelect,
    isInBottomSheet = false,
}) => {
    const AnimatedFlatlist = isInBottomSheet
        ? BottomSheetAnimatedFlatlist
        : NormalAnimatedFlatlist;
    const flatlistRef = useRef<FlatList>(null);
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

    useEffect(() => {
        const index = items.findIndex((item) => item.title === initialTitle);
        if (index === -1) return;
        const offset = ITEM_HEIGHT * index;
        if (offset < 0) return;
        // flatlistRef.current?.scrollToIndex({index});
        flatlistRef.current?.scrollToOffset({offset});
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleFailedScroll = async (info: {
        index: number;
        highestMeasuredFrameIndex: number;
        averageItemLength: number;
    }) => {
        await new Promise((resolve) => setTimeout(resolve, 200));
        flatlistRef.current?.scrollToIndex({
            index: info.index,
            animated: true,
        });
    };

    return (
        <Box height={numberOfVisibleItems * itemHeight}>
            <AnimatedFlatlist
                onScroll={scrollHandler}
                getItemLayout={(data, index) => ({
                    index,
                    offset: ITEM_HEIGHT * index,
                    length: ITEM_HEIGHT,
                })}
                onMomentumScrollEnd={(e) => {
                    console.log("HERE IN FLATLIST");
                    const offset = e.nativeEvent.contentOffset.y;
                    const index = Math.floor(offset / ITEM_HEIGHT);
                    const {title} = items[index];
                    onSelect && onSelect(title);
                }}
                onScrollToIndexFailed={handleFailedScroll}
                initialScrollIndex={0}
                showsVerticalScrollIndicator={false}
                snapToInterval={itemHeight}
                ref={flatlistRef}
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
