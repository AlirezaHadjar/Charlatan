import {useSelector} from "./useSelector";

export const useTranslation = () => {
    const language = useSelector((state) => state.entities.language.language);
    return useSelector((state) => state.entities.language.content[language]);
};
