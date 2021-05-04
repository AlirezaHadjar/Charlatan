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
            width={scale * normalize(21.503)}
            height={scale * normalize(19.618)}
            viewBox="0 0 21.503 19.618">
            <Path
                // eslint-disable-next-line max-len
                d="M21.046 8.756a1.027 1.027 0 00-1.424.285l-.031.046a9.809 9.809 0 10-9.782 10.531 1.369 1.369 0 000-2.738 7.071 7.071 0 117.021-7.914 1.026 1.026 0 00-1.654 1.213l2.033 3.054a1.236 1.236 0 002.091 0l2.033-3.049a1.027 1.027 0 00-.287-1.428z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
