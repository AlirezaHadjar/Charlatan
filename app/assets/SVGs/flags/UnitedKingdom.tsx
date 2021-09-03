/* eslint-disable max-len */
import * as React from "react";
import {View} from "react-native";
import Svg, {G, Circle, Path} from "react-native-svg";

function SvgComponent() {
    return (
        <View style={{width: 45, height: 50, overflow: "hidden"}}>
            <Svg width={50} height={50} viewBox="0 0 148 148">
                <G transform="translate(0 .003)">
                    <Circle
                        data-name="Ellipse 15"
                        cx={65}
                        cy={65}
                        r={65}
                        transform="translate(3 9)"
                        fill="#f0f0f0"
                    />
                </G>
                <G data-name="Group 41" fill="#0052b4">
                    <Path
                        data-name="Path 40"
                        d="M16.431 34.464A64.74 64.74 0 005.238 57.073h33.8z"
                    />
                    <Path
                        data-name="Path 41"
                        d="M130.714 57.073a64.745 64.745 0 00-11.193-22.609L96.912 57.073z"
                    />
                    <Path
                        data-name="Path 42"
                        d="M5.238 90.974a64.746 64.746 0 0011.193 22.609l22.608-22.609z"
                    />
                    <Path
                        data-name="Path 43"
                        d="M107.535 22.479a64.743 64.743 0 00-22.609-11.194v33.8z"
                    />
                    <Path
                        data-name="Path 44"
                        d="M28.417 125.567a64.746 64.746 0 0022.609 11.194v-33.8z"
                    />
                    <Path
                        data-name="Path 45"
                        d="M51.026 11.285a64.746 64.746 0 00-22.609 11.193l22.609 22.609z"
                    />
                    <Path
                        data-name="Path 46"
                        d="M84.927 136.761a64.746 64.746 0 0022.609-11.193l-22.609-22.609z"
                    />
                    <Path
                        data-name="Path 47"
                        d="M96.912 90.974l22.609 22.609a64.743 64.743 0 0011.193-22.609z"
                    />
                </G>
                <G data-name="Group 42" fill="#d80027">
                    <Path
                        data-name="Path 48"
                        d="M132.4 65.546H76.452V9.596a65.573 65.573 0 00-16.952 0v55.95H3.55a65.573 65.573 0 000 16.951H59.5v55.949a65.573 65.573 0 0016.951 0V82.498H132.4a65.573 65.573 0 000-16.951z"
                    />
                    <Path
                        data-name="Path 49"
                        d="M84.927 90.973l28.995 28.995q2-2 3.819-4.171L92.917 90.973h-7.991z"
                    />
                    <Path
                        data-name="Path 50"
                        d="M51.026 90.973l-28.995 28.995q2 2 4.171 3.819l24.824-24.824v-7.99z"
                    />
                    <Path
                        data-name="Path 51"
                        d="M51.026 57.073l-28.995-29q-2 2-3.819 4.171l24.824 24.824h7.99z"
                    />
                    <Path
                        data-name="Path 52"
                        d="M84.927 57.072l29-29q-2-2-4.171-3.819L84.927 49.082z"
                    />
                </G>
            </Svg>
        </View>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
