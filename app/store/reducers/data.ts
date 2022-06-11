import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {createSelector} from "reselect";

import {Data, Game, Location, Player, Round, User, Winners} from "../../types";
import {AppState} from "../reducer";

const newRound: Round = {
    selectedLocationId: "",
    spiesIds: [],
    spiesWhoGuessedCorrectlyIds: [],
    citizensWhoGuessedCorrectlyIds: [],
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
            const index = data.players.findIndex(player => player.id === id);
            if (index === -1) {
                return;
            }
            data.players.splice(index, 1);
        },
        editPlayer: (data, {payload}: PayloadAction<Partial<User>>) => {
            const index = data.players.findIndex(
                player => player.id === payload.id,
            );
            if (index === -1) {
                return;
            }
            data.players[index] = Object.assign(data.players[index], payload);
        },
        setActiveGameId: (data, {payload}: PayloadAction<string>) => {
            data.activeGameId = payload;
        },
        startOverAGame: (data, _action: PayloadAction<undefined>) => {
            const activeGameIndex = data.games.findIndex(
                game => game.id === data.activeGameId,
            );
            data.games[activeGameIndex].currentRoundIndex = 0;
            const roundsLength = data.games[activeGameIndex].rounds.length;
            data.games[activeGameIndex].rounds = [];
            for (let i = 0; i < roundsLength; i++) {
                data.games[activeGameIndex].rounds.push(newRound);
            }
            data.games[activeGameIndex].updatedAt = Date.now();
        },
        startGame: (data, _action: PayloadAction<undefined>) => {
            // Assign Spy Role to Players
            let ids: string[] = [];
            const usersIds = data.players.map(user => user.id);
            const activeGameIndex = data.games.findIndex(
                game => game.id === data.activeGameId,
            );
            if (activeGameIndex === -1) {
                return;
            }
            data.games[activeGameIndex].players = data.games[
                activeGameIndex
            ].players.filter(player => usersIds.includes(player.id));
            data.games[activeGameIndex].rounds.forEach(round => {
                const clonedPlayers = [...data.games[activeGameIndex].players];
                const {spiesLength} = data.games[activeGameIndex];
                ids = [];
                new Array(spiesLength).fill(0).forEach(_ => {
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
        calculateScores: (data, _action: PayloadAction<undefined>) => {
            const activeGameIndex = data.games.findIndex(
                game => game.id === data.activeGameId,
            );
            if (activeGameIndex === -1) {
                return;
            }
            const activeGame = data.games[activeGameIndex]!;
            const clonedPlayers = [...activeGame.players];
            const activeRound =
                activeGame.rounds[activeGame.currentRoundIndex]!;
            const {winner} = activeRound;
            if (winner === Winners.Citizens) {
                activeGame.players = activeGame.players.map((player, i) => {
                    if (activeRound.spiesIds.includes(player.id)) {
                        return player;
                    }
                    const previousScore = clonedPlayers[i].score;
                    return {
                        ...player,
                        previousScore,
                        score: player.score + 1,
                    };
                });
            } else {
                activeGame.players = activeGame.players.map((player, i) => {
                    if (!activeRound.spiesIds.includes(player.id)) {
                        return player;
                    }
                    const previousScore = clonedPlayers[i].score;
                    const score =
                        activeRound.spiesWhoGuessedCorrectlyIds.includes(
                            player.id,
                        )
                            ? 3
                            : 2;
                    return {
                        ...player,
                        previousScore,
                        score: player.score + score,
                    };
                });
            }
            activeGame.players = activeGame.players.map((player, i) => {
                if (
                    !activeRound.citizensWhoGuessedCorrectlyIds.includes(
                        player.id,
                    )
                ) {
                    return player;
                }
                const previousScore = clonedPlayers[i].score;
                return {
                    ...player,
                    previousScore,
                    score: player.score + 1,
                };
            });
        },
        resetScores: (data, _action: PayloadAction<undefined>) => {
            const activeGameIndex = data.games.findIndex(
                game => game.id === data.activeGameId,
            );
            if (activeGameIndex === -1) {
                return;
            }
            const activeGame = data.games[activeGameIndex];
            data.games[activeGameIndex].players = activeGame.players.map(
                player => ({
                    ...player,
                    score: 0,
                    previousScore: 0,
                }),
            );
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
        addNewGame: (
            data,
            {payload}: PayloadAction<{name?: string; id: string}>,
        ) => {
            data.games.push({
                id: payload.id,
                currentRoundIndex: 0,
                name: payload.name || "New Game",
                players: [],
                rounds: [],
                spiesLength: 1,
                updatedAt: Date.now(),
                isNew: true,
            });
        },
        removeLocation: (data, {payload: id}: PayloadAction<string>) => {
            const index = data.locations.findIndex(
                location => location.id === id,
            );
            if (index === -1) {
                return;
            }
            data.locations.splice(index, 1);
        },
        editLocation: (data, {payload}: PayloadAction<Partial<Location>>) => {
            const index = data.locations.findIndex(
                location => location.id === payload.id,
            );
            if (index === -1) {
                return;
            }
            data.locations[index] = Object.assign(
                data.locations[index],
                payload,
            );
        },
        editGame: (data, {payload}: PayloadAction<Partial<Game>>) => {
            const index = data.games.findIndex(game => game.id === payload.id);
            if (index === -1) {
                return;
            }
            for (const key in payload) {
                data.games[index][key] = payload[key];
            }
            data.games[index].updatedAt = Date.now();
        },
        deleteGame: (data, {payload}: PayloadAction<Partial<string>>) => {
            const index = data.games.findIndex(game => game.id === payload);
            if (index === -1) {
                return;
            }
            data.games.splice(index, 1);
        },
        editRound: (
            data,
            {payload}: PayloadAction<{gameId: string; mode: "add" | "sub"}>,
        ) => {
            const index = data.games.findIndex(
                game => game.id === payload.gameId,
            );
            if (index === -1) {
                return;
            }
            const {rounds} = data.games[index];
            if (payload.mode === "add") {
                if (rounds.length < 10) {
                    data.games[index].rounds.push(newRound);
                }
                return;
            }
            if (rounds.length > 1) {
                data.games[index].rounds.splice(-1, 1);
            }
            return;
        },
        editSpiesLength: (
            data,
            {payload}: PayloadAction<{gameId: string; mode: "add" | "sub"}>,
        ) => {
            const index = data.games.findIndex(
                game => game.id === payload.gameId,
            );
            if (index === -1) {
                return;
            }
            const {spiesLength} = data.games[index];
            if (payload.mode === "add") {
                if (
                    spiesLength <
                    Math.floor(data.games[index].players.length / 3)
                ) {
                    data.games[index].spiesLength =
                        data.games[index].spiesLength + 1;
                }
                return;
            }
            if (spiesLength > 1) {
                data.games[index].spiesLength--;
            }
            return;
        },
        setGameResult: (
            data,
            {payload}: PayloadAction<{gameId: string; round: Partial<Round>}>,
        ) => {
            const index = data.games.findIndex(
                game => game.id === payload.gameId,
            );
            if (index === -1) {
                return;
            }
            data.games[index].rounds[data.games[index].currentRoundIndex] =
                Object.assign(
                    data.games[index].rounds[
                        data.games[index].currentRoundIndex
                    ],
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
    startOverAGame,
    setActiveGameId,
    addLocation,
    addPlayer,
    editLocation,
    editPlayer,
    editGame,
    editSpiesLength,
    editRound,
    removeLocation,
    removePlayer,
    resetScores,
    startGame,
    resetGame,
    setPlayers,
    setLocations,
    setGameResult,
    addNewGame,
    calculateScores,
    deleteGame,
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
        data => data.games.find(game => game.id === gameId),
    );
export const getSpiesLength = createSelector(
    (state: AppState) => state.entities.data,
    (data: Data) => data.spiesLength,
);
export const getLocation = (locationId?: string) =>
    createSelector(
        (state: AppState) => state.entities.data,
        (data: Data) =>
            data.locations.find(location => location.id === locationId || ""),
    );
export const getPlayersByPlayers = (players?: Player[]) =>
    createSelector(
        (state: AppState) => state.entities.data,
        (data: Data) => {
            const newPlayers = players || [];
            const ids = newPlayers.map(player => player.id);
            return data.players.filter(player => ids.includes(player.id));
        },
    );
