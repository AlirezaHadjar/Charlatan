import {Dimensions, Platform, PixelRatio} from "react-native";

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const scale = SCREEN_HEIGHT / 680;

const normalize: (size: number) => number = (size) => {
    const newSize = size * scale;
    if (Platform.OS === "ios") {
        return Math.round(PixelRatio.roundToNearestPixel(newSize));
    } else {
        return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
    }
};

export default normalize;
