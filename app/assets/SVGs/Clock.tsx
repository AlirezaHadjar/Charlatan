/* eslint-disable max-len */
import * as React from "react";
import Svg, {Path} from "react-native-svg";

import theme from "../../theme/Theme";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
}

function SvgComponent({scale = 1, color = "buttonPrimary"}: Props) {
    return (
        <Svg
            data-name="Iconly/Bold/Time Square"
            width={scale * 24}
            height={scale * 24}
            viewBox="0 0 24 24">
            <Path
                data-name="Time Square"
                d="M16.34 22H7.67C4.279 22 2 19.624 2 16.089v-8.17C2 4.379 4.279 2 7.67 2h8.67C19.725 2 22 4.379 22 7.919v8.169C22 19.624 19.725 22 16.34 22zM11.65 6.919a.76.76 0 00-.75.75v5.051a.733.733 0 00.37.64l3.92 2.34a.7.7 0 00.39.11.745.745 0 00.64-.37.72.72 0 00.09-.552.762.762 0 00-.35-.477L12.4 12.29V7.669a.751.751 0 00-.75-.75z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
