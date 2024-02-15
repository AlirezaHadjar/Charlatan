import {useCallback, useEffect, useState} from "react";

import {storageKeys} from "../storage/keys";
import {Game} from "../types";
import {StorageHelper} from "../utils/localStorage";

export const useGames = (games: Game[]) => {
    const [storageGames, setStorageGames] = useState<Game[]>([]);

    const saveGames = useCallback(
        (newGames: Game[]) => {
            if (storageGames === newGames) return;
            StorageHelper.set("games", newGames);
            setStorageGames(newGames);
        },
        [storageGames],
    );

    useEffect(() => {
        saveGames(games);
    }, [games, saveGames]);
};
