import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import AssignRole from "../screens/Game/AssignRole";
import Timer from "../screens/Game/Timer";
import Vote from "../screens/Game/Vote";
import Result from "../screens/Game/Result";
import SpiesGuess from "../screens/Game/SpiesGuess";

import {screenOptions} from "./config";
import {GameNavigatorParamList} from "./types";

const Stack = createStackNavigator<GameNavigatorParamList>();

const GameNavigator: React.FC = () => (
    <Stack.Navigator
        initialRouteName="AssignRole"
        screenOptions={{...screenOptions, gestureEnabled: false}}>
        <Stack.Screen component={AssignRole} name="AssignRole" />
        <Stack.Screen component={Timer} name="Timer" />
        <Stack.Screen component={Vote} name="Vote" />
        <Stack.Screen component={SpiesGuess} name="SpiesGuess" />
        <Stack.Screen component={Result} name="Result" />
    </Stack.Navigator>
);

export default GameNavigator;
