import {createTheme} from "@shopify/restyle";

import spacingNormalizer from "../utils/spacingNormalizer";
import normalize from "../utils/normalizer";

const palette = {
    transparent: "transparent",
    red: "#883143",
    cyan: "#00ADB5",
    superLightGrey: "#D1D2D4",
    lightGrey: "#707070",
    mediumGrey: "#393e46",
    darkGrey: "#464E5D",
    black: "#040d14",
    superLight: "#eef2f7",
    light: "#EEEEEE",
    white: "#ffffff",
};

const theme = createTheme({
    colors: {
        // Backgrounds
        mainBackground: palette.mediumGrey,
        secondBackground: palette.cyan,
        thirdBackground: palette.darkGrey,
        // Buttons
        buttonPrimary: palette.light,
        buttonSecondary: palette.black,
        buttonTertiary: palette.cyan,
        buttonDisabled: palette.lightGrey,
        // Texts
        mainTextColor: palette.superLightGrey,
        secondText: palette.darkGrey,
        thirdText: palette.superLight,
        fourthText: palette.black,
        // Characters
        characterPrimary: palette.darkGrey,
        // Specials
        contrast: palette.white,
        transparent: palette.transparent,
        danger: palette.red,
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
    boxVariants: {},
    textVariants: {
        regular: {
            color: "secondText",
            fontFamily: "Kalameh Regular",
            fontSize: normalize(18),
        },
        semiBold: {
            color: "secondText",
            fontFamily: "Kalameh Regular",
            fontSize: normalize(18),
        },
        medium: {
            color: "secondText",
            fontFamily: "Kalameh Bold",
            fontSize: normalize(18),
        },
        bold: {
            color: "secondText",
            fontFamily: "Kalameh Bold",
            fontSize: normalize(18),
        },
    },
    breakpoints: {},
});

export type ThemeType = typeof theme;
export default theme;

export const lightTheme: ThemeType = {
    ...theme,
    colors: {
        ...theme.colors,
        mainBackground: palette.white,
    },
};
