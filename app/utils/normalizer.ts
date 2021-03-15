import {Dimensions, Platform, PixelRatio} from "react-native";

const {height: SCREEN_HEIGHT} = Dimensions.get("window");

const scale = SCREEN_HEIGHT / 680;

const normalize: (size: number) => number = (size) => {
    const newSize = size * scale;
    const fontSize = Math.round(PixelRatio.roundToNearestPixel(newSize));
    if (Platform.OS === "ios") return fontSize - 2;
    return fontSize - 1;
};

export default normalize;
