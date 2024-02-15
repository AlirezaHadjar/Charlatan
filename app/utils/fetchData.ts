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
import {StorageHelper} from "./localStorage";

export const fetchData = async () => {
    try {
        // Restore data from Storage
        const storagePlayers = StorageHelper.getString<User[]>("players");
        const storageLocations =
            StorageHelper.getString<Location[]>("locations");
        const storageTime = StorageHelper.getNumber("time");
        const storageSpiesLength =
            StorageHelper.getString<string>("spiesLength");
        const storageLanguage =
            StorageHelper.getString<LanguageName>("language");
        const storageGames = StorageHelper.getString<Game[]>("games");

        const players: User[] = storagePlayers || defaultData.players;
        const locations: Location[] = storageLocations || defaultData.locations;
        const time: number = storageTime || defaultData.time;
        const language: LanguageName = storageLanguage || "en";
        const spiesLength: number = storageSpiesLength
            ? JSON.parse(storageSpiesLength)
            : defaultData.spiesLength;
        const games: Game[] = storageGames || defaultData.games;

        // Fake Data

        // const games1: Game[] = [
        //     {
        //         id: "1",
        //         name: "Our Family",
        //         updatedAt: 123,
        //         players: [
        //             {
        //                 id: players[0].id,
        //                 score: 0,
        //             },
        //         ],
        //         rounds: [],
        //         spiesLength: 1,
        //         currentRoundIndex: 0,
        //     },
        //     {
        //         id: "2",
        //         name: "Our Friend",
        //         updatedAt: 123,
        //         players: [
        //             {
        //                 id: players[0].id,
        //                 score: 0,
        //             },
        //         ],
        //         rounds: [],
        //         spiesLength: 1,
        //         currentRoundIndex: 1,
        //     },
        //     {
        //         id: "3",
        //         name: "Our Co-Worker",
        //         updatedAt: 123,
        //         players: [
        //             {
        //                 id: players[0].id,
        //                 score: 0,
        //             },
        //         ],
        //         rounds: [],
        //         spiesLength: 1,
        //         currentRoundIndex: 2,
        //     },
        // ];

        store.dispatch(setLanguage(language));
        store.dispatch(setPlayers(players));
        store.dispatch(setLocations(locations));
        store.dispatch(setTime(time));
        store.dispatch(setSpiesLength(spiesLength));
        store.dispatch(setGames(games));
    } catch (error) {
        console.log("Error happened", error);
    }
};
