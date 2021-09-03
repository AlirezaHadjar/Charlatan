import * as React from "react";
import Svg, {Path} from "react-native-svg";

function SvgComponent() {
    return (
        <Svg width={20} height={20} viewBox="0 0 20 20">
            <Path
                d="M7.425 16.6l5.433-5.433a1.655 1.655 0 000-2.333L7.425 3.4"
                fill="none"
                stroke="#eef2f7"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                data-name="vuesax/linear/arrow-right"
                opacity={0.3}
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
