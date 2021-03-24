import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from "react-redux";

import {AppState} from "./reducer";

export const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
