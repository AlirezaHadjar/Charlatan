import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";

export const useSpy = (spiesLength: number) => {
    const [storageSpiesLength, setStorageSpiesLength] = useState<number>(0);

    const saveSpiesLength = useCallback(
        (newLength: number) => {
            if (storageSpiesLength === newLength) return;
            AsyncStorage.setItem(
                storageKeys.spiesLength,
                JSON.stringify(newLength),
            );
            setStorageSpiesLength(newLength);
        },
        [storageSpiesLength],
    );

    useEffect(() => {
        saveSpiesLength(spiesLength);
    }, [spiesLength, saveSpiesLength]);
};
