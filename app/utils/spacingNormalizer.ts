import {Dimensions, PixelRatio} from "react-native";

const {width, height} = Dimensions.get("window");

const spacingNormalizer = (size: number) => {
    const meyar = 741888; // Iphone 11;
    const thisDevice = PixelRatio.get() * width * height;
    const scale = thisDevice / meyar;
    return scale * size;
};

export default spacingNormalizer;
