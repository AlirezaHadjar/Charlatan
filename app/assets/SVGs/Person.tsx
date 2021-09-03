import * as React from "react";
import Svg, {G, Path} from "react-native-svg";

function SvgComponent() {
    return (
        <Svg width={28} height={28} viewBox="0 0 28 28">
            <G data-name="vuesax/bold/tag-user">
                <Path
                    data-name="Vector"
                    // eslint-disable-next-line max-len
                    d="M21 2.333H7a3.481 3.481 0 00-3.5 3.465v12.728A3.49 3.49 0 007 22.003h.887a3.506 3.506 0 012.473 1.015l2 1.972a2.345 2.345 0 003.29 0l2-1.972a3.506 3.506 0 012.473-1.015H21a3.49 3.49 0 003.5-3.477V5.798A3.481 3.481 0 0021 2.333zm-7 4.142a2.276 2.276 0 01.082 4.55h-.175a2.269 2.269 0 01-2.194-2.275A2.3 2.3 0 0114 6.475zm3.208 10.663a6.266 6.266 0 01-6.417 0 2.107 2.107 0 010-3.768 6.266 6.266 0 016.417 0 2.107 2.107 0 010 3.768z"
                    fill="#eef2f7"
                />
            </G>
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
