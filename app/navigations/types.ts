import type {
    CompositeScreenProps,
    NavigatorScreenParams,
} from "@react-navigation/native";
import type {StackScreenProps} from "@react-navigation/stack";

export type RootStackParamList = {
    GameNavigator: NavigatorScreenParams<GameNavigatorParamList>;
    Settings: undefined;
    Main: undefined;
    Test: undefined;
    Guide: undefined;
    Players: undefined;
    Time: undefined;
    Locations: undefined;
    SelectGame: undefined;
    StartGame: undefined;
    AboutUs: undefined;
    Language: undefined;
};

export type RootStackProps<T extends keyof RootStackParamList> =
    StackScreenProps<RootStackParamList, T>;

export type GameNavigatorParamList = {
    AssignRole: undefined;
    Timer: undefined;
    Vote: undefined;
    SpiesGuess: undefined;
    Result: undefined;
};

export type GameNavigatorStackProps<T extends keyof GameNavigatorParamList> =
    CompositeScreenProps<
        StackScreenProps<GameNavigatorParamList, T>,
        RootStackProps<keyof RootStackParamList>
    >;

declare global {
    namespace ReactNavigation {
        interface RootParamList extends RootStackParamList {}
    }
}

interface Routes extends RootStackParamList, GameNavigatorParamList {}

export type RouteName = keyof Routes;
