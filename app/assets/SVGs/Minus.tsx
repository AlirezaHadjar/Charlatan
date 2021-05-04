import * as React from "react";
import Svg, {Path} from "react-native-svg";

import theme from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
}

function SvgComponent({scale = 1, color = "buttonPrimary"}: Props) {
    return (
        <Svg
            width={scale * normalize(29)}
            height={scale * normalize(29)}
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

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
