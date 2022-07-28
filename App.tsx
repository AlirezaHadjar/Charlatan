import "react-native-gesture-handler";
import React, {useCallback, useEffect, useState} from "react";
import {I18nManager} from "react-native";
import {Provider} from "react-redux";
import {enableFreeze} from "react-native-screens";
import {connectToDevTools} from "react-devtools-core";

import {store} from "./app/store/getStore";
import {fetchData} from "./app/utils/fetchData";
import ThemeNavigator from "./app/navigations/ThemeNavigator";
import {DarkThemeProvider} from "./app/contexts/ThemeContext";
import {AdProvider} from "./app/contexts/AdContext";

if (__DEV__) {
    connectToDevTools({
        host: "localhost",
        port: 8097,
    });
}

const App: React.FC = ({}) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [loading, setLoading] = useState(true);
    const [myStore] = useState(store);

    try {
        I18nManager.forceRTL(false);
        I18nManager.allowRTL(false);
    } catch (e) {}

    const fetch = useCallback(async () => {
        await fetchData();
        setLoading(false);
    }, []);

    useEffect(() => {
        fetch();
    }, [fetch]);
    useEffect(() => {
        enableFreeze(true);
    }, []);
    return (
        <Provider store={myStore}>
            {/* <AdProvider> */}
            <DarkThemeProvider>
                <ThemeNavigator />
            </DarkThemeProvider>
            {/* </AdProvider> */}
        </Provider>
    );
};

export default App;
