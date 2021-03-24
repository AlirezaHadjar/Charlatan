import {combineReducers} from "redux";

import entitiesReducer from "./entities";

const rootReducer = combineReducers({
    entities: entitiesReducer,
});

export default rootReducer;

export type AppState = ReturnType<typeof rootReducer>;
