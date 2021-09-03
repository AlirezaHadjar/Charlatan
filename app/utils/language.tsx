import React from "react";
import {LanguageName} from "../types";
import Flags from "../assets/SVGs/flags";
import Box from "../theme/Box";

export const getLanguageFullName = (language: LanguageName) => {
    switch (language) {
        case "en":
            return "English";
        case "fa":
            return "Persian";
        default:
            return "Unknown";
    }
};

export const getLanguageFlag = (language: LanguageName) => {
    switch (language) {
        case "en":
            return <Flags.UnitedKingdom />;
        case "fa":
            return <Flags.Iran />;
        default:
            return <Box />;
    }
};
