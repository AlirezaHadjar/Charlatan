import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import Main from "../screens/Main";
import Test from "../screens/Test";
import Guide from "../screens/Guide";
import Time from "../screens/Settings/Time";
import Players from "../screens/Settings/Players";
import Locations from "../screens/Settings/Locations";
import StartGame from "../screens/Game/StartGame";
import SelectGame from "../screens/Game/SelectGame";

import GameNavigator from "./GameNavigator";

export type AppRoute = {
    Main: undefined;
    Test: undefined;
    Guide: undefined;
    Players: undefined;
    Time: undefined;
    Locations: undefined;
    GameNavigator: undefined;
    SelectGame: undefined;
    StartGame: undefined;
};

const Stack = createStackNavigator<AppRoute>();

const AppNavigator: React.FC = () => (
    <Stack.Navigator
        headerMode="none"
        initialRouteName="Main"
        screenOptions={() => ({
            transitionSpec: {
                open: {animation: "timing", config: {duration: 200}},
                close: {animation: "timing", config: {duration: 200}},
            },
            cardStyleInterpolator: ({current: {progress}}) => ({
                cardStyle: {opacity: progress},
            }),
        })}>
        <Stack.Screen component={Main} name="Main" />
        <Stack.Screen component={Guide} name="Guide" />
        <Stack.Screen component={Test} name="Test" />
        <Stack.Screen component={Players} name="Players" />
        <Stack.Screen component={Time} name="Time" />
        <Stack.Screen component={SelectGame} name="SelectGame" />
        <Stack.Screen component={StartGame} name="StartGame" />
        <Stack.Screen component={Locations} name="Locations" />
        <Stack.Screen component={GameNavigator} name="GameNavigator" />
    </Stack.Navigator>
);

export default AppNavigator;
