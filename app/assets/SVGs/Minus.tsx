import {useTheme} from "@shopify/restyle";
import * as React from "react";
import Svg, {Path} from "react-native-svg";

import {ThemeType} from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof ThemeType["colors"];
}

function SvgComponent({scale = 1, color = "buttonPrimary"}: Props) {
    const theme = useTheme<ThemeType>();
    return (
        <Svg
            width={scale * normalize(27)}
            height={scale * normalize(27)}
            viewBox="0 0 24 24"
            fill="none"
            stroke={theme.colors[color]}
            strokeWidth={5}
            strokeLinecap="round"
            strokeLinejoin="round">
            <Path d="M5 12h14" />
        </Svg>
    );
}

const MinusIcon = React.memo(SvgComponent);
export default MinusIcon;
