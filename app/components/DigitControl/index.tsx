import {useTheme} from "@shopify/restyle";
import React from "react";
import {Dimensions} from "react-native";
import Animated, {FlipInXDown, FlipInXUp} from "react-native-reanimated";
import MinusIcon from "../../assets/SVGs/Minus";
import PlusIcon from "../../assets/SVGs/Plus";
import usePrevious from "../../hooks/previous";
import Box from "../../theme/Box";
import {ThemeType} from "../../theme/Theme";
import {isNil} from "../../utils/nil";
import normalize from "../../utils/normalizer";
import AppText from "../Text";
import AppTouchable from "../Touchable";

interface DigitControlProps {
    value: number;
    decrementDisableText: string;
    incrementDisableText: string;
    decrementDisabled: boolean;
    incrementDisabled: boolean;
    onDecrementPress: () => void;
    onIncrementPress: () => void;
    backgroundColor?: keyof ThemeType["colors"];
}

const {height} = Dimensions.get("window");
const ICON_SIZE = (height * 5) / 100;

const AnimatedBox = Animated.createAnimatedComponent(Box);

const DigitControl: React.FC<DigitControlProps> = ({
    value,
    decrementDisableText,
    incrementDisableText,
    decrementDisabled,
    onDecrementPress,
    incrementDisabled,
    onIncrementPress,
    backgroundColor = "buttonTertiary",
}) => {
    const theme = useTheme<ThemeType>();
    const previousValue = usePrevious(value);

    const enteringAnimation =
        !isNil(previousValue) && previousValue < value
            ? FlipInXUp.springify()
            : FlipInXDown.springify();
    return (
        <Box
            borderRadius="sl"
            padding="ms"
            width={ICON_SIZE * 3 + 4 * theme.spacing.ms}
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor={backgroundColor}>
            <AppTouchable
                disableText={decrementDisableText}
                disabled={decrementDisabled}
                onPress={onDecrementPress}>
                <Box
                    height={ICON_SIZE}
                    width={ICON_SIZE}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="hero3"
                    backgroundColor="buttonPrimary">
                    <MinusIcon color={backgroundColor} />
                </Box>
            </AppTouchable>
            <AnimatedBox
                backgroundColor="buttonPrimary"
                alignItems="center"
                justifyContent="center"
                borderRadius="xl"
                marginHorizontal="ms"
                width={ICON_SIZE}
                height={ICON_SIZE}
                key={value}
                entering={enteringAnimation}>
                <AppText
                    variant="bold"
                    fontSize={normalize(30)}
                    color={backgroundColor}>
                    {value}
                </AppText>
            </AnimatedBox>
            <AppTouchable
                disableText={incrementDisableText}
                disabled={incrementDisabled}
                onPress={onIncrementPress}>
                <Box
                    height={ICON_SIZE}
                    width={ICON_SIZE}
                    alignItems="center"
                    justifyContent="center"
                    borderRadius="hero3"
                    backgroundColor="buttonPrimary">
                    <PlusIcon color={backgroundColor} />
                </Box>
            </AppTouchable>
        </Box>
    );
};

export default DigitControl;
