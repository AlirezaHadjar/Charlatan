import "react-native-gesture-handler";
import React from "react";
import {ThemeProvider} from "@shopify/restyle";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {NavigationContainer} from "@react-navigation/native";

import theme from "./app/theme/Theme";
import AppNavigator from "./app/navigations/AppNavigator";

const App: React.FC<{}> = ({}) => {
    return (
        <ThemeProvider theme={theme}>
            <SafeAreaProvider>
                <NavigationContainer>
                    <AppNavigator />
                </NavigationContainer>
            </SafeAreaProvider>
        </ThemeProvider>
    );
};

export default App;
