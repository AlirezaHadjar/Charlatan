import AsyncStorage from "@react-native-async-storage/async-storage";
import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {Game} from "../types";

export const useGames = (games: Game[]) => {
    const [storageGames, setStorageGames] = useState<Game[]>([]);

    const saveGames = useCallback(
        (newGames: Game[]) => {
            if (storageGames === newGames) return;
            AsyncStorage.setItem(storageKeys.games, JSON.stringify(newGames));
            setStorageGames(newGames);
        },
        [storageGames],
    );

    useEffect(() => {
        saveGames(games);
    }, [games, saveGames]);
};
