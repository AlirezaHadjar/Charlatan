import * as React from "react";
import Svg, {Rect} from "react-native-svg";

import theme from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
}

function SvgComponent() {
    return (
        <Svg width={normalize(56)} height={normalize(56)} viewBox="0 0 56 56">
            <Rect
                data-name="Rectangle 26"
                width={56}
                height={56}
                rx={12}
                fill="#fff"
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
