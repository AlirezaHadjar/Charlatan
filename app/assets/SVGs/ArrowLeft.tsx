import {useTheme} from "@shopify/restyle";
import * as React from "react";
import Svg, {Path} from "react-native-svg";

import {ThemeType} from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof ThemeType["colors"];
}

function SvgComponent({scale = 1.1}: Props) {
    const theme = useTheme<ThemeType>();
    return (
        <Svg
            data-name="Arrow - Left 2"
            width={normalize(scale * 16.667)}
            height={normalize(scale * 20)}
            viewBox="0 0 16.667 20">
            <Path
                data-name="Arrow - Left 2"
                // eslint-disable-next-line max-len
                d="M.615 8.115c.094-.1.45-.51.781-.85A36.15 36.15 0 0111.055.558 7.694 7.694 0 0113.02 0a3.222 3.222 0 011.492.363 3.123 3.123 0 011.325 1.507 16.4 16.4 0 01.427 1.773 39.964 39.964 0 01.4 6.343 46.207 46.207 0 01-.356 6.148 14.158 14.158 0 01-.568 2.212A2.975 2.975 0 0113.114 20h-.094a8.131 8.131 0 01-2.2-.682 36.151 36.151 0 01-9.446-6.61 9.433 9.433 0 01-.8-.923A2.972 2.972 0 010 10.012a3.125 3.125 0 01.615-1.9"
                fill="#bfbecb"
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
