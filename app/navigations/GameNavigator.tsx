import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import AssignRole from "../screens/Game/AssignRole";
import Timer from "../screens/Game/Timer";
import Vote from "../screens/Game/Vote";
import Result from "../screens/Game/Result";
import SpiesGuess from "../screens/Game/SpiesGuess";

export type GameRoutes = {
    AssignRole: undefined;
    Timer: undefined;
    Vote: undefined;
    SpiesGuess: undefined;
    Result: undefined;
};

const Stack = createStackNavigator<GameRoutes>();

const AppNavigator: React.FC<{}> = ({}) => (
    <Stack.Navigator
        headerMode="none"
        initialRouteName="AssignRole"
        screenOptions={() => ({
            transitionSpec: {
                open: {animation: "timing", config: {duration: 200}},
                close: {animation: "timing", config: {duration: 200}},
            },
            cardStyleInterpolator: ({current: {progress}}) => ({
                cardStyle: {opacity: progress},
            }),
        })}>
        <Stack.Screen component={AssignRole} name="AssignRole" />
        <Stack.Screen component={Timer} name="Timer" />
        <Stack.Screen component={Vote} name="Vote" />
        <Stack.Screen component={SpiesGuess} name="SpiesGuess" />
        <Stack.Screen component={Result} name="Result" />
    </Stack.Navigator>
);

export default AppNavigator;
