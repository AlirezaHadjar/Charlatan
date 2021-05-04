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

import {ITEM_HEIGHT} from "../../SpyHunt";
import Box from "../theme/Box";

import Item from "./Item";

export interface PickerProps {
    numberOfVisibleItems?: number;
    itemHeight?: number;
    items: {id: string; title: string}[];
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

const Picker: React.FC<PickerProps> = ({
    numberOfVisibleItems = NUM,
    itemHeight = ITEM_HEIGHT,
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
                    maxWidth={maxWidth}
                />
            );
        },
        [itemHeight, maxWidth, translationY],
    );
    const keyExtractor = useCallback(
        (item, index) => `${item.id}-${index}`,
        [],
    );

    const handleFlatlistScroll = useCallback(
        (title: string) => {
            // console.log(title);
            const index = items.findIndex((item) => item.title === title);
            if (index === -1) return;
            const offset = itemHeight * index;
            if (offset < 0) return;
            flatlistRef.current?.scrollToOffset({offset});
        },
        [itemHeight, items],
    );

    useEffect(() => {
        // console.log("useEffect");
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
    // const getItemCount = useCallback((data) => data., []);

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
            const index = Math.floor(offset / itemHeight);
            if (index < 0 || index >= items.length) return;
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
            keyExtractor,
            numberOfVisibleItems,
            renderItem,
            scrollHandler,
            styles.flatlist,
        ],
    );
};

export default memo(Picker);
