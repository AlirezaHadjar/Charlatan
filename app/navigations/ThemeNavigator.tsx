import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {ThemeProvider} from "@shopify/restyle";
import React, {useMemo} from "react";
import {StatusBar, StatusBarStyle} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";

import theme, {lightTheme} from "../theme/Theme";
import Alert from "../components/Alert";
import {useDarkTheme} from "../contexts/ThemeContext";

import AppNavigator from "./AppNavigator";

const ThemeNavigator: React.FC = () => {
    // const themeIsDark = useSelector(getIsThemeDark);
    const {isDark} = useDarkTheme();

    const appTheme = useMemo(() => (isDark ? theme : lightTheme), [isDark]);
    const statusBarText: StatusBarStyle = useMemo(
        () => (isDark ? "light-content" : "dark-content"),
        [isDark],
    );
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: appTheme.colors.mainTextColor,
            background: appTheme.colors.mainBackground,
        },
    };
    return (
        <ThemeProvider theme={appTheme}>
            <StatusBar
                backgroundColor={appTheme.colors.mainBackground}
                barStyle={statusBarText}
                showHideTransition="fade"
            />
            <SafeAreaProvider>
                <NavigationContainer theme={MyTheme}>
                    <AppNavigator />
                </NavigationContainer>
                <Alert />
            </SafeAreaProvider>
        </ThemeProvider>
    );
};

export default ThemeNavigator;
