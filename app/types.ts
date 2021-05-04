import Animated from "react-native-reanimated";

import {languageDatas} from "./language/index";

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

export interface Alert {
    id: string;
    variant?: "ask" | "info";
    text: string;
    acceptButtonText?: string;
    cancelButtonText?: string;
    onAccept?: () => void;
    onIgnore?: () => void;
    onCancel?: () => void;
}

export interface Player {
    id: string;
    name: {
        en: string;
        fa: string;
    };
    role: string;
}

export interface Location {
    name: {
        en: string;
        fa: string;
    };
    id: string;
}

export interface PickerItem {
    item: {title: string; id: string};
    index: number;
    offset: Animated.SharedValue<number>;
    itemHeight: number;
    maxWidth?: number;
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

export type LanguageName = keyof typeof languageDatas;

export type LanguageData = typeof languageDatas[keyof typeof languageDatas];

export interface Language {
    name: LanguageName;
    data: LanguageData;
}

export interface PickerRef {
    scrollToTitle: (title: string) => void;
}
