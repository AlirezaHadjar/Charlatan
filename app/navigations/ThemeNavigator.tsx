import {
    DefaultTheme,
    NavigationContainer,
    NavigationContainerRef,
} from "@react-navigation/native";
import {ThemeProvider} from "@shopify/restyle";
import React, {useMemo, useRef} from "react";
import {StatusBar, StatusBarStyle, View} from "react-native";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {GestureHandlerRootView} from "react-native-gesture-handler";

import theme, {lightTheme} from "../theme/Theme";
import Alert from "../components/Alert";
import {useDarkTheme} from "../contexts/ThemeContext";

import AppNavigator from "./AppNavigator";
import {RootStackParamList} from "./types";

const ThemeNavigator: React.FC = () => {
    // const themeIsDark = useSelector(getIsThemeDark);
    const navigationRef =
        useRef<NavigationContainerRef<RootStackParamList>>(null);
    const routeNameRef = useRef<string>();
    // const {setNativeAd} = useAdKey();
    const {isDark} = useDarkTheme();
    // const {setScreenName} = useAd(setNativeAd);

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
    const handleChange = () => {
        const previousRouteName = routeNameRef.current;
        const currentRouteName = navigationRef.current?.getCurrentRoute()?.name;

        // if (previousRouteName !== currentRouteName)
        //     setScreenName(currentRouteName as keyof RootStackParamList);

        routeNameRef.current = currentRouteName;
    };

    const handleReady = () =>
        (routeNameRef.current = navigationRef.current?.getCurrentRoute()?.name);

    return (
        <View
            style={{flex: 1, backgroundColor: appTheme.colors.mainBackground}}>
            <ThemeProvider theme={appTheme}>
                <GestureHandlerRootView style={{flex: 1}}>
                    <SafeAreaProvider style={{flex: 1}}>
                        <BottomSheetModalProvider>
                            <StatusBar
                                backgroundColor={appTheme.colors.mainBackground}
                                barStyle={statusBarText}
                                showHideTransition="fade"
                            />
                            <NavigationContainer
                                theme={MyTheme}
                                ref={navigationRef}
                                onReady={handleReady}
                                onStateChange={handleChange}>
                                <AppNavigator />
                            </NavigationContainer>
                            <Alert />
                        </BottomSheetModalProvider>
                    </SafeAreaProvider>
                </GestureHandlerRootView>
            </ThemeProvider>
        </View>
    );
};

export default ThemeNavigator;
