import {store} from "../store/getStore";
import {setAlert} from "../store/reducers/alert";

export const handlePress = (
    onPress: Function,
    disabled: boolean,
    disableText: string,
) => {
    const myStore = store;
    if (disabled && disableText)
        return myStore.dispatch(
            setAlert({id: Date.now.toString(), text: disableText}),
        );
    if (disabled) return;
    if (onPress) onPress();
};
