import AsyncStorage from "@react-native-async-storage/async-storage";
import TapsellPlus, {
    TapsellPlusBannerType,
    TapsellPlusHorizontalGravity,
    TapsellPlusVerticalGravity,
} from "react-native-tapsell-plus";

import {storageKeys} from "../storage/keys";
import {NativeAd} from "../types";

const ZONE_ID_IMAGE = "60eafdc12e00ed7e1856ddb0";
const ZONE_ID_CLIP = "611d52b27a287273220e4bca";

const hideAd = async () => {
    await TapsellPlus.hideStandardBanner();
};
const destroyAd = async () => {
    try {
        const standardAdKey = await AsyncStorage.getItem(
            storageKeys.standardAdKey,
        );
        if (standardAdKey && standardAdKey !== "") {
            await TapsellPlus.destroyStandardBannerAd(standardAdKey);
            console.log("Successfully destroyed standard banner");
        }
    } catch (error) {
        console.log("Error while destroying standard banner", error);
    }
};
const unHideAd = async () => {
    await TapsellPlus.displayStandardBanner();
};

const requestAd = async (_position?: "center" | "left") => {
    try {
        await unHideAd();
        let savedKey = await AsyncStorage.getItem(storageKeys.standardAdKey);
        savedKey = await TapsellPlus.requestStandardBannerAd(
            ZONE_ID_IMAGE,
            TapsellPlusBannerType.BANNER_320x50,
        );

        TapsellPlus.showStandardBannerAd(
            savedKey,
            TapsellPlusHorizontalGravity.BOTTOM,
            TapsellPlusVerticalGravity.LEFT,
            async () => {
                await AsyncStorage.setItem(storageKeys.standardAdKey, savedKey);
            },
            async () => {
                await destroyAd();
                return await hideAd();
            },
        );
    } catch (error) {
        console.log("Error While Loading Ad: " + error);
        await destroyAd();
        await hideAd();
        await requestAd();
    }
};
const requestNativeClipAd = async (
    setNativeAd: React.Dispatch<React.SetStateAction<NativeAd>>,
) => {
    try {
        await unHideAd();
        const savedKey = await TapsellPlus.requestNativeAd(ZONE_ID_CLIP);
        TapsellPlus.showNativeAd(
            savedKey,
            async ad => {
                console.log("Success Native Ad", ad);
                setNativeAd(ad);
            },
            async () => true,
        );
    } catch (error) {
        console.log("Error While Loading Ad: " + error);
        await hideAd();
        await requestAd();
    }
};

export const requests = {
    requestAd,
    requestNativeClipAd,
    destroyAd,
    hideAd,
    unHideAd,
};
