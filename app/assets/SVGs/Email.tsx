import * as React from "react";
import Svg, {G, Rect, Path} from "react-native-svg";

interface Props {
    scale?: number;
}

function SvgComponent({scale = 0.8}: Props) {
    return (
        <Svg width={scale * 48} height={scale * 32} viewBox="0 0 48 32">
            <G
                data-name="Group 107"
                fill="none"
                stroke="#eee"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={4}>
                <G data-name="Rectangle 66">
                    <Rect width={48} height={32} rx={6} stroke="none" />
                    <Rect x={2} y={2} width={44} height={28} rx={4} />
                </G>
                <Path
                    data-name="Path 99"
                    d="M44.057 4.448l-20.346 10-19.41-10"
                />
            </G>
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
