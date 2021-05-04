/* eslint-disable max-len */
import * as React from "react";
import Svg, {Path} from "react-native-svg";

import theme from "../../theme/Theme";
import normalize from "../../utils/normalizer";

interface Props {
    scale?: number;
    color?: keyof typeof theme["colors"];
}

function SvgComponent({scale = 1, color = "buttonPrimary"}: Props) {
    return (
        <Svg
            data-name="2 User"
            width={scale * normalize(20)}
            height={scale * normalize(18)}
            viewBox="0 0 20 18">
            <Path
                data-name="2 Friends"
                d="M0 14.917c0-2.447 3.386-3.06 7.349-3.06 3.985 0 7.349.634 7.349 3.083S11.313 18 7.349 18C3.364 18 0 17.366 0 14.917zm16.633.475c.341-3.112-2.366-4.588-3.067-4.927a.053.053 0 01-.033-.054.041.041 0 01.037-.028 18.394 18.394 0 013.748.319 3.193 3.193 0 012.462 1.468 2.106 2.106 0 010 1.877c-.532 1.123-2.246 1.485-2.912 1.578h-.03a.208.208 0 01-.205-.232zM2.487 4.763A4.8 4.8 0 017.349 0a4.8 4.8 0 014.863 4.763 4.8 4.8 0 01-4.863 4.762 4.8 4.8 0 01-4.862-4.762zm11.232 4.059a4.069 4.069 0 01-.56-.052.177.177 0 01-.122-.274 6.432 6.432 0 00-.1-7.439.11.11 0 01-.018-.123.148.148 0 01.094-.056A4.2 4.2 0 0113.834.8a4.045 4.045 0 013.957 5.076 4.04 4.04 0 01-3.961 2.947z"
                fill={theme.colors[color]}
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
