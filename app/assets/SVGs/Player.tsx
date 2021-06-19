import * as React from "react";
import Svg, {Path} from "react-native-svg";

function SvgComponent() {
    return (
        <Svg width={16} height={20} viewBox="0 0 16 20">
            <Path
                data-name="Profile"
                d="M0 16.575c0-2.722 3.686-3.4 8-3.4 4.339 0 8 .7 8 3.424S12.315 20 8 20c-4.338 0-8-.7-8-3.425zM2.706 5.291A5.294 5.294 0 118 10.583a5.274 5.274 0 01-5.294-5.292z"
                fill="#bfbecb"
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
