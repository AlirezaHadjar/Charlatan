import * as React from "react";
import Svg, {G, Path} from "react-native-svg";

function SvgComponent() {
    return (
        <Svg width={21.657} height={21.657} viewBox="0 0 21.657 21.657">
            <G
                data-name="Group 30"
                fill="none"
                stroke="#bfbecb"
                strokeLinecap="round"
                strokeWidth={4}>
                <Path data-name="Path 95" d="M2.828 2.828l9.5 9.5 6.5 6.5" />
                <Path data-name="Line 6" d="M18.828 2.828l-16 16" />
            </G>
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
