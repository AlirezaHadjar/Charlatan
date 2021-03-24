import BottomSheet, {
    BottomSheetFlatList,
    BottomSheetView,
} from "@gorhom/bottom-sheet";
import {useTheme} from "@shopify/restyle";
import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import Animated, {
    useAnimatedScrollHandler,
    useSharedValue,
} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import Button from "../components/Button";
import Container from "../components/Container";
import CustomBackdrop from "../components/CustomBackdrop";
import Item from "../components/Item";
import Box from "../theme/Box";
import {ThemeType} from "../theme/Theme";

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TestProps {}

const options = {
    enableVibrateFallback: true,
    ignoreAndroidSystemSettings: false,
};

const AnimatedFlatlist = Animated.createAnimatedComponent(BottomSheetFlatList);

export const ITEM_HEIGHT = 60;
export const NUM = 3;

const Test: React.FC<TestProps> = ({}) => {
    const reportSheet = useRef<BottomSheet>(null);
    const inset = useSafeAreaInsets();
    const [array, setArray] = useState([]);
    const theme = useTheme<ThemeType>();
    const translationY = useSharedValue(0.00000001);
    const scrollHandler = useAnimatedScrollHandler((event) => {
        translationY.value = event.contentOffset.y + 0.00000001;
    });
    useEffect(() => {
        const temp = [];
        for (let i = 0; i < 1000; i++) temp.push({id: i, content: `${i}`});
        setArray(temp);
    }, []);

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
        <Container>
            <Button
                title="toggle sheet"
                onPress={() => {
                    reportSheet.current?.snapTo(1);
                }}
            />
            {useMemo(
                () => (
                    <BottomSheet
                        style={{backgroundColor: theme.colors.danger}}
                        backgroundComponent={() => <Box />}
                        backdropComponent={(props) => (
                            <CustomBackdrop
                                onPress={() => {
                                    setTimeout(
                                        () => reportSheet.current?.collapse(),
                                        200,
                                    );
                                }}
                                animatedIndex={props.animatedIndex}
                                animatedPosition={props.animatedPosition}
                                style={props.style}
                            />
                        )}
                        ref={reportSheet}
                        snapPoints={[0, "30%"]}>
                        <BottomSheetView
                            style={{
                                alignItems: "center",
                                flex: 1,
                                justifyContent: "center",
                                // backgroundColor: "red",
                            }}>
                            <Box height={NUM * ITEM_HEIGHT}>
                                <AnimatedFlatlist
                                    onScroll={scrollHandler}
                                    showsVerticalScrollIndicator={false}
                                    snapToInterval={ITEM_HEIGHT}
                                    contentContainerStyle={{
                                        paddingVertical: ITEM_HEIGHT * 1,
                                    }}
                                    keyExtractor={keyExtractor}
                                    data={array}
                                    renderItem={({item, index}) => {
                                        return (
                                            <Item
                                                index={index}
                                                item={item}
                                                offset={translationY}
                                            />
                                        );
                                    }}
                                />
                            </Box>
                        </BottomSheetView>
                    </BottomSheet>
                ),
                [
                    array,
                    keyExtractor,
                    scrollHandler,
                    theme.colors.danger,
                    translationY,
                ],
            )}
        </Container>
    );
};

export default Test;
