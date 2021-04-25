import * as React from "react";
import Svg, {G, Path} from "react-native-svg";

function SvgComponent() {
    return (
        <Svg width={64.358} height={57.938} viewBox="0 0 64.358 57.938">
            <G data-name="Group 39">
                <Path
                    data-name="Polygon 2"
                    d="M28.706 5.016a4 4 0 016.946 0l25.107 43.937a4 4 0 01-3.473 5.985H7.072a4 4 0 01-3.473-5.985z"
                    fill="#eef2f7"
                    stroke="#931831"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={6}
                />
                <Path
                    data-name="Path 39"
                    // eslint-disable-next-line max-len
                    d="M34.145 38.569h-3.933l-1.332-16.37h6.6zm-2 7.422a2.862 2.862 0 01-2.093-.936 2.97 2.97 0 01-.916-2.145 3.017 3.017 0 01.87-2.173 2.859 2.859 0 012.141-.9 2.908 2.908 0 012.236.9 3.078 3.078 0 01.84 2.173 2.908 2.908 0 01-.92 2.2 3.033 3.033 0 01-2.156.876z"
                    fill="#931831"
                />
            </G>
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
