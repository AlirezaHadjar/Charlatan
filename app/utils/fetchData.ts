import AsyncStorage from "@react-native-async-storage/async-storage";

import {storageKeys} from "../storage/keys";
import {store} from "../store/getStore";
import {
    setGames,
    setLocations,
    setPlayers,
    setSpiesLength,
    setTime,
} from "../store/reducers/data";
import {defaultData} from "../storage/default";
import {setLanguage} from "../store/reducers/language";
import {Game, LanguageName, Location, User} from "../types";

export const fetchData = async () => {
    // Restore data from Storage
    const [
        storagePlayers,
        storageLocations,
        storageTime,
        storageSpiesLength,
        storageLanguage,
    ] = await Promise.all([
        AsyncStorage.getItem(storageKeys.players),
        AsyncStorage.getItem(storageKeys.locations),
        AsyncStorage.getItem(storageKeys.time),
        AsyncStorage.getItem(storageKeys.spiesLength),
        AsyncStorage.getItem(storageKeys.language),
    ]);
    const players: User[] = storagePlayers
        ? JSON.parse(storagePlayers)
        : defaultData.players;
    const locations: Location[] = storageLocations
        ? JSON.parse(storageLocations)
        : defaultData.locations;
    const time: number = storageTime
        ? JSON.parse(storageTime)
        : defaultData.time;
    const language: LanguageName = storageLanguage
        ? (storageLanguage as LanguageName)
        : "en";
    const spiesLength: number = storageSpiesLength
        ? JSON.parse(storageSpiesLength)
        : defaultData.spiesLength;

    // Fake Data

    const games: Game[] = [
        {
            id: "1",
            name: "Our Family",
            updatedAt: 123,
            players: [
                {
                    id: players[0].id,
                    score: 0,
                },
            ],
            rounds: [],
            currentRoundIndex: 0,
        },
        {
            id: "2",
            name: "Our Friend",
            updatedAt: 123,
            players: [
                {
                    id: players[0].id,
                    score: 0,
                },
            ],
            rounds: [],
            currentRoundIndex: 1,
        },
        {
            id: "3",
            name: "Our Co-Worker",
            updatedAt: 123,
            players: [
                {
                    id: players[0].id,
                    score: 0,
                },
            ],
            rounds: [],
            currentRoundIndex: 2,
        },
    ];

    store.dispatch(setLanguage(language));
    store.dispatch(setPlayers(players));
    store.dispatch(setLocations(locations));
    store.dispatch(setTime(time));
    store.dispatch(setSpiesLength(spiesLength));
    store.dispatch(setGames(games));
    return;
};
