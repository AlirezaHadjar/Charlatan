import "react-native-gesture-handler";
import React, {useCallback, useEffect, useState} from "react";
import {I18nManager, Platform} from "react-native";
import {Provider} from "react-redux";
import changeNavigationBarColor, {
    hideNavigationBar,
    showNavigationBar,
} from "react-native-navigation-bar-color";

import {store} from "./app/store/getStore";
import {fetchData} from "./app/utils/fetchData";
import ThemeNavigator from "./app/navigations/ThemeNavigator";
import {DarkThemeProvider} from "./app/contexts/ThemeContext";

const App: React.FC = ({}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(true);
    const [myStore] = useState(store);

    try {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
    } catch (e) {
        console.log(e);
    }

    const handleAndroidNavBar = useCallback(() => {
        if (Platform.OS !== "android") return;
        changeNavigationBarColor("translucent", true, true);
        hideNavigationBar();
    }, []);

    const fetch = async () => {
        handleAndroidNavBar();
        await fetchData();
        setLoading(false);
    };

    useEffect(() => {
        fetch();
    }, []);
    return (
        <Provider store={myStore}>
            <DarkThemeProvider>
                <ThemeNavigator />
            </DarkThemeProvider>
        </Provider>
    );
};

export default App;
