import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";

export const useTime = (time: number) => {
    const [storageTime, setStorageTime] = useState<number>(0);

    const saveTime = useCallback(
        (newTime: number) => {
            if (storageTime === newTime) return;
            AsyncStorage.setItem(storageKeys.time, JSON.stringify(newTime));
            setStorageTime(newTime);
        },
        [storageTime],
    );

    useEffect(() => {
        saveTime(time);
    }, [time, saveTime]);
};
