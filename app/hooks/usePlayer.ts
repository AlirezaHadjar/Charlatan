import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {User} from "../types";
import {StorageHelper} from "../utils/localStorage";

export const usePlayer = (players: User[]) => {
    const [storagePlayers, setStoragePlayers] = useState<User[]>([]);

    const savePlayers = useCallback(
        (newPlayers: User[]) => {
            if (storagePlayers === newPlayers) return;
            StorageHelper.set("players", newPlayers);
            setStoragePlayers(newPlayers);
        },
        [storagePlayers],
    );

    useEffect(() => {
        savePlayers(players);
    }, [players, savePlayers]);
};
