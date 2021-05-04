import {combineReducers} from "redux";

import dataReducer from "./reducers/data";
import languageReducer from "./reducers/language";
import alertReducer from "./reducers/alert";
import themeReducer from "./reducers/theme";

const rootReducer = combineReducers({
    data: dataReducer,
    language: languageReducer,
    alert: alertReducer,
    theme: themeReducer,
});

export default rootReducer;
