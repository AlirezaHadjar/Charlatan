import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import Main from "../screens/Main";
import Test from "../screens/Test";
import Guide from "../screens/Guide";
import Time from "../screens/Time";
import Players from "../screens/Players";
import Locations from "../screens/Locations";
import Game from "../screens/Game";

export type AppRoute = {
    Main: undefined;
    Test: undefined;
    Guide: undefined;
    Players: undefined;
    Time: undefined;
    Locations: undefined;
    Game: undefined;
};

const Stack = createStackNavigator<AppRoute>();

const AppNavigator: React.FC<{}> = ({}) => (
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
        <Stack.Screen component={Locations} name="Locations" />
        <Stack.Screen component={Game} name="Game" />
    </Stack.Navigator>
);

export default AppNavigator;
