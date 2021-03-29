import * as React from "react";
import Svg, {G, Path} from "react-native-svg";

import theme from "../../theme/Theme";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
}

function SvgComponent({scale = 1, color = "light"}: Props) {
    return (
        <Svg width={scale * 29} height={scale * 29} viewBox="0 0 29 29">
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

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
