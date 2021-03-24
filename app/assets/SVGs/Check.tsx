import * as React from "react";
import Svg, {Path} from "react-native-svg";

function SvgComponent() {
    return (
        <Svg width={11.827} height={8.662} viewBox="0 0 11.827 8.662">
            <Path
                data-name="Fill 4"
                d="M4.331 8.662a1.163 1.163 0 01-.825-.341L.342 5.157a1.167 1.167 0 011.649-1.651l2.34 2.34 5.5-5.5a1.167 1.167 0 011.649 1.651L5.157 8.321a1.163 1.163 0 01-.825.341"
                fill="#707070"
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
