import {BottomSheetModal, BottomSheetView} from "@gorhom/bottom-sheet";
import React, {useCallback, useEffect, useMemo, useRef, memo} from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {useFocusEffect} from "@react-navigation/core";
import {useTheme} from "@shopify/restyle";
import {Dimensions, BackHandler, LayoutChangeEvent} from "react-native";
import {useSharedValue} from "react-native-reanimated";

import {ThemeType} from "../theme/Theme";

import CustomBackdrop from "./CustomBackdrop";

export interface BottomSheetProps {
    onClose: () => void;
    isVisible?: boolean;
    children?: React.ReactElement[];
}

const {height} = Dimensions.get("window");

const AppBottomSheet: React.FC<BottomSheetProps> = ({
    onClose,
    isVisible = false,
    children,
}) => {
    const containerHeight = useSharedValue(0);
    const sheet = useRef<BottomSheetModal>(null);
    const theme = useTheme<ThemeType>();

    useEffect(() => {
        if (isVisible) {
            sheet.current?.present();
            sheet.current?.expand();
        } else {
            sheet.current?.dismiss();
        }
    }, [isVisible]);

    const snapPoints = useMemo(
        () => [Math.max((height * 15) / 100, containerHeight.value)],
        [containerHeight.value],
    );
    const handleBackButtonPress = useCallback(() => {
        onClose();
        return true;
    }, [onClose]);
    useFocusEffect(
        useCallback(() => {
            if (!isVisible) return;
            BackHandler.addEventListener(
                "hardwareBackPress",
                handleBackButtonPress,
            );
            return () =>
                BackHandler.removeEventListener(
                    "hardwareBackPress",
                    handleBackButtonPress,
                );
        }, [handleBackButtonPress, isVisible]),
    );
    const handleOnLayout: (event: LayoutChangeEvent) => void = useCallback(
        ({
            nativeEvent: {
                layout: {height},
            },
        }) => {
            containerHeight.value = height;
        },
        [containerHeight.value],
    );
    return (
        <BottomSheetModal
            index={0}
            onDismiss={onClose}
            onChange={index => index === -1 && onClose()}
            backdropComponent={props => (
                <CustomBackdrop
                    onPress={onClose}
                    animatedIndex={props.animatedIndex}
                    animatedPosition={props.animatedPosition}
                    style={props.style}
                />
            )}
            ref={sheet}
            snapPoints={snapPoints}>
            <BottomSheetView
                onLayout={handleOnLayout}
                style={{padding: theme.spacing.m}}>
                {children}
            </BottomSheetView>
        </BottomSheetModal>
    );
};

export default memo(AppBottomSheet);
