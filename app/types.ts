import Animated from "react-native-reanimated";

export type Strumber = string | number;

export interface Data {
    players: Player[];
    time: number;
    locations: Location[];
    selectedLocation: Location | undefined;
    spiesLength: number;
    spiesIds: string[];
    gameResult: GameResult | undefined;
}

export interface Player {
    id: string;
    name: string;
    role: string;
}

export interface Location {
    name: string;
    id: string;
}

export interface PickerItem {
    item: {title: string; id: string};
    index: number;
    offset: Animated.SharedValue<number>;
}

export interface Vote {
    voterId: string;
    votedId: string;
}
export interface Guess {
    guesserId: string;
    guessedId: string;
}

export enum Winners {
    Citizens = "Citizens",
    Spies = "Spies",
}

export type Winner = Winners.Citizens | Winners.Spies;

export interface VotingResult {
    playerId: string;
    playerName: string;
    numberOfVotes: number;
}
export interface GameResult {
    winner: Winner;
    votingResult: VotingResult[];
    spiesWhoGuessedCorrectlyIds: string[];
}
