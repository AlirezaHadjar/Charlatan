import * as React from "react";
import Svg, {G, Path} from "react-native-svg";

function SvgComponent() {
    return (
        <Svg width={29} height={29} viewBox="0 0 29 29">
            <G
                data-name="Group 18"
                fill="none"
                stroke="#eef2f7"
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
