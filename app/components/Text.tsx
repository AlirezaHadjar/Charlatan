import {TextProps} from "@shopify/restyle";
import React from "react";

import {useRTL} from "../hooks/isRTL";
import Text from "../theme/StyledText";
import {ThemeType} from "../theme/Theme";

export interface Props extends TextProps<ThemeType> {
    numberOfLines?: number;
    children: React.ReactNode;
}

const AppText: React.FC<Props> = ({
    children,
    variant = "semiBold",
    color = "mainTextColor",
    textAlign,
    ...otherProps
}) => {
    const isRTL = useRTL();
    const alignText = isRTL ? "right" : "auto";
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
