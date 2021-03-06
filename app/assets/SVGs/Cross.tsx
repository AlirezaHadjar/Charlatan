import {useTheme} from "@shopify/restyle";
import * as React from "react";
import Svg, {Path} from "react-native-svg";

import {ThemeType} from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof ThemeType["colors"];
}

function SvgComponent() {
    const theme = useTheme<ThemeType>();
    return (
        <Svg
            width={normalize(8.728)}
            height={normalize(8.728)}
            viewBox="0 0 8.728 8.728">
            <Path
                data-name="Fill 4"
                // eslint-disable-next-line max-len
                d="M8.386 6.736L6.014 4.365l2.371-2.371A1.167 1.167 0 006.736.344l-2.372 2.37L1.992.341A1.167 1.167 0 00.341 1.992l2.373 2.373L.346 6.732A1.167 1.167 0 002 8.382l2.364-2.368 2.373 2.372a1.167 1.167 0 001.649-1.65"
                fill="#707070"
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
