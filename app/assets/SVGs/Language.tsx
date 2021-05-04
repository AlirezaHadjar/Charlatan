import * as React from "react";
import Svg, {G, Path} from "react-native-svg";

import theme from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
}

function SvgComponent({scale = 1, color = "buttonPrimary"}: Props) {
    return (
        <Svg
            width={scale * normalize(24)}
            height={scale * normalize(24)}
            viewBox="0 0 24 24">
            <G fill={theme.colors[color]}>
                <Path
                    data-name="Path 4"
                    // eslint-disable-next-line max-len
                    d="M21.418 9.791H12.38a2.589 2.589 0 00-2.586 2.586v4.91L7.452 18.96a.7.7 0 000 1.144l2.37 1.693a2.59 2.59 0 002.558 2.2h9.038a2.589 2.589 0 002.586-2.586v-9.038a2.589 2.589 0 00-2.586-2.586zm-3.039 9.88c-.166 0-.294-.053-.331-.2l-.286-1h-1.725l-.286 1c-.038.143-.166.2-.331.2-.264 0-.618-.166-.618-.407a.435.435 0 01.015-.075l1.454-4.737a.612.612 0 01.625-.332c.286 0 .565.106.633.332l1.454 4.737a.333.333 0 01.015.075c-.005.234-.359.407-.623.407zm0 0"
                />
                <Path
                    data-name="Path 5"
                    d="M16.236 17.705h1.311l-.656-2.312zm0 0"
                />
                <Path
                    data-name="Path 6"
                    // eslint-disable-next-line max-len
                    d="M8.384 12.377a3.972 3.972 0 01.88-2.5A3.773 3.773 0 017.1 9.2a3.772 3.772 0 01-2.16.677.4.4 0 010-.793 2.985 2.985 0 001.538-.425 3.782 3.782 0 01-.992-2.18h-.542a.4.4 0 110-.793h1.764v-.96a.4.4 0 11.793 0v.963h1.764a.4.4 0 110 .793h-.547a3.782 3.782 0 01-.992 2.18 2.981 2.981 0 001.538.425.4.4 0 01.4.368 3.977 3.977 0 012.717-1.071h1.833V6.713l2.342-1.673a.7.7 0 000-1.144L14.181 2.2A2.59 2.59 0 0011.623 0H2.586A2.589 2.589 0 000 2.586v9.038a2.589 2.589 0 002.586 2.586h5.8zm0 0"
                />
                <Path
                    data-name="Path 7"
                    d="M7.106 8.166a2.994 2.994 0 00.815-1.685H6.292a3 3 0 00.814 1.685zm0 0"
                />
            </G>
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
