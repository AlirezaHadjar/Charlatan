import React from "react";
import {Dimensions, StyleSheet, View, ScrollView} from "react-native";
import Animated, {
    scrollTo,
    useAnimatedRef,
    useDerivedValue,
} from "react-native-reanimated";

import ListItem from "./ListItem";

export interface Props {
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
}) => {
    const aref = useAnimatedRef<ScrollView>();
    useDerivedValue(() => {
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
            <ScrollView
                horizontal
                ref={aref}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}>
                {new Array(itemsLength).fill(0).map((_, index) => {
                    return (
                        <ListItem
                            key={index}
                            index={index}
                            itemWidth={itemWidth}
                            offsetX={offsetX}
                        />
                    );
                })}
            </ScrollView>
        </View>
    );
};

export default List;
