/* eslint-disable max-len */
import {useTheme} from "@shopify/restyle";
import * as React from "react";
import Svg, {G, Path, Circle, Rect, Ellipse} from "react-native-svg";

import {ThemeType} from "../../theme/Theme";

const DEFAULT_WIDTH = 360;
const DEFAULT_HEIGHT = 360.475;

interface Props {
    scale?: number;
}

function SvgComponent({scale = 1}: Props) {
    const width = React.useMemo(() => scale * DEFAULT_WIDTH, [scale]);
    const height = React.useMemo(() => scale * DEFAULT_HEIGHT, [scale]);
    const theme = useTheme<ThemeType>();
    const color = {
        primary: theme.colors.characterPrimary,
        secondary: "#002741",
        primaryShadow: "#3B4351",
        secondaryShadow: "#011E31",
        land: "#414753",
        hair: "#4c2d22",
        glasses: "#1c1106",
        skinLight: "#feb3ae",
        skinDark: "#ed9f9d",
    };
    return (
        <Svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
            <G data-name="Group 23">
                <Path data-name="Rectangle 1" d="M0 0h359.98v359.98H0z" />
                <G data-name="Group 12">
                    <Path
                        data-name="Path 1"
                        d="M0 341.945v-35.513c5.836-25.46 39.118-65.689 74.417-7 21.928 36.46 42.19-19.844 84.832-32.225s51.853 27.957 83.527 26.423-5.06-85.83 65.549-88.526c32.68-1.248 51.656 16.151 51.656 16.151v138.671H0z"
                        fill={color.land}
                    />
                    <G data-name="Group 9">
                        <G data-name="Group 7">
                            <Path
                                data-name="Path 2"
                                d="M212.036 188.135h-64.774s-52.6 21.135-52.6 83.837v87.99h169.98v-87.99c-.003-62.702-52.606-83.837-52.606-83.837z"
                                fill={color.primary}
                            />
                            <Path
                                data-name="Path 3"
                                d="M138.236 204.465s-8.511 2.332-12.023 5.976c-3.843 3.989-7.039 10.838-7.039 10.838l61.192 28.01z"
                                fill={color.primaryShadow}
                            />
                            <Path
                                data-name="Path 4"
                                d="M179.887 139.212s-27.416 9.733-88.169 32.629c0 0 26.685 2.752 46.677 37.137h42.751z"
                                fill={color.secondary}
                            />
                            <Path
                                data-name="Path 5"
                                d="M176.934 139.212s30.654 9.717 91.166 32.629c0 0-29.682 2.752-49.675 37.137h-42.749z"
                                fill={color.secondary}
                            />
                            <Path
                                data-name="Path 6"
                                d="M125.611 296.032l4.016 63.4-9.212.072 3.5-63.445z"
                                fill={color.secondary}
                            />
                            <Path
                                data-name="Path 7"
                                d="M237.855 296.051l.3 63.433-9.675-.036 7.675-63.409z"
                                fill={color.secondary}
                            />
                            <Path
                                data-name="Path 8"
                                d="M176.983 359.981l-1.714-89.359 2.393-3.394 1.714 92.712z"
                                fill={color.secondary}
                            />
                            <Path
                                data-name="Rectangle 2"
                                fill={color.secondary}
                                d="M128.854 274.231h32.99v4.692h-32.99z"
                            />
                            <Path
                                data-name="Path 9"
                                d="M146.238 204.465l37.753 46.19 27.608-46.19z"
                                fill="#d1d2d4"
                            />
                            <Path
                                data-name="Path 10"
                                d="M191.488 166.356h-23.156c-4.678 0-8.47 4.257-8.47 9.509v23.35c0 12.429 8.976 20.031 20.048 20.031s20.048-7.6 20.048-20.031v-23.351c0-5.251-3.792-9.508-8.47-9.508z"
                                fill={color.skinLight}
                            />
                            <Path
                                data-name="Path 11"
                                d="M158.445 184.919s1.624 15.024 20.053 15.024 20.049-15.023 20.049-15.023z"
                                fill={color.skinLight}
                            />
                            <G
                                data-name="Group 5"
                                transform="translate(88.982 56.911)">
                                <Circle
                                    data-name="Ellipse 1"
                                    cx={13.878}
                                    cy={13.878}
                                    r={13.878}
                                    transform="rotate(-80.85 67.979 30.075)"
                                    fill={color.skinDark}
                                />
                                <Circle
                                    data-name="Ellipse 2"
                                    cx={13.878}
                                    cy={13.878}
                                    r={13.878}
                                    transform="rotate(-80.85 115.28 -25.457)"
                                    fill={color.skinDark}
                                />
                                <Path
                                    data-name="Rectangle 3"
                                    d="M32.531 59.72h10.847v21.261a10.847 10.847 0 01-10.847-10.847V59.72z"
                                    fill={color.hair}
                                />
                                <Path
                                    data-name="Rectangle 4"
                                    d="M137.955 80.981V59.72h10.847v10.414a10.847 10.847 0 01-10.847 10.847z"
                                    fill={color.hair}
                                />
                                <Path
                                    data-name="Path 12"
                                    d="M86.809 136.432l-.083.081c1.3.106 2.612.174 3.94.174a47.763 47.763 0 0011.573-1.419c.017-.032.03-.066.046-.1a46.96 46.96 0 0035.67-45.432V34.832c0-25.881-21.172-21.758-47.289-21.758S43.378 8.951 43.378 34.832v54.9a47.029 47.029 0 0043.431 46.7z"
                                    fill={color.skinLight}
                                />
                                <Path
                                    data-name="Path 13"
                                    d="M96.879 110.681H84.618a2.356 2.356 0 01-2.356-2.356 2.356 2.356 0 012.356-2.356H96.88a2.356 2.356 0 012.356 2.356 2.356 2.356 0 01-2.357 2.356z"
                                    fill={color.skinDark}
                                />
                                <Path
                                    data-name="Path 14"
                                    d="M103.949 90.35a52.911 52.911 0 00-14 .393 52.909 52.909 0 00-14-.393 15.712 15.712 0 00-14.208 15.677 2.868 2.868 0 003.313 2.837 155.712 155.712 0 0123.882-1.747v.006c.343 0 .678 0 1.016-.005s.673 0 1.016.005v-.006a155.712 155.712 0 0123.882 1.747 2.868 2.868 0 003.313-2.837 15.712 15.712 0 00-14.214-15.677z"
                                    fill={color.hair}
                                />
                                <G data-name="Group 3">
                                    <Path
                                        data-name="Path 15"
                                        d="M87.639 91.042a3.307 3.307 0 11-3.307-3.307 3.307 3.307 0 013.307 3.307z"
                                        fill={color.skinLight}
                                    />
                                    <Path
                                        data-name="Path 16"
                                        d="M97.998 91.042a3.307 3.307 0 11-3.307-3.307 3.307 3.307 0 013.307 3.307z"
                                        fill={color.skinLight}
                                    />
                                    <Path
                                        data-name="Path 17"
                                        d="M90.752 97.497h-2.165a4.255 4.255 0 01-4.223-4.783l1.083-10.378a4.255 4.255 0 014.222-3.727 4.255 4.255 0 014.223 3.727l1.083 10.378a4.255 4.255 0 01-4.223 4.783z"
                                        fill={color.skinDark}
                                    />
                                    <G
                                        data-name="Group 2"
                                        transform="translate(48.176 67.169)">
                                        <G
                                            data-name="Group 1"
                                            fill={color.glasses}>
                                            <Path
                                                data-name="Rectangle 5"
                                                d="M12.119 0h15.046a10.677 10.677 0 0110.677 10.677v1.236A15.527 15.527 0 0122.315 27.44h-1.81A17.913 17.913 0 012.592 9.527 9.527 9.527 0 0112.119 0z"
                                            />
                                            <Path
                                                data-name="Rectangle 6"
                                                d="M62.494 27.44h-1.81a15.527 15.527 0 01-15.527-15.527v-1.236A10.677 10.677 0 0155.833 0H70.88a9.527 9.527 0 019.527 9.527A17.913 17.913 0 0162.494 27.44z"
                                            />
                                            <Path
                                                data-name="Rectangle 7"
                                                d="M36.871 7.488H45.8v6.459h-8.929z"
                                            />
                                        </G>
                                        <Rect
                                            data-name="Rectangle 8"
                                            width={15.444}
                                            height={6.939}
                                            rx={2.265}
                                            transform="translate(0 .016)"
                                            fill="#150d03"
                                        />
                                        <Rect
                                            data-name="Rectangle 9"
                                            width={15.444}
                                            height={6.939}
                                            rx={2.265}
                                            transform="translate(67.299)"
                                            fill="#150d03"
                                        />
                                    </G>
                                </G>
                                <G data-name="Group 4" fill={color.primary}>
                                    <Ellipse
                                        data-name="Ellipse 3"
                                        cx={89.667}
                                        cy={17.899}
                                        rx={89.667}
                                        ry={17.899}
                                        transform="translate(0 41.99)"
                                    />
                                    <Path
                                        data-name="Path 18"
                                        d="M35.59 51.965l8.545-39.191A16.231 16.231 0 0159.994 0h60.781a16.231 16.231 0 0115.807 12.547l9.187 39.418z"
                                    />
                                </G>
                            </G>
                            <Path
                                data-name="Path 19"
                                d="M152.058 188.135l-42.149 18.743c29.027 14.315 77.068 49.535 77.068 49.535z"
                                fill={color.secondary}
                            />
                            <Path
                                data-name="Path 20"
                                d="M148.98 56.911s16.088 16.082 50.98 0z"
                                fill={color.primaryShadow}
                            />
                            <Path
                                data-name="Path 21"
                                d="M226.939 207.039l16.12 12.978s-44.448 14.631-65.18 52.546c-.001.003 15.349-55.574 49.06-65.524z"
                                fill={color.primaryShadow}
                            />
                            <G data-name="Group 6">
                                <Path
                                    data-name="Path 22"
                                    d="M144.879 107.097c18.738 3.341 50.15 5.647 88.413-4.362l-3.736-16.032s-33.7 8.308-86.688 1.833l2.013 18.561z"
                                    fill={color.secondary}
                                />
                                <Path
                                    data-name="Path 23"
                                    d="M142.867 88.536l-3.117-28.744c-2.6.418-6.266 7.061-6.631 9.892l-7.114 32.68 3.431-15.734q6.904 1.116 13.431 1.906z"
                                    fill={color.primaryShadow}
                                />
                            </G>
                            <Path
                                data-name="Path 24"
                                d="M144.88 107.097l-2.013-18.561q-6.526-.8-13.432-1.905l-3.431 15.734q1.4.487 2.732.911a135.622 135.622 0 0016.142 3.821z"
                                fill={color.secondaryShadow}
                            />
                            <Path
                                data-name="Path 25"
                                d="M144.881 107.097s-26.4 9.7-12.52 25.036c0 0-49.23-5.738-43.378-17.149 4.595-8.958 37.023-12.618 37.023-12.618"
                                fill={color.primaryShadow}
                            />
                            <Path
                                data-name="Path 26"
                                d="M131.779 274.231l10.412-13.358 12.61 13.358z"
                                fill="#d1d2d4"
                            />
                            <Path
                                data-name="Path 27"
                                d="M145.349 274.231l6.73-8.418 6.84 8.418z"
                                fill="#b7b7b7"
                            />
                        </G>
                        <G data-name="Group 8">
                            <Path
                                data-name="Path 28"
                                d="M248.24 206.375l-25.754-11.434 13.9-32.06a58.639 58.639 0 00-28.217 15.622c-25.98 20.607-31.636 71.325-32.865 91.7l.109 7.616c19.663-46.684 72.827-71.444 72.827-71.444z"
                                fill={color.secondary}
                            />
                        </G>
                    </G>
                    <G data-name="Group 10" fill={color.primary}>
                        <Path
                            data-name="Rectangle 10"
                            d="M270.782 47.552h34.071v13.339h-34.071z"
                        />
                        <Path
                            data-name="Rectangle 11"
                            d="M290.624 65.787h34.071v13.339h-34.071z"
                        />
                    </G>
                    <Path
                        data-name="Rectangle 12"
                        fill={color.primary}
                        d="M286.188 172.072h34.071v13.339h-34.071z"
                    />
                    <G data-name="Group 11" fill={color.primary}>
                        <Path
                            data-name="Rectangle 13"
                            d="M39.061 179.982h34.071v13.339H39.061z"
                        />
                        <Path
                            data-name="Rectangle 14"
                            d="M20.586 198.839h34.071v13.339H20.586z"
                        />
                    </G>
                    <Path
                        data-name="Path 29"
                        d="M69.99 359.905s52.1 7.683 75.5-33.343c9.107-15.967 27.775-42.9 57.575-8.359s14.414-32.131 38.806-32.453c17.255-.228 12.037 10.1 29.072 8.989s16.741-19.3 38.615-28.546c34.262-14.482 50.439 36.294 50.439 36.294v57.437H143.504z"
                        fill={color.land}
                        opacity={0.7}
                    />
                </G>
            </G>
        </Svg>
    );
}

const MemoSvgComponent = React.memo(SvgComponent);
export default MemoSvgComponent;
