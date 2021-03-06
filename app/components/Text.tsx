import {TextProps} from "@shopify/restyle";
import React from "react";

import Text from "../theme/StyledText";
import {Theme} from "../theme/Theme";

export interface Props extends TextProps<Theme> {
    numberOfLines?: number;
}

const AppText: React.FC<Props> = ({
    children,
    variant = "regular",
    ...otherProps
}) => {
    return (
        <Text variant={variant} {...otherProps}>
            {children}
        </Text>
    );
};

export default AppText;
