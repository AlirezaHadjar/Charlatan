import React from "react";
import {Image, ImageProps} from "react-native";

const AppImage: React.FC<ImageProps> = ({...props}) => {
    return <Image {...props} />;
};

export default AppImage;
