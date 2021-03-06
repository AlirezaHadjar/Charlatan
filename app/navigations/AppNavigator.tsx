import React from "react";
import {createStackNavigator} from "@react-navigation/stack";

import Main from "../screens/Main";

export type AppRoute = {
    Main: undefined;
};

const Stack = createStackNavigator<AppRoute>();

const AppNavigator: React.FC<{}> = ({}) => (
    <Stack.Navigator headerMode="none">
        <Stack.Screen component={Main} name="Main" />
    </Stack.Navigator>
);

export default AppNavigator;
