/* eslint-disable max-len */
import * as React from "react";
import Svg, {G, Path, Circle} from "react-native-svg";

import theme from "../../theme/Theme";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
}

const QuestionComponent = ({scale = 1, color = "buttonPrimary"}: Props) => {
    return (
        <Svg
            width={scale * 13.886}
            height={scale * 25.632}
            viewBox="0 0 13.886 25.632">
            <G
                data-name="Group 1"
                transform="translate(-10549.14 -5553.576)"
                fill={theme.colors[color]}>
                <Path
                    data-name="Path 1"
                    d="M10554.057 5569.255v-1.064a6.05 6.05 0 01.161-1.436 5.147 5.147 0 01.5-1.274 6.388 6.388 0 01.9-1.226 15.745 15.745 0 011.4-1.323 10.024 10.024 0 001.355-1.42 2.56 2.56 0 00.484-1.581 2.375 2.375 0 00-.726-1.71 2.648 2.648 0 00-1.984-.742 3.192 3.192 0 00-1.226.226 3.222 3.222 0 00-.968.613 3.587 3.587 0 00-.694.871 7.419 7.419 0 00-.4 1l-3.71-1.549a7.092 7.092 0 01.823-1.807 7 7 0 011.42-1.629 7.01 7.01 0 012.016-1.178 7.162 7.162 0 012.613-.452 8.276 8.276 0 012.839.468 6.692 6.692 0 012.21 1.29 5.859 5.859 0 011.436 1.952 5.75 5.75 0 01.516 2.42 5.757 5.757 0 01-.226 1.678 6.184 6.184 0 01-.613 1.387 7.535 7.535 0 01-.9 1.21q-.516.565-1.1 1.113-.548.516-.919.936a4.143 4.143 0 00-.581.823 3.379 3.379 0 00-.306.855 4.956 4.956 0 00-.1 1.032v.516zm2.065 9.953a2.651 2.651 0 01-1.968-.823 2.731 2.731 0 01-.807-1.985 2.678 2.678 0 01.807-1.968 2.678 2.678 0 011.968-.807 2.731 2.731 0 011.984.807 2.651 2.651 0 01.822 1.968 2.7 2.7 0 01-.827 1.985 2.7 2.7 0 01-1.979.823z"
                />
                <Circle
                    data-name="Ellipse 4"
                    cx={2.016}
                    cy={2.016}
                    r={2.016}
                    transform="translate(10549.14 5557.028)"
                />
                <Circle
                    data-name="Ellipse 5"
                    cx={2.107}
                    cy={2.107}
                    r={2.107}
                    transform="translate(10554.06 5567.11)"
                />
            </G>
        </Svg>
    );
};

const MemoSvgComponent = React.memo(QuestionComponent);
export default MemoSvgComponent;
