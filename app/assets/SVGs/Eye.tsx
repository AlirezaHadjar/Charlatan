import * as React from "react";
import Svg, {Path} from "react-native-svg";

import theme from "../../theme/Theme";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
}

function SvgComponent() {
    return (
        <Svg width={50.001} height={40} viewBox="0 0 50.001 40">
            <Path
                data-name="Show"
                d="M24.976 40C14.653 40 5.371 32.787.147 20.7a1.811 1.811 0 010-1.429C5.365 7.2 14.646 0 24.976 0H25a23.266 23.266 0 0114.342 5.114 35.588 35.588 0 0110.512 14.16 1.811 1.811 0 010 1.429C44.629 32.787 35.339 40 25 40zm-9.732-20A9.744 9.744 0 1025 10.3a9.726 9.726 0 00-9.756 9.7zm3.661 0a6.218 6.218 0 01.124-1.188h.122a4.992 4.992 0 005-4.8 4.973 4.973 0 01.849-.078A6.048 6.048 0 1118.905 20z"
                fill="#eef2f7"
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
