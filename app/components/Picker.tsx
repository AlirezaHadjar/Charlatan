import {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import React, {memo, useCallback, useEffect, useMemo, useRef} from "react";
import {
    FlatList,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
} from "react-native";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";

import {ITEM_HEIGHT, ITEM_WIDTH} from "../../SpyHunt";
import Box from "../theme/Box";

import Item from "./Item";

interface ItemType {
    id: string;
    title: string;
}

export interface PickerProps {
    numberOfVisibleItems?: number;
    itemHeight?: number;
    itemWidth?: number;
    items: ItemType[];
    initialTitle?: string;
    onSelect?: (value: string, priority: "urgent" | "normal") => void;
    isInBottomSheet?: boolean;
    maxWidth?: number;
}

const NormalAnimatedFlatlist = Animated.createAnimatedComponent(FlatList);
const BottomSheetAnimatedFlatlist = Animated.createAnimatedComponent(
    BottomSheetFlatList,
);

export const NUM = 3;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const keyExtractor: (item: any, index: number) => string = (item, index) =>
    `${item.id}-${index}`;

const Picker: React.FC<PickerProps> = ({
    numberOfVisibleItems = NUM,
    itemHeight = ITEM_HEIGHT,
    itemWidth = ITEM_WIDTH,
    items = [],
    initialTitle = "",
    onSelect,
    isInBottomSheet = false,
    maxWidth,
}) => {
    const AnimatedFlatlist = isInBottomSheet
        ? BottomSheetAnimatedFlatlist
        : NormalAnimatedFlatlist;
    const flatlistRef = useRef<FlatList>(null);
    const translationY = useSharedValue(0);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y + 0;
    });

    const styles = StyleSheet.create({
        flatlist: {
            paddingVertical: itemHeight * 1,
        },
    });
    const renderItem = useCallback(
        ({item, index}) => {
            return (
                <Item
                    index={index}
                    item={item}
                    offset={translationY}
                    itemHeight={itemHeight}
                    itemWidth={itemWidth}
                    maxWidth={maxWidth}
                />
            );
        },
        [itemHeight, itemWidth, maxWidth, translationY],
    );

    const handleFlatlistScroll = useCallback(
        (title: string) => {
            const index = items.findIndex((item) => item.title === title);
            if (index === -1) return;
            const offset = itemHeight * index;
            if (offset < 0) return;
            flatlistRef.current?.scrollToOffset({offset});
        },
        [itemHeight, items],
    );

    useEffect(() => {
        handleFlatlistScroll(initialTitle);
    }, [handleFlatlistScroll, initialTitle]);

    const getItemLayout = useCallback(
        (data, index) => ({
            length: itemHeight,
            offset: itemHeight * index,
            index,
        }),
        [itemHeight],
    );

    const handleFailedScroll = useCallback(
        async (info: {
            index: number;
            highestMeasuredFrameIndex: number;
            averageItemLength: number;
        }) => {
            await new Promise((resolve) => setTimeout(resolve, 200));
            flatlistRef.current?.scrollToIndex({
                index: info.index,
                animated: true,
            });
        },
        [],
    );

    const handleScrollEnd = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const offset = e.nativeEvent.contentOffset.y;
            let index = Math.round(offset / itemHeight);
            if (index < 0) index = 0;
            else if (index >= items.length) index = items.length - 1;
            const {title} = items[index];
            onSelect && onSelect(title, "normal");
        },
        [itemHeight, items, onSelect],
    );

    return useMemo(
        () => (
            <Box height={numberOfVisibleItems * itemHeight}>
                <AnimatedFlatlist
                    onScroll={scrollHandler}
                    getItemLayout={getItemLayout}
                    maxToRenderPerBatch={6}
                    windowSize={6}
                    onMomentumScrollEnd={handleScrollEnd}
                    onScrollToIndexFailed={handleFailedScroll}
                    initialScrollIndex={0}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={itemHeight}
                    ref={flatlistRef}
                    removeClippedSubviews
                    contentContainerStyle={styles.flatlist}
                    keyExtractor={keyExtractor}
                    data={items}
                    renderItem={renderItem}
                />
            </Box>
        ),
        [
            getItemLayout,
            handleFailedScroll,
            handleScrollEnd,
            itemHeight,
            items,
            numberOfVisibleItems,
            renderItem,
            scrollHandler,
            styles.flatlist,
        ],
    );
};

export default memo(Picker);
