import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

import AssignRole from "../screens/Game/AssignRole";
import Timer from "../screens/Game/Timer";
import Vote from "../screens/Game/Vote";
import Result from "../screens/Game/Result";
import SpiesGuess from "../screens/Game/SpiesGuess";
import {useSelector} from "../store/useSelector";
import {getLanguageRTL} from "../store/reducers/language";

import {getScreenOptions} from "./config";
import {GameNavigatorParamList} from "./types";

const Stack = createNativeStackNavigator<GameNavigatorParamList>();

const GameNavigator: React.FC = () => {
    const isRTL = useSelector(getLanguageRTL);

    return (
        <Stack.Navigator
            initialRouteName="AssignRole"
            screenOptions={{...getScreenOptions(isRTL), gestureEnabled: false}}>
            <Stack.Screen component={AssignRole} name="AssignRole" />
            <Stack.Screen component={Timer} name="Timer" />
            <Stack.Screen component={Vote} name="Vote" />
            <Stack.Screen component={SpiesGuess} name="SpiesGuess" />
            <Stack.Screen component={Result} name="Result" />
        </Stack.Navigator>
    );
};

export default GameNavigator;
