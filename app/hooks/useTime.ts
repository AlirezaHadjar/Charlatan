import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useState} from "react";

import {storageKeys} from "../storage/keys";

export const useTime = () => {
    const [storageTime, setStorageTime] = useState<number>(0);

    const saveTime = useCallback(
        (newTime: number) => {
            if (storageTime === newTime) return;
            AsyncStorage.setItem(storageKeys.time, JSON.stringify(newTime));
            setStorageTime(newTime);
        },
        [storageTime],
    );

    // useEffect(() => {
    //     saveTime(time);
    // }, [time, saveTime]);

    return [saveTime];
};
