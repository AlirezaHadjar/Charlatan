import {useTheme} from "@shopify/restyle";
import * as React from "react";
import Svg, {Rect} from "react-native-svg";

import {ThemeType} from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof ThemeType["colors"];
}

function SvgComponent() {
    const theme = useTheme<ThemeType>();
    return (
        <Svg width={normalize(56)} height={normalize(56)} viewBox="0 0 56 56">
            <Rect
                data-name="Rectangle 26"
                width={56}
                height={56}
                rx={12}
                fill="#fff"
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
