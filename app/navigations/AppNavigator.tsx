import React from "react";
import {createNativeStackNavigator} from "@react-navigation/native-stack";

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
import {useSelector} from "../store/useSelector";
import {getLanguageRTL} from "../store/reducers/language";

import GameNavigator from "./GameNavigator";
import {getScreenOptions} from "./config";
import {RootStackParamList} from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
    const isRTL = useSelector(getLanguageRTL);
    return (
        <Stack.Navigator
            initialRouteName="Main"
            screenOptions={getScreenOptions(isRTL)}>
            <Stack.Screen component={Main} name="Main" />
            <Stack.Screen component={Settings} name="Settings" />
            <Stack.Screen component={Guide} name="Guide" />
            <Stack.Screen component={Test} name="Test" />
            <Stack.Screen component={Players} name="Players" />
            <Stack.Screen component={Time} name="Time" />
            <Stack.Screen
                component={SelectGame}
                name="SelectGame"
                options={{gestureEnabled: false}}
            />
            <Stack.Screen
                component={StartGame}
                name="StartGame"
                options={{gestureEnabled: false}}
            />
            <Stack.Screen component={Locations} name="Locations" />
            <Stack.Screen
                component={GameNavigator}
                name="GameNavigator"
                options={{gestureEnabled: false}}
            />
            <Stack.Screen component={AboutUs} name="AboutUs" />
            <Stack.Screen component={Language} name="Language" />
        </Stack.Navigator>
    );
};

export default AppNavigator;
