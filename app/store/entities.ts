import {combineReducers} from "redux";

import dataReducer from "./reducers/data";

const rootReducer = combineReducers({
    data: dataReducer,
});

export default rootReducer;
