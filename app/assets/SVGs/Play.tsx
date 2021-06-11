/* eslint-disable max-len */
import {useTheme} from "@shopify/restyle";
import * as React from "react";
import Svg, {Path} from "react-native-svg";

import {ThemeType} from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof ThemeType["colors"];
}

const Play = ({scale = 1, color = "buttonPrimary"}: Props) => {
    const theme = useTheme<ThemeType>();
    return (
        <Svg
            width={scale * normalize(42.667)}
            height={scale * normalize(51)}
            viewBox="0 0 42.667 51">
            <Path
                data-name="Arrow - Right 2"
                d="M40.628 30.212c-.235.242-1.124 1.275-1.952 2.125-4.855 5.346-17.519 14.1-24.148 16.767A19.235 19.235 0 019.617 50.5a8.055 8.055 0 01-3.73-.908 7.808 7.808 0 01-3.312-3.767 41 41 0 01-1.068-4.433A99.911 99.911 0 01.5 25.533a115.519 115.519 0 01.889-15.371C1.45 10.1 2.1 6.029 2.81 4.633A7.438 7.438 0 019.381.5h.235a20.327 20.327 0 015.5 1.7c6.271 2.675 18.643 11 23.616 16.525a23.582 23.582 0 012.009 2.308 7.431 7.431 0 011.421 4.433 7.811 7.811 0 01-1.538 4.742"
                fill={theme.colors[color]}
                stroke={theme.colors[color]}
            />
        </Svg>
    );
};

const MemoSvgComponent = React.memo(Play);
export default MemoSvgComponent;
