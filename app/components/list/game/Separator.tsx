import React from "react";
import {StyleSheet, Dimensions} from "react-native";
import Svg, {Path} from "react-native-svg";

import Box from "../../../theme/Box";
import theme, {ThemeType} from "../../../theme/Theme";
import normalize from "../../../utils/normalizer";
import AppText from "../../Text";

export interface SeparatorProps {
    stroke?: number;
    color?: keyof ThemeType["colors"];
    strokeDasharray?: number;
    width?: number;
    text?: string;
}

const {width: SCREEN_WIDTH} = Dimensions.get("window");
const STROKE = 3;

const Separator: React.FC<SeparatorProps> = ({
    stroke = STROKE,
    color = "cardIndicator",
    strokeDasharray = 17,
    width = SCREEN_WIDTH,
    text,
}) => {
    const styles = StyleSheet.create({
        container: {
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 2,
            overflow: "hidden",
            alignSelf: "center",
        },
    });
    return (
        <Box justifyContent="center" marginVertical="s">
            <Svg
                width={width}
                height={stroke}
                viewBox={`0 0 ${width} ${stroke}`}
                style={styles.container}>
                <Path
                    d={`M 0 0 L ${width} 0`}
                    stroke={theme.colors[color]}
                    strokeWidth={stroke}
                    strokeDasharray={strokeDasharray}
                    strokeLinecap="butt"
                />
            </Svg>
            {text && (
                <Box
                    position="absolute"
                    alignSelf="center"
                    paddingHorizontal="m"
                    backgroundColor="cardBackground">
                    <AppText
                        fontSize={normalize(18)}
                        variant="bold"
                        color="danger"
                        numberOfLines={1}>
                        {text}
                    </AppText>
                </Box>
            )}
        </Box>
    );
};

export default Separator;
