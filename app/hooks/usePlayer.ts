import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {Player} from "../types";

export const usePlayer = (players: Player[]) => {
    const [storagePlayers, setStoragePlayers] = useState<Player[]>([]);

    const savePlayers = useCallback(
        (newPlayers: Player[]) => {
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
