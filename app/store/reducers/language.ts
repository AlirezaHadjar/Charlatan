import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

import {languageDatas} from "../../language";
import {Language, LanguageName} from "../../types";
import {AppState} from "../reducer";

const initialState: Language = {
    name: "en",
    data: languageDatas.en,
};

const slice = createSlice({
    name: "language",
    initialState,
    reducers: {
        setLanguage: (language, {payload}: PayloadAction<LanguageName>) => {
            language.name = payload;
            language.data = languageDatas[payload];
        },
    },
});

export const {setLanguage} = slice.actions;
export type ActionTypes = typeof slice.actions;
export default slice.reducer;

export const getLanguageName = createSelector(
    (state: AppState) => state.entities.language,
    (language: Language) => language.name,
);
export const getLanguageData = createSelector(
    (state: AppState) => state.entities.language,
    (language: Language) => language.data,
);
export const getIsRTL = createSelector(
    (state: AppState) => state.entities.language,
    (language: Language) => language.name === "fa",
);
