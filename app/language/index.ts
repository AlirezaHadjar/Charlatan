import {en} from "./en-US/index";
import {fa} from "./fa-IR/index";

export const languageDatas = {
    en,
    fa,
};

export type LanguageData = typeof languageDatas[keyof typeof languageDatas];
