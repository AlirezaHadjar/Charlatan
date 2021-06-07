import {createTheme} from "@shopify/restyle";

import normalize from "../utils/normalizer";

const palette = {
    transparent: "transparent",
    red: "#883143",
    cyan: "#00ADB5",
    superLightGrey: "#D1D2D4",
    lightGrey: "#707070",
    mediumGrey: "#393e46",
    darkGrey: "#464E5D",
    semiBlack: "#1e2022",
    black: "#040d14",
    lightBlue: "#C9D6DF",
    superLightBlue: "#F0F5F9",
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
        secondText: palette.light,
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
        ss: normalize(4),
        s: normalize(10),
        m: normalize(20),
        ml: normalize(20),
        l: normalize(32),
        lxl: normalize(44),
        xl: normalize(64),
    },
    borderRadii: {
        zero: normalize(0),
        s: normalize(5),
        m: normalize(8),
        l: normalize(12),
        xl: normalize(16),
        sl: normalize(25),
        hero1: normalize(35),
        hero2: normalize(50),
        hero3: normalize(70),
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
        // Backgrounds
        mainBackground: palette.lightBlue,
        secondBackground: palette.superLightBlue,
        thirdBackground: palette.superLightBlue,
        // Buttons
        buttonPrimary: palette.superLightBlue,
        buttonSecondary: palette.black,
        buttonTertiary: palette.superLightBlue,
        buttonDisabled: palette.lightGrey,
        // Texts
        mainTextColor: palette.darkGrey,
        secondText: palette.darkGrey,
        thirdText: palette.superLightBlue,
        fourthText: palette.black,
        // Characters
        characterPrimary: palette.darkGrey,
        // Specials
        contrast: palette.black,
        transparent: palette.transparent,
        danger: palette.red,
    },
};
