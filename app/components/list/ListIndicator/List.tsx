import React from "react";
import {Dimensions, StyleSheet, View} from "react-native";
import Animated from "react-native-reanimated";

import ListItem from "./ListItem";

export interface Props {
    offsetX: Animated.SharedValue<number>;
    itemWidth?: number;
    itemsLength: number;
}

const {width} = Dimensions.get("window");

const List: React.FC<Props> = ({offsetX, itemsLength, itemWidth = width}) => {
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row",
            alignItems: "center",
        },
    });

    return (
        <View style={styles.container}>
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
        </View>
    );
};

export default List;
