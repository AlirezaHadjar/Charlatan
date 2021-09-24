/* eslint-disable camelcase */
import Animated from "react-native-reanimated";

import {languageDatas} from "./language/index";

export type Strumber = string | number;

export type Stage = "Config" | "Finalize";
export interface Data {
    players: User[];
    time: number;
    locations: Location[];
    spiesLength: number;
    games: Game[];
    activeGameId: string;
}

export interface Round {
    spiesIds: string[];
    selectedLocationId: string;
    winner: Winner;
    votingResult: VotingResult[];
    spiesWhoGuessedCorrectlyIds: string[];
}

export interface Game {
    id: string;
    name: string;
    currentRoundIndex: number;
    spiesLength: number;
    rounds: Round[];
    players: Player[];
    updatedAt: number;
    isNew?: boolean;
}
export interface Guide {
    id: string;
    title: string;
    description: string;
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

export interface Name {
    en: string;
    fa: string;
}

export interface User {
    id: string;
    name: Name;
}

export interface Player {
    score: number;
    id: string;
}

export interface Location {
    name: Name;
    id: string;
}

export interface PickerItem {
    item: {title: string; id: string};
    index: number;
    offset: Animated.SharedValue<number>;
    itemHeight: number;
    itemWidth?: number;
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

export interface NativeAd {
    icon_url: string;
    description: string;
    landscape_static_image_url: string;
    call_to_action_text: string;
    title: string;
}
