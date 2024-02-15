import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {StorageHelper} from "../utils/localStorage";

export const useSpy = (spiesLength: number) => {
    const [storageSpiesLength, setStorageSpiesLength] = useState<number>(0);

    const saveSpiesLength = useCallback(
        (newLength: number) => {
            if (storageSpiesLength === newLength) return;
            StorageHelper.set("spiesLength", JSON.stringify(newLength));
            setStorageSpiesLength(newLength);
        },
        [storageSpiesLength],
    );

    useEffect(() => {
        saveSpiesLength(spiesLength);
    }, [spiesLength, saveSpiesLength]);
};
