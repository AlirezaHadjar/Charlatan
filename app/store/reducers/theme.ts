import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

import {AppState} from "../reducer";

interface Theme {
    isDark: boolean;
}

const initialState: Theme = {
    isDark: true,
};

const slice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        toggleTheme: (theme, _action: PayloadAction<undefined>) => {
            theme.isDark = !theme.isDark;
        },
    },
});

export const {toggleTheme} = slice.actions;
export type ActionTypes = typeof slice.actions;
export default slice.reducer;

export const getIsThemeDark = createSelector(
    (state: AppState) => state.entities.theme,
    (theme: Theme) => theme.isDark,
);
