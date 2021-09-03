import {AppRegistry, Platform} from "react-native";
import {TapsellPlus} from "react-native-tapsell-plus";

import App from "./App";
import {name as appName} from "./app.json";
import {AD_APP_KEY} from "./SpyHunt";

if (Platform.OS === "android") {
    TapsellPlus.initialize(AD_APP_KEY);
}

AppRegistry.registerComponent(appName, () => App);
