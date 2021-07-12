import TapsellPlus, {
    TapsellPlusBannerType,
    TapsellPlusHorizontalGravity,
    TapsellPlusVerticalGravity,
} from "react-native-tapsell-plus";

const ZONE_ID_IMAGE = "60eafdc12e00ed7e1856ddb0";
const ZONE_ID_CLIP = "60eb3ca9da757601b681a145";

const requestAd = async (_position?: "center" | "left") => {
    const responseId = await TapsellPlus.requestStandardBannerAd(
        ZONE_ID_IMAGE,
        TapsellPlusBannerType.BANNER_320x50,
    );
    TapsellPlus.showStandardBannerAd(
        responseId,
        TapsellPlusHorizontalGravity.BOTTOM,
        TapsellPlusVerticalGravity.LEFT,
        () => {
            return true;
        },
        () => {
            return false;
        },
    );
};
const requestNativeClipAd = async () => {
    const responseId = await TapsellPlus.requestNativeAd(ZONE_ID_CLIP);
    TapsellPlus.showNativeAd(
        responseId,
        () => {
            return true;
        },
        () => {
            return false;
        },
    );
};
const hideAd = async () => {
    console.log("Hiding ad");
    await TapsellPlus.hideStandardBanner();
};
const unHideAd = async () => {
    await TapsellPlus.displayStandardBanner();
};

export const requests = {
    requestAd,
    requestNativeClipAd,
    hideAd,
    unHideAd,
};
