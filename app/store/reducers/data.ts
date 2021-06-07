import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

import {Data, Game, Location, Player, Round, User, Winners} from "../../types";
import {AppState} from "../reducer";

const newRound: Round = {
    selectedLocationId: "",
    spiesIds: [],
    spiesWhoGuessedCorrectlyIds: [],
    votingResult: [],
    winner: Winners.Citizens,
};

const initialState: Data = {
    players: [],
    locations: [],
    time: 300, // In Second
    spiesLength: 1,
    activeGameId: "",
    games: [],
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addPlayer: (
            data,
            {payload}: PayloadAction<{fa: string; en: string}>,
        ) => {
            data.players.push({
                id: `${Math.random()}`,
                name: {
                    fa: payload.fa,
                    en: payload.en,
                },
            });
        },
        setPlayers: (data, {payload}: PayloadAction<User[]>) => {
            data.players = payload;
        },
        removePlayer: (data, {payload: id}: PayloadAction<string>) => {
            const index = data.players.findIndex((player) => player.id === id);
            if (index === -1) return;
            data.players.splice(index, 1);
        },
        editPlayer: (data, {payload}: PayloadAction<Partial<User>>) => {
            const index = data.players.findIndex(
                (player) => player.id === payload.id,
            );
            if (index === -1) return;
            data.players[index] = Object.assign(data.players[index], payload);
        },
        setActiveGameId: (data, {payload}: PayloadAction<string>) => {
            data.activeGameId = payload;
        },
        startGame: (data, _action: PayloadAction<undefined>) => {
            // Assign Spy Role to Players
            let ids: string[] = [];
            const usersIds = data.players.map((user) => user.id);
            const index = data.games.findIndex(
                (game) => game.id === data.activeGameId,
            );
            if (index === -1) return;
            data.games[index].players = data.games[
                index
            ].players.filter((player) => usersIds.includes(player.id));
            data.games[index].rounds.forEach((round) => {
                const clonedPlayers = [...data.games[index].players];
                ids = [];
                new Array(data.spiesLength).fill(0).forEach((_) => {
                    const index = Math.floor(
                        Math.random() * clonedPlayers.length,
                    );
                    ids.push(clonedPlayers[index].id);
                    clonedPlayers.splice(index, 1);
                });
                round.spiesIds = ids;
                // Select Location
                round.selectedLocationId =
                    data.locations[
                        Math.floor(Math.random() * data.locations.length)
                    ].id;
            });
        },
        setTime: (data, {payload}: PayloadAction<number>) => {
            data.time = payload;
        },
        setSpiesLength: (data, {payload}: PayloadAction<number>) => {
            data.spiesLength = payload;
        },
        addLocation: (
            data,
            {payload}: PayloadAction<{fa: string; en: string}>,
        ) => {
            data.locations.push({
                id: `${Math.random()}`,
                name: {
                    fa: payload.fa,
                    en: payload.en,
                },
            });
        },
        setLocations: (data, {payload}: PayloadAction<Location[]>) => {
            data.locations = payload;
        },
        setGames: (data, {payload}: PayloadAction<Game[]>) => {
            data.games = payload;
        },
        removeLocation: (data, {payload: id}: PayloadAction<string>) => {
            const index = data.locations.findIndex(
                (location) => location.id === id,
            );
            if (index === -1) return;
            data.locations.splice(index, 1);
        },
        editLocation: (data, {payload}: PayloadAction<Partial<Location>>) => {
            const index = data.locations.findIndex(
                (location) => location.id === payload.id,
            );
            if (index === -1) return;
            data.locations[index] = Object.assign(
                data.locations[index],
                payload,
            );
        },
        editGame: (data, {payload}: PayloadAction<Partial<Game>>) => {
            const index = data.games.findIndex(
                (game) => game.id === payload.id,
            );
            if (index === -1) return;
            for (const key in payload) {
                data.games[index][key] = payload[key];
            }
            data.games[index].updatedAt = Date.now();
            // console.log("index", data.games[index].players);
        },
        editRound: (
            data,
            {payload}: PayloadAction<{gameId: string; mode: "add" | "sub"}>,
        ) => {
            const index = data.games.findIndex(
                (game) => game.id === payload.gameId,
            );
            if (index === -1) return;
            if (payload.mode === "add") data.games[index].rounds.push(newRound);
            else data.games[index].rounds.splice(-1, 1);
        },
        setGameResult: (
            data,
            {payload}: PayloadAction<{gameId: string; round: Partial<Round>}>,
        ) => {
            const index = data.games.findIndex(
                (game) => game.id === payload.gameId,
            );
            if (index === -1) return;
            data.games[index].rounds[
                data.games[index].currentRoundIndex
            ] = Object.assign(
                data.games[index].rounds[data.games[index].currentRoundIndex],
                payload.round,
            );
        },
        resetGame: (_data, _action: PayloadAction<undefined>) => {
            // data.gameResult = undefined;
            // data.selectedLocation = undefined;
            // data.spiesIds = [];
        },
    },
});

export const {
    setTime,
    setGames,
    setSpiesLength,
    setActiveGameId,
    addLocation,
    addPlayer,
    editLocation,
    editPlayer,
    editGame,
    editRound,
    removeLocation,
    removePlayer,
    startGame,
    resetGame,
    setPlayers,
    setLocations,
    setGameResult,
} = slice.actions;
export type ActionTypes = typeof slice.actions;
export default slice.reducer;

export const getPlayers = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.players,
);
export const getTime = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.time,
);
export const getActiveGameId = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.activeGameId,
);
export const getGames = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.games,
);
export const getLocations = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.locations,
);
export const getGame = (gameId: string) =>
    createSelector(
        (state: AppState) => state.entities.data,
        (data: Data) => data.games.find((game) => game.id === gameId),
    );
export const getSpiesLength = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.spiesLength,
);
export const getLocation = (locationId?: string) =>
    createSelector(
        (state: AppState) => state.entities.data,
        (data: Data) =>
            data.locations.find((location) => location.id === locationId || ""),
    );
export const getPlayersByPlayers = (players?: Player[]) =>
    createSelector(
        (state: AppState) => state.entities.data,
        (data: Data) => {
            const newPlayers = players || [];
            const ids = newPlayers.map((player) => player.id);
            return data.players.filter((player) => ids.includes(player.id));
        },
    );
