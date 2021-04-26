import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

import {Alert} from "../../types";
import {AppState} from "../reducer";

interface AlertState {
    item: Alert | undefined;
}

const initialState: AlertState = {
    item: undefined,
};

const slice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        setAlert: (alert, {payload}: PayloadAction<Alert>) => {
            const newAlert: Alert = {...payload};
            newAlert.variant = payload.variant || "info";
            alert.item = newAlert;
        },
        removeAlert: (alert, _action: PayloadAction<undefined>) => {
            alert.item = undefined;
        },
    },
});

export const {setAlert, removeAlert} = slice.actions;
export type ActionTypes = typeof slice.actions;
export default slice.reducer;

export const getAlert = createSelector(
    (state: AppState) => state.entities.alert,
    (alert: AlertState) => alert?.item,
);
