import {combineReducers} from "redux";

import dataReducer from "./reducers/data";
import languageReducer from "./reducers/language";
import alertReducer from "./reducers/alert";

const rootReducer = combineReducers({
    data: dataReducer,
    language: languageReducer,
    alert: alertReducer,
});

export default rootReducer;
