import {combineReducers} from "redux";

import dataReducer from "./reducers/data";
import languageReducer from "./reducers/language";

const rootReducer = combineReducers({
    data: dataReducer,
    language: languageReducer,
});

export default rootReducer;
