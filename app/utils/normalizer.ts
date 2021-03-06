import {Dimensions, Platform, PixelRatio} from "react-native";

const {height: SCREEN_HEIGHT} = Dimensions.get("window");
const PIXEL_RATIO = PixelRatio.get();

// IPhone 6: 750 * 1334 (Pixel Ratio: 2)

const pixelRatio = PIXEL_RATIO > 2.5 ? 2.7 : PIXEL_RATIO;

const heightScale = SCREEN_HEIGHT / 1334;
const ratioScale = PIXEL_RATIO / 2;
// const pixelDensityScale = pixelRatio / 2 < 1.3 ? 1.3 : pixelRatio / 2;

const normalize: (size: number) => number = size => {
    const scale = heightScale / ratioScale;
    const newSize = size * scale;

    const fontSize = Math.round(PixelRatio.roundToNearestPixel(size));
    if (Platform.OS === "ios") return fontSize - 2;
    return fontSize * 0.875;
};

export default normalize;
