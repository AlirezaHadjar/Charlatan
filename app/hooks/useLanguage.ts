import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {LanguageName} from "../types";
import {StorageHelper} from "../utils/localStorage";

export const useLanguage = (language: LanguageName) => {
    const [storageLanguage, setStorageLanguage] = useState<LanguageName>("en");

    const saveLanguage = useCallback(
        (newLanguage: LanguageName) => {
            if (storageLanguage === newLanguage) return;
            StorageHelper.set("language", newLanguage);
            setStorageLanguage(newLanguage);
        },
        [storageLanguage],
    );

    useEffect(() => {
        saveLanguage(language);
    }, [language, saveLanguage]);
};
