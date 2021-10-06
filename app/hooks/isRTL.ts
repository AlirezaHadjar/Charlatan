import {useSelector} from "react-redux";

import {getLanguageRTL} from "../store/reducers/language";

export const useRTL = () => useSelector(getLanguageRTL);
