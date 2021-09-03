import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {TransitionSpec} from "@react-navigation/stack/lib/typescript/src/types";

import Main from "../screens/Main";
import Test from "../screens/Test";
import Guide from "../screens/Guide";
import Time from "../screens/Settings/Time";
import Players from "../screens/Settings/Players";
import Locations from "../screens/Settings/Locations";
import StartGame from "../screens/Game/StartGame";
import SelectGame from "../screens/Game/SelectGame";
import Settings from "../screens/Settings";
import AboutUs from "../screens/Settings/AboutUs";
import Language from "../screens/Settings/Language";

import GameNavigator, {GameRoutes} from "./GameNavigator";

export type AppRoute = {
    Settings: undefined;
    Main: undefined;
    Test: undefined;
    Guide: undefined;
    Players: undefined;
    Time: undefined;
    Locations: undefined;
    GameNavigator: undefined;
    SelectGame: undefined;
    StartGame: undefined;
    AboutUs: undefined;
    Language: undefined;
};

interface Routes extends AppRoute, GameRoutes {}

export type RouteName = keyof Routes;

const Stack = createStackNavigator<AppRoute>();

const transitionSpec: TransitionSpec = {
    animation: "timing",
    config: {duration: 200},
};

const AppNavigator: React.FC = () => (
    <Stack.Navigator
        headerMode="none"
        initialRouteName="Main"
        screenOptions={() => ({
            transitionSpec: {
                open: transitionSpec,
                close: transitionSpec,
            },
            gestureEnabled: false,
            cardStyleInterpolator: ({current: {progress: opacity}}) => ({
                cardStyle: {opacity},
            }),
        })}>
        <Stack.Screen component={Main} name="Main" />
        <Stack.Screen component={Settings} name="Settings" />
        <Stack.Screen component={Guide} name="Guide" />
        <Stack.Screen component={Test} name="Test" />
        <Stack.Screen component={Players} name="Players" />
        <Stack.Screen component={Time} name="Time" />
        <Stack.Screen component={SelectGame} name="SelectGame" />
        <Stack.Screen component={StartGame} name="StartGame" />
        <Stack.Screen component={Locations} name="Locations" />
        <Stack.Screen component={GameNavigator} name="GameNavigator" />
        <Stack.Screen component={AboutUs} name="AboutUs" />
        <Stack.Screen component={Language} name="Language" />
    </Stack.Navigator>
);

export default AppNavigator;
