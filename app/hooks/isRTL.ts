import {useSelector} from "react-redux";

import {getLanguageName} from "../store/reducers/language";

export const useRTL = () => {
    const language = useSelector(getLanguageName);
    return language === "en" ? false : true;
};
