/* eslint-disable max-len */
import * as React from "react";
import Svg, {Path} from "react-native-svg";
import theme from "../../theme/Theme";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
}

function SvgComponent({scale = 1, color = "light"}: Props) {
    return (
        <Svg
            data-name="Iconly/Bold/Location"
            width={scale * 24}
            height={scale * 24}
            viewBox="0 0 24 24">
            <Path
                data-name="Location"
                d="M12 22a1.358 1.358 0 01-.734-.247 21.513 21.513 0 01-5.54-5.141A10.384 10.384 0 013.5 10.318 8.168 8.168 0 016 4.434 8.53 8.53 0 0111.993 2a8.423 8.423 0 018.507 8.318 10.39 10.39 0 01-2.23 6.294 21.92 21.92 0 01-5.541 5.141A1.319 1.319 0 0112 22zm-.007-14.223a2.8 2.8 0 00-2.8 2.8 2.712 2.712 0 00.821 1.954 2.823 2.823 0 004.79-1.954 2.824 2.824 0 00-2.813-2.8z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
