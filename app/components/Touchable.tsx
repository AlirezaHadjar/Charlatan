import React, {useCallback} from "react";
import {
    GestureResponderEvent,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";
import Animated, {AnimateProps} from "react-native-reanimated";

import {useAppDispatch} from "../store/configureStore";
import {setAlert} from "../store/reducers/alert";

export interface TouchableProps extends AnimateProps<TouchableOpacityProps> {
    disableText?: string;
    enabled?: boolean;
    disabled?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const AppTouchable: React.FC<TouchableProps> = ({
    children,
    disableText,
    enabled = true,
    disabled,
    onPress,
    ...props
}) => {
    const dispatch = useAppDispatch();
    const handlePress = useCallback(
        (e: GestureResponderEvent) => {
            if (onPress && !disabled) return onPress(e);
            if (disabled && disableText) {
                dispatch(
                    setAlert({id: Date.now.toString(), text: disableText}),
                );
            }
        },
        [disableText, disabled, dispatch, onPress],
    );

    return (
        <AnimatedTouchable
            onPress={e => handlePress(e)}
            {...props}
            disabled={!enabled}>
            {children}
        </AnimatedTouchable>
    );
};

export default AppTouchable;
