import {createTheme} from "@shopify/restyle";

import spacingNormalizer from "../utils/spacingNormalizer";
import normalize from "../utils/normalizer";

const palette = {
    transparent: "transparent",
    contrast: "#000",
    white: "#504364",
    lightGrey: "#BFBECB",
    mediumGrey: "#9D99AC",
    darkGrey: "#333333",
    red: "#931831",
    lightRed: "#883143",
    milky: "#F2F5E0",
    brown: "#43372D",
    black: "#040D14",
    light: "#EEF2F7",
    lightPurple: "#615673",
};

const theme = createTheme({
    colors: {
        transparent: palette.transparent,
        mainBackground: palette.white,
        secondBackground: palette.lightPurple,
        buttonPrimary: palette.light,
        buttonSecondary: palette.black,
        buttonTertiary: palette.lightRed,
        mainTextColor: palette.lightGrey,
        contrast: palette.contrast,
        danger: palette.red,
        light: palette.milky,
        lightGrey: palette.lightGrey,
        secondText: palette.darkGrey,
        thirdText: palette.mediumGrey,
    },
    spacing: {
        ss: spacingNormalizer(4),
        s: spacingNormalizer(10),
        m: spacingNormalizer(20),
        ml: spacingNormalizer(20),
        l: spacingNormalizer(32),
        lxl: spacingNormalizer(44),
        xl: spacingNormalizer(64),
    },
    borderRadii: {
        zero: 0,
        s: 5,
        m: 8,
        l: 12,
        xl: 16,
        sl: 25,
        hero1: 35,
        hero2: 50,
        hero3: 60,
    },
    boxVariants: {
        icon: {
            borderRadius: "m",
            backgroundColor: "mainForeground",
        },
    },
    textVariants: {
        regular: {
            color: "lightGrey",
            fontFamily: "Kalameh Regular",
            // fontFamily: "Poppins Regular",
            fontSize: normalize(18),
        },
        semiBold: {
            color: "lightGrey",
            fontFamily: "Kalameh Regular",
            // fontFamily: "Poppins SemiBold",
            fontSize: normalize(18),
        },
        medium: {
            color: "lightGrey",
            fontFamily: "Kalameh Bold",
            // fontFamily: "Poppins Medium",
            fontSize: normalize(18),
        },
        bold: {
            color: "lightGrey",
            fontFamily: "Kalameh Bold",
            // fontFamily: "Poppins Bold",
            fontSize: normalize(18),
        },
    },
    breakpoints: {},
});

export type ThemeType = typeof theme;
export default theme;
