import TapsellPlus, {
    TapsellPlusBannerType,
    TapsellPlusHorizontalGravity,
    TapsellPlusVerticalGravity,
} from "react-native-tapsell-plus";

const ZONE_ID_IMAGE = "60eafdc12e00ed7e1856ddb0";
// const ZONE_ID_CLIP = "60eb3ca9da757601b681a145";
// const ZONE_ID_CLIP = "5cfaa9deaede570001d5553a";
// const ZONE_ID_CLIP = "60f1f4733d2dfe5fb3eb6a5f";
// const ZONE_ID_CLIP = "60f1f4733d2dfe5fb3eb6a5f";
const ZONE_ID_CLIP = "60eb3ca9da757601b681a145";
// const ZONE_ID_CLIP = "5cfaa8aee8d17f0001ffb28f";

const hideAd = async () => {
    await TapsellPlus.hideStandardBanner();
};
const unHideAd = async () => {
    await TapsellPlus.displayStandardBanner();
};

const requestAd = async (_position?: "center" | "left") => {
    try {
        await unHideAd();
        const responseId = await TapsellPlus.requestStandardBannerAd(
            ZONE_ID_IMAGE,
            TapsellPlusBannerType.BANNER_320x50,
        );
        TapsellPlus.showStandardBannerAd(
            responseId,
            TapsellPlusHorizontalGravity.BOTTOM,
            TapsellPlusVerticalGravity.LEFT,
            async () => {
                console.log("Success");
                return await unHideAd();
            },
            async () => {
                console.log("Failure");
                return await hideAd();
            },
        );
    } catch (error) {
        console.log("Error While Loading Ad: " + error);
        await hideAd();
        await requestAd();
    }
};
const requestNativeClipAd = async () => {
    try {
        const responseId = await TapsellPlus.requestNativeAd(ZONE_ID_CLIP);
        console.log("ID AD: ", responseId);
        TapsellPlus.showNativeAd(
            responseId,
            async () => {
                console.log("Success");
                return await unHideAd();
            },
            async () => {
                console.log("Failure");
                return await hideAd();
            },
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
    hideAd,
    unHideAd,
};
