import {useCallback, useState} from "react";

import {storageKeys} from "../storage/keys";
import {StorageHelper} from "../utils/localStorage";

type UseTime = () => [(newTime: number) => void];

export const useTime: UseTime = () => {
    const [storageTime, setStorageTime] = useState<number>(0);

    const saveTime = useCallback(
        (newTime: number) => {
            console.log("Saving time: " + newTime);
            if (storageTime === newTime) return;
            StorageHelper.set("time", newTime);
            setStorageTime(newTime);
        },
        [storageTime],
    );

    // useEffect(() => {
    //     saveTime(time);
    // }, [time, saveTime]);

    return [saveTime];
};
