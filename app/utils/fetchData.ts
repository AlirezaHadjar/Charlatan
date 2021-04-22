import AsyncStorage from "@react-native-async-storage/async-storage";

import {storageKeys} from "../storage/keys";
import {store} from "../store/getStore";
import {
    setLocations,
    setPlayers,
    setSpiesLength,
    setTime,
} from "../store/reducers/data";
import {defaultData} from "../storage/default";
import {setLanguage} from "../store/reducers/language";
import {LanguageName} from "../types";

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
    const players = storagePlayers
        ? JSON.parse(storagePlayers)
        : defaultData.players;
    const locations = storageLocations
        ? JSON.parse(storageLocations)
        : defaultData.locations;
    const time = storageTime ? JSON.parse(storageTime) : defaultData.time;
    const language: LanguageName = storageLanguage
        ? (storageLanguage as LanguageName)
        : "en";
    const spiesLength = storageSpiesLength
        ? JSON.parse(storageSpiesLength)
        : defaultData.spiesLength;

    store.dispatch(setLanguage(language));
    store.dispatch(setPlayers(players));
    store.dispatch(setLocations(locations));
    store.dispatch(setTime(time));
    store.dispatch(setSpiesLength(spiesLength));
    return;
};
