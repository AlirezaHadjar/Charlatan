import {Dimensions, PixelRatio} from "react-native";

const {height: SCREEN_HEIGHT, width: SCREEN_WIDTH} = Dimensions.get("window");
const PIXEL_RATIO = PixelRatio.get();

const normalize: (size: number) => number = (size) => {
    if (PIXEL_RATIO >= 2 && PIXEL_RATIO < 3) {
        if (SCREEN_WIDTH < 360) return size * 0.95;
        if (SCREEN_HEIGHT < 667) return size;
        if (SCREEN_HEIGHT >= 667 && SCREEN_HEIGHT <= 735) return size * 1.15;
        return size * 1.25;
    }
    if (PIXEL_RATIO >= 3 && PIXEL_RATIO < 3.5) {
        if (SCREEN_WIDTH <= 360) return size;
        if (SCREEN_HEIGHT < 667) return size * 1.15;
        if (SCREEN_HEIGHT >= 667 && SCREEN_HEIGHT <= 735) return size * 1.2;
        return size * 1.27;
    }
    if (PIXEL_RATIO >= 3.5) {
        if (SCREEN_WIDTH <= 360) return size;
        if (SCREEN_HEIGHT < 667) return size * 1.2;
        if (SCREEN_HEIGHT >= 667 && SCREEN_HEIGHT <= 735) return size * 1.25;
        return size * 1.4;
    }
    return size;
};

export default normalize;
