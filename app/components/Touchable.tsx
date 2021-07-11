import React, {useCallback} from "react";
import {
    GestureResponderEvent,
    TouchableOpacity,
    TouchableOpacityProps,
} from "react-native";

import {useAppDispatch} from "../store/configureStore";
import {setAlert} from "../store/reducers/alert";

export interface TouchableProps extends TouchableOpacityProps {
    disableText?: string;
    enabled?: boolean;
    disabled?: boolean;
    onPress?: (event: GestureResponderEvent) => void;
}

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
        <TouchableOpacity
            onPress={e => handlePress(e)}
            {...props}
            disabled={!enabled}>
            {children}
        </TouchableOpacity>
    );
};

export default AppTouchable;
