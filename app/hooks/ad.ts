import {useCallback, useEffect, useState} from "react";

import {requests} from "../api/requests";
import {RouteName} from "../navigations/AppNavigator";

const visibleScreens: RouteName[] = ["Players", "Locations", "Time"];
const interstitialAdScreens: RouteName[] = ["Players", "Locations", "Time"];
const nativeAdScreens: RouteName[] = ["Timer"];

export const useAd = () => {
    const [screenName, setScreenName] = useState<RouteName>("Main");

    const handleAd = useCallback(async (screenName: RouteName) => {
        if (interstitialAdScreens.includes(screenName))
            return await requests.requestAd();
        if (nativeAdScreens.includes(screenName))
            return await requests.requestNativeClipAd();
    }, []);

    const handleVisibility = useCallback(async (screenName: RouteName) => {
        if (!visibleScreens.includes(screenName))
            return await requests.hideAd();
    }, []);

    useEffect(() => {
        handleAd(screenName);
        console.log(screenName);
    }, [screenName, handleAd]);

    useEffect(() => {
        handleVisibility(screenName);
    }, [screenName, handleVisibility]);

    return [setScreenName];
};
