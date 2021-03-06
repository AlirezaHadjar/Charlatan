/* eslint-disable max-len */
import {useTheme} from "@shopify/restyle";
import * as React from "react";
import Svg, {G, Path} from "react-native-svg";

import {ThemeType} from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof ThemeType["colors"];
}

const Cog = ({scale = 1, color = "buttonPrimary"}: Props) => {
    const theme = useTheme<ThemeType>();
    return (
        <Svg
            width={scale * normalize(28)}
            height={scale * normalize(28)}
            viewBox="0 0 28 28">
            <G>
                <Path
                    data-name="Setting"
                    d="M25.666 13.187v1.623a2.411 2.411 0 01-2.392 2.479 2.221 2.221 0 00-2.123 2.193 1.844 1.844 0 00.269 1.049 2.524 2.524 0 01.35 1.264 2.476 2.476 0 01-1.213 2.122l-1.4.822a2.338 2.338 0 01-2.392.024 2.46 2.46 0 01-.921-.953 1.928 1.928 0 00-.747-.752 2.08 2.08 0 00-1.593-.221 2.143 2.143 0 00-1.324 1 2.386 2.386 0 01-3.3.883l-1.377-.8a2.476 2.476 0 01-.886-3.362 2.21 2.21 0 00.261-1.046 2.285 2.285 0 00-1.068-1.948 1.8 1.8 0 00-1.027-.275 2.086 2.086 0 01-1.236-.334 2.57 2.57 0 01-1.214-2.11v-1.681a2.513 2.513 0 011.214-2.123 2.078 2.078 0 011.236-.321 1.8 1.8 0 001.027-.274 2.292 2.292 0 001.066-1.951 2.247 2.247 0 00-.261-1.054 2.463 2.463 0 01.886-3.351l1.377-.8a2.365 2.365 0 013.3.882 2.134 2.134 0 001.328 1 2.066 2.066 0 001.589-.232 1.832 1.832 0 00.747-.739 2.691 2.691 0 01.921-.966 2.37 2.37 0 012.392.023l1.4.835a2.448 2.448 0 01.863 3.375 1.891 1.891 0 00-.269 1.049 2.216 2.216 0 002.123 2.206 2.4 2.4 0 012.394 2.464zm-14.956.795a3.348 3.348 0 003.3 3.386 3.224 3.224 0 002.334-.986 3.419 3.419 0 00.958-2.4 3.292 3.292 0 00-5.628-2.377 3.356 3.356 0 00-.964 2.377z"
                    fill={theme.colors[color]}
                />
            </G>
        </Svg>
    );
};

const MemoSvgComponent = React.memo(Cog);
export default MemoSvgComponent;
