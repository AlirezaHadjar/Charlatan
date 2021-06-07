import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {User} from "../types";

export const usePlayer = (players: User[]) => {
    const [storagePlayers, setStoragePlayers] = useState<User[]>([]);

    const savePlayers = useCallback(
        (newPlayers: User[]) => {
            if (storagePlayers === newPlayers) return;
            AsyncStorage.setItem(
                storageKeys.players,
                JSON.stringify(newPlayers),
            );
            setStoragePlayers(newPlayers);
        },
        [storagePlayers],
    );

    useEffect(() => {
        savePlayers(players);
    }, [players, savePlayers]);
};
