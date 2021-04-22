import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {LanguageName} from "../types";

export const useLanguage = (language: LanguageName) => {
    const [storageLanguage, setStorageLanguage] = useState<LanguageName>("en");

    const saveLanguage = useCallback(
        (newLanguage: LanguageName) => {
            if (storageLanguage === newLanguage) return;
            AsyncStorage.setItem(storageKeys.language, newLanguage);
            setStorageLanguage(newLanguage);
        },
        [storageLanguage],
    );

    useEffect(() => {
        saveLanguage(language);
    }, [language, saveLanguage]);
};
