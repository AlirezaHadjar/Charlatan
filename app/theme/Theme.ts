import {createTheme} from "@shopify/restyle";
// import {Dimensions} from "react-native";

// import normalize from "../utils/normalizer";

// const {width, height} = Dimensions.get("window");

const palette = {
    transparent: "transparent",
    contrast: "#000",
    white: "#999999",
    lightGrey: "#707070",
    darkGrey: "#383838",
    red: "#C10F0F",
    milky: "#F2F5E0",
};

const theme = createTheme({
    colors: {
        transparent: palette.transparent,
        mainBackground: palette.white,
        contrast: palette.contrast,
        danger: palette.red,
        light: palette.milky,
        lightGrey: palette.lightGrey,
        darkGrey: palette.darkGrey,
    },
    spacing: {
        ss: 4,
        s: 8,
        m: 16,
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
            color: "contrast",
            fontFamily: "IRANYekanMobileMedium",
        },
    },
    breakpoints: {},
});

export type ThemeType = typeof theme;
export default theme;
