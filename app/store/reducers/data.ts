import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

import {Data, GameResult, Player} from "../../types";
import {AppState} from "../reducer";

const initialState: Data = {
    players: [],
    locations: [],
    time: 300, // In Second
    spiesLength: 1,
    spiesIds: [],
    selectedLocation: undefined,
    gameResult: undefined,
};

const slice = createSlice({
    name: "user",
    initialState,
    reducers: {
        addPlayer: (data, {payload}: PayloadAction<string>) => {
            data.players.push({
                id: `${Math.random()}`,
                name: payload,
                role: "",
            });
        },
        removePlayer: (data, {payload: id}: PayloadAction<string>) => {
            const index = data.players.findIndex((player) => player.id === id);
            if (index === -1) return;
            data.players.splice(index, 1);
        },
        editPlayer: (data, {payload}: PayloadAction<Partial<Player>>) => {
            const index = data.players.findIndex(
                (player) => player.id === payload.id,
            );
            if (index === -1) return;
            for (const property in payload) {
                data.players[index][property as keyof typeof payload] =
                    payload[property as keyof typeof payload];
            }
        },
        startGame: (data, _action: PayloadAction<undefined>) => {
            // Assign Spy Role to Players
            const ids: string[] = [];
            const clonedPlayers = [...data.players];
            new Array(data.spiesLength).fill(0).forEach((_) => {
                const index = Math.floor(Math.random() * clonedPlayers.length);
                ids.push(clonedPlayers[index].id);
                clonedPlayers.splice(index, 1);
            });
            data.spiesIds = ids;
            // Select Location
            data.selectedLocation =
                data.locations[
                    Math.floor(Math.random() * data.locations.length)
                ];
        },
        setTime: (data, {payload}: PayloadAction<number>) => {
            data.time = payload;
        },
        setGameResult: (data, {payload}: PayloadAction<GameResult>) => {
            data.gameResult = payload;
        },
        setSpiesLength: (data, {payload}: PayloadAction<number>) => {
            data.spiesLength = payload;
        },
        addLocation: (data, {payload}: PayloadAction<string>) => {
            data.locations.push({
                id: `${Math.random()}`,
                name: payload,
            });
        },
        removeLocation: (data, {payload: id}: PayloadAction<string>) => {
            const index = data.locations.findIndex(
                (location) => location.id === id,
            );
            if (index === -1) return;
            data.locations.splice(index, 1);
        },
        editLocation: (data, {payload}: PayloadAction<Partial<Player>>) => {
            const index = data.locations.findIndex(
                (player) => player.id === payload.id,
            );
            if (index === -1) return;
            for (const property in payload) {
                data.locations[index][property as keyof typeof payload] =
                    payload[property as keyof typeof payload];
            }
        },
        resetGame: (data, _action: PayloadAction<undefined>) => {
            data.gameResult = undefined;
            data.selectedLocation = undefined;
            data.spiesIds = [];
        },
    },
});

export const {
    setTime,
    setGameResult,
    setSpiesLength,
    addLocation,
    addPlayer,
    editLocation,
    editPlayer,
    removeLocation,
    removePlayer,
    startGame,
    resetGame,
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
export const getGameResult = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.gameResult,
);
export const getLocations = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.locations,
);
export const getSelectedLocation = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.selectedLocation,
);
export const getSpiesIds = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.spiesIds,
);
export const getSpiesLength = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.spiesLength,
);
