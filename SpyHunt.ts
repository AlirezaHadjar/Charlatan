import {Dimensions} from "react-native";

const {height, width} = Dimensions.get("window");

export const LISTITEM_HEIGHT = (height * 8) / 100;
export const ITEM_HEIGHT = 60;
export const ITEM_WIDTH = (width * 20) / 100;
