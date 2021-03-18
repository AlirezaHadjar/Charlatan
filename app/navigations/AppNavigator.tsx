import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import Main from "../screens/Main";
import Test from "../screens/Test";

export type AppRoute = {
    Main: undefined;
    Test: undefined;
};

const Stack = createStackNavigator<AppRoute>();

const AppNavigator: React.FC<{}> = ({}) => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen component={Main} name="Main" />
        <Stack.Screen component={Test} name="Test" />
    </Stack.Navigator>
);

export default AppNavigator;
