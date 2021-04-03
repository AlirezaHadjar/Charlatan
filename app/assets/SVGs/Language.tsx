import * as React from "react";
import Svg, {Circle, Path} from "react-native-svg";

function SvgComponent() {
    return (
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="#f2f5e0"
            strokeWidth={3}
            strokeLinecap="round"
            strokeLinejoin="round">
            <Circle cx={12} cy={12} r={10} />
            <Path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;