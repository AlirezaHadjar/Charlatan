import {
    BottomSheetModal,
    BottomSheetView,
    useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import React, {useCallback, useEffect, useMemo, useRef, memo} from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import {useFocusEffect} from "@react-navigation/core";
import {useTheme} from "@shopify/restyle";
import {BackHandler} from "react-native";

import {ThemeType} from "../theme/Theme";

import CustomBackdrop from "./CustomBackdrop";

export interface BottomSheetProps {
    onClose: () => void;
    isVisible?: boolean;
    children?: React.ReactElement[];
}

const AppBottomSheet: React.FC<BottomSheetProps> = ({
    onClose,
    isVisible = false,
    children,
}) => {
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
    const initialSnapPoints = useMemo(() => ["CONTENT_HEIGHT"], []);
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);

    return (
        <BottomSheetModal
            snapPoints={animatedSnapPoints}
            handleHeight={animatedHandleHeight}
            contentHeight={animatedContentHeight}
            keyboardBehavior="interactive"
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
            ref={sheet}>
            <BottomSheetView
                onLayout={handleContentLayout}
                style={{padding: theme.spacing.m}}>
                {children}
            </BottomSheetView>
        </BottomSheetModal>
    );
};

export default memo(AppBottomSheet);
