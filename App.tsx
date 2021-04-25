import "react-native-gesture-handler";
import React, {useEffect, useState} from "react";
import {ThemeProvider} from "@shopify/restyle";
import {SafeAreaProvider} from "react-native-safe-area-context";
import {DefaultTheme, NavigationContainer} from "@react-navigation/native";
import {I18nManager, StatusBar} from "react-native";
import {Provider} from "react-redux";

import theme from "./app/theme/Theme";
import {store} from "./app/store/getStore";
import AppNavigator from "./app/navigations/AppNavigator";
import {fetchData} from "./app/utils/fetchData";
import Alert from "./app/components/Alert";

const App: React.FC = ({}) => {
    const MyTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: theme.colors.mainTextColor,
            background: theme.colors.mainBackground,
        },
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(true);
    const [myStore] = useState(store);

    try {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
    } catch (e) {
        console.log(e);
    }

    const fetch = async () => {
        await fetchData();
        setLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);
    return (
        <Provider store={myStore}>
            <ThemeProvider theme={theme}>
                <StatusBar backgroundColor={theme.colors.mainBackground} />
                <SafeAreaProvider>
                    <NavigationContainer theme={MyTheme}>
                        <AppNavigator />
                    </NavigationContainer>
                    <Alert />
                </SafeAreaProvider>
            </ThemeProvider>
        </Provider>
    );
};

export default App;
