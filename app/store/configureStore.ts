import {configureStore} from "@reduxjs/toolkit";
import {useDispatch} from "react-redux";

import reducer from "./reducer";

const store = configureStore({
    reducer,
    middleware: getDefaultEnhancers =>
        getDefaultEnhancers({immutableCheck: false, serializableCheck: false}),
});

// eslint-disable-next-line import/no-anonymous-default-export
export default function () {
    return store;
}

export type AppDispatch = typeof store.dispatch;
export type AppGetState = typeof store.getState;
export const useAppDispatch = () => useDispatch<AppDispatch>();
