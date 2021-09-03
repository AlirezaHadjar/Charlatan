import {useCallback, useEffect, useState} from "react";
import {Platform} from "react-native";

import {requests} from "../api/requests";
import {RouteName} from "../navigations/AppNavigator";
import {NativeAd} from "../types";

// import {useInterval} from "./interval";

const visibleScreens: RouteName[] = ["Players", "Locations", "Time"];
const interstitialAdScreens: RouteName[] = ["Players", "Locations", "Time"];
const nativeAdScreens: RouteName[] = ["Timer"];

export const useAd = (
    setNativeAd: React.Dispatch<React.SetStateAction<NativeAd>>,
) => {
    const [screenName, setScreenName] = useState<RouteName>("Main");

    const handleAd = useCallback(
        async (screenName: RouteName) => {
            if (Platform.OS === "ios") return;
            if (interstitialAdScreens.includes(screenName))
                return await requests.requestAd();
            if (nativeAdScreens.includes(screenName))
                return await requests.requestNativeClipAd(setNativeAd);
        },
        [setNativeAd],
    );

    const handleVisibility = useCallback(async (screenName: RouteName) => {
        if (Platform.OS === "ios") return;
        if (visibleScreens.includes(screenName))
            return await requests.unHideAd();
        await requests.destroyAd();
        // return await requests.hideAd();
    }, []);

    // useInterval(() => handleVisibility(screenName), 5000);

    useEffect(() => {
        handleAd(screenName);
        console.log(screenName);
    }, [screenName, handleAd]);

    useEffect(() => {
        handleVisibility(screenName);
    }, [screenName, handleVisibility]);

    return {setScreenName};
};
