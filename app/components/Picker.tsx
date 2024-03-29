// import {BottomSheetFlatList} from "@gorhom/bottom-sheet";
import React, {memo, useCallback, useEffect, useMemo, useRef} from "react";
import {
    FlatList,
    FlatListProps,
    ListRenderItem,
    NativeScrollEvent,
    NativeSyntheticEvent,
    StyleSheet,
} from "react-native";
import Animated, {
    runOnJS,
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import ReactNativeHapticFeedback, {
    HapticFeedbackTypes,
} from "react-native-haptic-feedback";

import {ITEM_HEIGHT, ITEM_WIDTH} from "../../Constants";
import Box from "../theme/Box";

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

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
    // deps: (keyof Omit<PickerProps, "deps">)[];
}

const NormalAnimatedFlatlist =
    Animated.createAnimatedComponent<FlatListProps<ItemType>>(FlatList);
// const BottomSheetAnimatedFlatlist =
//     Animated.createAnimatedComponent(BottomSheetFlatList);

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
        ? NormalAnimatedFlatlist
        : NormalAnimatedFlatlist;
    const flatlistRef = useRef<FlatList>(null);
    const translationY = useSharedValue(0);
    const lastY = useSharedValue(0);
    const triggerHaptic = (type: HapticFeedbackTypes) => {
        ReactNativeHapticFeedback.trigger(type, options);
    };
    const scrollHandler = useAnimatedScrollHandler(event => {
        translationY.value = event.contentOffset.y + 0;
        const diff = Math.abs(lastY.value - event.contentOffset.y);
        if (diff > itemHeight) {
            lastY.value = event.contentOffset.y;
            const isFastScrolling = (event.velocity?.y || 0) > 2;
            const hapticType: HapticFeedbackTypes = isFastScrolling
                ? HapticFeedbackTypes.impactLight
                : HapticFeedbackTypes.impactMedium;

            runOnJS(triggerHaptic)(hapticType);
        }
    });

    const styles = StyleSheet.create({
        flatlist: {
            paddingVertical: itemHeight * 1,
        },
    });
    const renderItem: ListRenderItem<ItemType> = useCallback(
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
            const index = items.findIndex(item => item.title === title);
            if (index === -1) return;
            const offset = itemHeight * index;
            if (offset < 0) return;
            flatlistRef.current?.scrollToOffset({offset, animated: true});
        },
        [itemHeight, items],
    );

    useEffect(() => {
        handleFlatlistScroll(initialTitle);
    }, []);

    const getItemLayout = useCallback(
        (_data: ArrayLike<ItemType> | null | undefined, index: number) => ({
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
            await new Promise(resolve => setTimeout(resolve, 200));
            flatlistRef.current?.scrollToOffset({
                offset: info.index * itemHeight,
                animated: true,
            });
        },
        [itemHeight],
    );

    const handleScrollEnd = useCallback(
        (e: NativeSyntheticEvent<NativeScrollEvent>) => {
            const offset = e.nativeEvent.contentOffset.y;
            let index = Math.round(offset / itemHeight);
            if (index < 0) index = 0;
            else if (index >= items.length) index = items.length - 1;
            const {title} = items[index] as ItemType;
            onSelect?.(title, "normal");
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
                    updateCellsBatchingPeriod={3}
                    initialNumToRender={numberOfVisibleItems}
                    overScrollMode="never"
                    windowSize={11}
                    onMomentumScrollEnd={handleScrollEnd}
                    onScrollToIndexFailed={handleFailedScroll}
                    initialScrollIndex={0}
                    showsVerticalScrollIndicator={false}
                    snapToInterval={itemHeight}
                    //@ts-ignore
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
            flatlistRef,
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
