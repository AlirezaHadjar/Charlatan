import {useTheme} from "@shopify/restyle";
import * as React from "react";
import Svg, {G, Path} from "react-native-svg";

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
            viewBox="0 0 27 27">
            <G
                data-name="Group 18"
                fill="none"
                stroke={theme.colors[color]}
                strokeLinecap="round"
                strokeWidth={5}>
                <Path data-name="Line 2" d="M14.5 2.5v24" />
                <Path data-name="Line 3" d="M26.5 14.5h-24" />
            </G>
        </Svg>
    );
}

const PlusIcon = React.memo(SvgComponent);
export default PlusIcon;
