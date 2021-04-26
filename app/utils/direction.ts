import {I18nManager} from "react-native";

import {useRTL} from "../hooks/isRTL";

type Direction = "flex-end" | "flex-start";

const getDirection: (direction: Direction, reverse: boolean) => Direction = (
    direction,
    reverse,
) => {
    if (reverse) return direction === "flex-start" ? "flex-end" : "flex-start";
    return "flex-start" ? "flex-start" : "flex-end";
};

export const handleDirection = (direction: Direction) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const isLanguageRTL = useRTL();
    const isPhoneRTL = I18nManager.isRTL;
    if (isLanguageRTL === isPhoneRTL) return getDirection(direction, false);
    return getDirection(direction, true);
};
