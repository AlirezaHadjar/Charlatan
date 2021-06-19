import * as React from "react";
import Svg, {Path} from "react-native-svg";

function SvgComponent() {
    return (
        <Svg width={21} height={23.333} viewBox="0 0 21 23.333">
            <Path
                data-name="Delete"
                d="M5.987 23.288a3.4 3.4 0 01-3.42-3.3C2.2 16.669 1.592 8.817 1.58 8.737a.923.923 0 01.22-.651.826.826 0 01.61-.273H18.6a.845.845 0 01.61.273.869.869 0 01.211.651c0 .08-.622 7.943-.976 11.253a3.4 3.4 0 01-3.5 3.3c-1.511.034-2.987.045-4.44.045a207.375 207.375 0 01-4.518-.047zM.833 5.94A.852.852 0 010 5.083V4.64a.844.844 0 01.833-.857h3.4A1.5 1.5 0 005.683 2.6l.177-.8A2.32 2.32 0 018.091 0h4.817a2.319 2.319 0 012.22 1.746l.19.852a1.493 1.493 0 001.448 1.185h3.4A.844.844 0 0121 4.64v.443a.851.851 0 01-.832.857z"
                fill="#bfbecb"
            />
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
