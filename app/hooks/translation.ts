import {useSelector} from "react-redux";

import {getLanguageData} from "../store/reducers/language";

export const useTranslation = () => {
    return useSelector(getLanguageData);
};
