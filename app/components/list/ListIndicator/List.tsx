import React from "react";
import {Dimensions, StyleSheet, View, FlatListProps} from "react-native";
import Animated, {
    scrollTo,
    useAnimatedRef,
    useDerivedValue,
} from "react-native-reanimated";

import AppFlatList from "../../FlatList";

import ListItem from "./ListItem";

export interface Props
    extends Omit<FlatListProps<typeof ListItem>, "data" | "renderItem"> {
    offsetX: Animated.SharedValue<number>;
    itemWidth?: number;
    itemsLength: number;
    maxWidth?: number;
}

const {width} = Dimensions.get("window");
const SIZE = (width * 2.5) / 100 + 5;

const List: React.FC<Props> = ({
    offsetX,
    itemsLength,
    itemWidth = width,
    maxWidth = (width * 40) / 100,
    ...props
}) => {
    const aref = useAnimatedRef<AppFlatList>();
    useDerivedValue(() => {
        //@ts-ignore
        scrollTo(aref, Math.ceil(offsetX.value / itemWidth) * SIZE, 0, true);
    }, [offsetX.value]);
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
            maxWidth,
            overflow: "hidden",
        },
    });

    return (
        <View style={styles.container}>
            <AppFlatList
                {...props}
                horizontal
                ref={aref}
                showsHorizontalScrollIndicator={false}
                keyExtractor={(_, index) => index.toString()}
                scrollEnabled={false}
                data={new Array(itemsLength).fill(0)}
                renderItem={({index}) => (
                    <ListItem
                        key={index}
                        index={index}
                        itemWidth={itemWidth}
                        offsetX={offsetX}
                    />
                )}
            />
        </View>
    );
};

export default List;
