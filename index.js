import {AppRegistry} from "react-native";
import {TapsellPlus} from "react-native-tapsell-plus";
// import Tapsell from "react-native-tapsell";

import App from "./App";
import {name as appName} from "./app.json";
import {AD_APP_KEY} from "./SpyHunt";

AppRegistry.registerComponent(appName, () => App);
TapsellPlus.initialize(AD_APP_KEY);
// Tapsell.initialize(AD_APP_KEY);
