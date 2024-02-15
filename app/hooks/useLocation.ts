import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {Location} from "../types";
import {StorageHelper} from "../utils/localStorage";

export const useLocation = (locations: Location[]) => {
    const [storageLocations, setStorageLocations] = useState<Location[]>([]);

    const saveLocations = useCallback(
        (newLocations: Location[]) => {
            if (storageLocations === newLocations) return;
            StorageHelper.set("locations", newLocations);
            setStorageLocations(newLocations);
        },
        [storageLocations],
    );

    useEffect(() => {
        saveLocations(locations);
    }, [locations, saveLocations]);
};
