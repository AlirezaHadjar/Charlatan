import {TextProps} from "@shopify/restyle";
import React from "react";

import {getLanguageName} from "../store/reducers/language";
import {useSelector} from "../store/useSelector";
import Text from "../theme/StyledText";
import {ThemeType} from "../theme/Theme";

export interface Props extends TextProps<ThemeType> {
    numberOfLines?: number;
}

const AppText: React.FC<Props> = ({
    children,
    variant = "semiBold",
    color = "mainTextColor",
    textAlign,
    ...otherProps
}) => {
    const language = useSelector(getLanguageName);
    const alignText = language === "en" ? "auto" : "right";
    return (
        <Text
            variant={variant}
            color={color}
            {...otherProps}
            textAlign={textAlign ? textAlign : alignText}>
            {children}
        </Text>
    );
};

export default AppText;
