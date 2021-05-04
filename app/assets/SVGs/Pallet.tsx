import * as React from "react";
import Svg, {Path} from "react-native-svg";

import theme from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
    backgroundColor?: keyof typeof theme["colors"];
}

function SvgComponent({
    scale = 1,
    color = "buttonPrimary",
    backgroundColor = "secondBackground",
}: Props) {
    return (
        <Svg
            width={scale * normalize(21)}
            height={scale * normalize(22.029)}
            viewBox="0 0 21 22.029">
            <Path
                data-name="Path 34"
                // eslint-disable-next-line max-len
                d="M18.335 3.949A10.783 10.783 0 0010.146 0a9.867 9.867 0 00-6.92 2.811C.256 5.7-.724 9.144.539 12.251a6.591 6.591 0 005.728 4.3h.186c.349-.014.686-.043 1.012-.072.394-.034.766-.066 1.1-.066.782 0 1.457 0 1.457 1.991 0 2.137 1.3 3.629 3.163 3.63a6.37 6.37 0 004.244-2.218 12.56 12.56 0 003.5-7.39 10.974 10.974 0 00-2.594-8.477zM6.39 15.02z"
                fill={theme.colors[color]}
            />
            <Path
                data-name="Path 35"
                d="M13.775 12.304a2.3 2.3 0 102.3-2.316 2.311 2.311 0 00-2.3 2.316z"
                fill={theme.colors[backgroundColor]}
            />
            <Path
                data-name="Path 36"
                d="M16.315 6.935a2.3 2.3 0 10-2.3 2.315 2.311 2.311 0 002.3-2.315z"
                fill={theme.colors[backgroundColor]}
            />
            <Path
                data-name="Path 37"
                d="M8.746 2.939a2.315 2.315 0 102.3 2.315 2.311 2.311 0 00-2.3-2.315z"
                fill={theme.colors[backgroundColor]}
            />
            <Path
                data-name="Path 38"
                d="M4.742 6.884a2.315 2.315 0 102.3 2.315 2.311 2.311 0 00-2.3-2.315z"
                fill={theme.colors[backgroundColor]}
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
