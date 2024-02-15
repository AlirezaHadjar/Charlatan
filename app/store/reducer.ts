import {combineReducers} from "@reduxjs/toolkit";

import entitiesReducer from "./entities";

const rootReducer = combineReducers({
    entities: entitiesReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
