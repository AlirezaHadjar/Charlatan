import {createTheme} from "@shopify/restyle";

import normalize from "../utils/normalizer";
// import {Dimensions} from "react-native";

// import normalize from "../utils/normalizer";

// const {width, height} = Dimensions.get("window");

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
        ss: 4,
        s: 10,
        m: 20,
        ml: 20,
        l: 32,
        lxl: 44,
        xl: 64,
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
            fontFamily: "Poppins Regular",
            fontSize: normalize(18),
        },
        semiBold: {
            color: "lightGrey",
            fontFamily: "Poppins SemiBold",
            fontSize: normalize(18),
        },
        medium: {
            color: "lightGrey",
            fontFamily: "Poppins Medium",
            fontSize: normalize(18),
        },
        bold: {
            color: "lightGrey",
            fontFamily: "Poppins Bold",
            fontSize: normalize(18),
        },
    },
    breakpoints: {},
});

export type ThemeType = typeof theme;
export default theme;
