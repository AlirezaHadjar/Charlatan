import Animated from "react-native-reanimated";

export type Strumber = string | number;

export interface Data {
    players: Player[];
    time: number;
    locations: Location[];
    spiesLength: number;
    spiesIds: string[];
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
