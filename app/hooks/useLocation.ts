import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {Location} from "../types";

export const useLocation = (locations: Location[]) => {
    const [storageLocations, setStorageLocations] = useState<Location[]>([]);

    const saveLocations = useCallback(
        (newLocations: Location[]) => {
            if (storageLocations === newLocations) return;
            AsyncStorage.setItem(
                storageKeys.locations,
                JSON.stringify(newLocations),
            );
            setStorageLocations(newLocations);
        },
        [storageLocations],
    );

    useEffect(() => {
        saveLocations(locations);
    }, [locations, saveLocations]);
};
