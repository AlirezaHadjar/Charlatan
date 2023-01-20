import React, {
    useRef,
    useMemo,
    useCallback,
    useEffect,
    memo,
    FC,
    useState,
} from "react";
import {BackHandler, useWindowDimensions, View} from "react-native";
import {useAnimatedStyle, useSharedValue} from "react-native-reanimated";
import {useSafeAreaInsets} from "react-native-safe-area-context";
import {BottomSheetModalMethods} from "@gorhom/bottom-sheet/lib/typescript/types";
import {
    BottomSheetModal,
    BottomSheetBackdrop,
    BottomSheetScrollView,
    useBottomSheetDynamicSnapPoints,
    BottomSheetModalProps,
} from "@gorhom/bottom-sheet";
import {useTheme} from "@shopify/restyle";
// eslint-disable-next-line max-len
import {BottomSheetDefaultBackdropProps} from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

import {useInterval} from "../hooks/interval";
import {ThemeType} from "../theme/Theme";

export interface AppBottomSheetProps
    extends Omit<BottomSheetModalProps, "children" | "snapPoints"> {
    name?: string;
    closable?: boolean;
    isVisible: boolean;
    ignoreHandleToggle?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    fullHeight?: boolean;
}

const BottomSheet: FC<AppBottomSheetProps> = ({
    name,
    onClose,
    children,
    isVisible,
    ignoreHandleToggle = false,
    closable = true,
    fullHeight = true,
    ...props
}) => {
    const {colors} = useTheme<ThemeType>();
    const state = useSharedValue<0 | -1>(isVisible ? 0 : -1);
    const {top, bottom} = useSafeAreaInsets();
    const {height: windowHeight} = useWindowDimensions();

    const bottomSheetRef = useRef<BottomSheetModalMethods>(null);
    const initialSnapPoints = useMemo(
        () => (fullHeight ? ["CONTENT_HEIGHT"] : ["CONTENT_HEIGHT"]),
        [fullHeight],
    );
    const {
        animatedHandleHeight,
        animatedSnapPoints,
        animatedContentHeight,
        handleContentLayout,
    } = useBottomSheetDynamicSnapPoints(initialSnapPoints);
    const [isOn, setIsOn] = useState(true);

    const handleDelay = () => {
        if (isVisible && state.value === -1 && !ignoreHandleToggle) {
            bottomSheetRef.current?.present();
        } else setIsOn(false);
    };

    useInterval(handleDelay, isOn ? 3000 : null);

    useEffect(() => {
        if (isVisible) {
            bottomSheetRef.current?.present();
        } else bottomSheetRef.current?.close();
    }, [isVisible]);

    const handleBackButtonPress = useCallback(() => {
        onClose?.();
        return true;
    }, [bottomSheetRef.current]);

    useEffect(() => {
        if (!isVisible) return;
        const handler = BackHandler.addEventListener(
            "hardwareBackPress",
            handleBackButtonPress,
        );
        return () => handler.remove();
    }, [isVisible, handleBackButtonPress]);

    const handleSheetChanges = useCallback((index: number) => {
        //@ts-ignore
        state.value = index;
        if (index === -1) {
            setIsOn(true);
            onClose?.();
        }
    }, []);

    const renderBackdrop = useCallback(
        (p: JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps) => (
            <BottomSheetBackdrop
                {...p}
                appearsOnIndex={0}
                disappearsOnIndex={-1}
                pressBehavior={!closable ? "none" : "close"}
            />
        ),
        [closable],
    );

    const scrollViewAnimatedStyles = useAnimatedStyle(() => {
        const contentHeight = animatedContentHeight.value;
        const handleHeight = animatedHandleHeight.value;
        const bottomSheetHeight = handleHeight + contentHeight;

        return {
            height:
                bottomSheetHeight > windowHeight
                    ? windowHeight - handleHeight - bottom - top
                    : bottomSheetHeight,
        };
    });

    const handleDismiss = () => {
        if (!closable) return;
    };

    const indicatorStyle = useMemo(
        () => ({
            backgroundColor: colors.cardGrey,
        }),
        [colors],
    );

    return (
        <BottomSheetModal
            {...props}
            index={0}
            name={name}
            topInset={top}
            bottomInset={bottom}
            ref={bottomSheetRef}
            onDismiss={handleDismiss}
            onChange={handleSheetChanges}
            enablePanDownToClose={closable}
            snapPoints={animatedSnapPoints}
            backdropComponent={renderBackdrop}
            handleHeight={animatedHandleHeight}
            handleIndicatorStyle={indicatorStyle}
            contentHeight={animatedContentHeight}>
            <BottomSheetScrollView style={scrollViewAnimatedStyles}>
                <View onLayout={handleContentLayout}>{children}</View>
            </BottomSheetScrollView>
        </BottomSheetModal>
    );
};

export default memo(BottomSheet);
