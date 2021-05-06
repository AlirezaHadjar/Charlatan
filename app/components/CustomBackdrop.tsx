import {BottomSheetBackdropProps} from "@gorhom/bottom-sheet";
import React, {useMemo} from "react";
import {ViewProps} from "react-native";
import {State, TapGestureHandler} from "react-native-gesture-handler";
import Animated, {
    Extrapolate,
    interpolate,
    useAnimatedProps,
    useAnimatedStyle,
} from "react-native-reanimated";

interface Props extends BottomSheetBackdropProps {
    onPress: () => void;
}

const CustomBackdrop = ({animatedIndex, style, onPress}: Props) => {
    const animatedOpacity = useAnimatedStyle(() => {
        const opacity = interpolate(
            animatedIndex.value,
            [0, 1],
            [0, 0.5],
            Extrapolate.CLAMP,
        );
        return {opacity};
    });

    const containerStyle = useMemo(
        () => [
            style,
            {
                backgroundColor: "#000",
            },
        ],
        [style],
    );

    const props = useAnimatedProps<ViewProps>(() => {
        const touchable = animatedIndex.value > 0 ? true : false;
        return {pointerEvents: touchable ? "auto" : "none"};
    }, [animatedIndex]);

    return (
        <TapGestureHandler
            onHandlerStateChange={(p) => {
                if (p.nativeEvent.state === State.END) onPress();
            }}>
            <Animated.View
                animatedProps={{...props}}
                style={[containerStyle, animatedOpacity]}
            />
        </TapGestureHandler>
    );
};

export default CustomBackdrop;
