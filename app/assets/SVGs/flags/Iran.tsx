/* eslint-disable max-len */
import * as React from "react";
import {View} from "react-native";
import Svg, {G, Circle, Path} from "react-native-svg";

function SvgComponent() {
    return (
        <View style={{width: 45, height: 45, overflow: "hidden"}}>
            <Svg width={50} height={50} viewBox="0 0 148 148" style={{end: 5}}>
                <G transform="translate(0 -.001)">
                    <Circle
                        data-name="Ellipse 16"
                        cx={65}
                        cy={65}
                        r={65}
                        transform="translate(15 9)"
                        fill="#f0f0f0"
                    />
                </G>
                <Path
                    data-name="Path 54"
                    d="M41.8 40.261h8.463v5.642h8.463v-5.642h8.463v5.642h8.463v-5.642h8.463v5.642h8.463v-5.642h8.463v5.642h8.463v-5.642h8.463v5.642h20.369a64.91 64.91 0 00-116.895 0H41.8z"
                    fill="#6da544"
                />
                <Path
                    data-name="Path 55"
                    d="M117.971 102.321v5.642h-8.463v-5.642h-8.463v5.642h-8.464v-5.642h-8.463v5.642h-8.464v-5.642h-8.463v5.642h-8.463v-5.642h-8.464v5.642H41.8v-5.642H21.436a64.911 64.911 0 00116.9 0z"
                    fill="#d80027"
                />
                <G data-name="Group 57" fill="#d80027">
                    <Path
                        data-name="Path 87"
                        d="M71.567 86.62a14.032 14.032 0 0016.567-6.466 14.032 14.032 0 00-3.078-17.515 15.385 15.385 0 01.662 16.156 15.385 15.385 0 01-14.15 7.825"
                    />
                    <Path
                        data-name="Path 88"
                        d="M89.513 83.928a11.753 11.753 0 005.758-11.808 11.753 11.753 0 00-8.784-9.769 15.385 15.385 0 015.991 10.16 15.385 15.385 0 01-2.965 11.417"
                    />
                    <Path
                        data-name="Path 89"
                        d="M80 89.137l-.769-15.385L80 61.64a4.769 4.769 0 001.816 1.527v9.043l-.619 15.279z"
                    />
                    <Path
                        data-name="Path 90"
                        d="M79.693 60.675l.308.289a2.22 2.22 0 002.873.675 2.22 2.22 0 001.005-2.775 2.1 2.1 0 01-1.709 1.679 2.1 2.1 0 01-2.169-1.016"
                    />
                    <G data-name="Group 56">
                        <Path
                            data-name="Path 91"
                            d="M88.434 86.62a14.032 14.032 0 01-13.488-23.982A15.385 15.385 0 0088.434 86.62"
                        />
                        <Path
                            data-name="Path 92"
                            d="M70.488 83.928A11.753 11.753 0 0164.73 72.12a11.753 11.753 0 018.784-9.769 15.385 15.385 0 00-5.991 10.16 15.385 15.385 0 002.965 11.417"
                        />
                        <Path
                            data-name="Path 93"
                            d="M80.001 89.137l.769-15.385-.769-12.115a4.769 4.769 0 01-1.816 1.524v9.046l.619 15.282z"
                        />
                        <Path
                            data-name="Path 94"
                            d="M80.308 60.675l-.308.289a2.22 2.22 0 01-3.878-2.1 2.1 2.1 0 003.878.663"
                        />
                    </G>
                </G>
            </Svg>
        </View>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
