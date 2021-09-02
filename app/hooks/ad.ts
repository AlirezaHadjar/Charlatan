import {useCallback, useEffect, useState} from "react";
import {Platform} from "react-native";

import {requests} from "../api/requests";
import {RouteName} from "../navigations/AppNavigator";

import {useInterval} from "./interval";

const visibleScreens: RouteName[] = ["Players", "Locations", "Time"];
const interstitialAdScreens: RouteName[] = ["Players", "Locations", "Time"];
const nativeAdScreens: RouteName[] = ["Timer"];

export const useAd = () => {
    const [screenName, setScreenName] = useState<RouteName>("Main");

    const handleAd = useCallback(async (screenName: RouteName) => {
        if (Platform.OS === "ios") return;
        if (interstitialAdScreens.includes(screenName))
            return await requests.requestAd();
        if (nativeAdScreens.includes(screenName))
            return await requests.requestNativeClipAd();
    }, []);

    const handleVisibility = useCallback(async (screenName: RouteName) => {
        if (Platform.OS === "ios") return;
        if (visibleScreens.includes(screenName))
            return await requests.unHideAd();
        return await requests.hideAd();
    }, []);

    useInterval(() => handleVisibility(screenName), 5000);

    useEffect(() => {
        handleAd(screenName);
        console.log(screenName);
    }, [screenName, handleAd]);

    useEffect(() => {
        handleVisibility(screenName);
    }, [screenName, handleVisibility]);

    return [setScreenName];
};
