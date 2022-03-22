import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {BoxProps, useTheme} from "@shopify/restyle";
import React from "react";
import {StyleProp, StyleSheet, ViewStyle} from "react-native";
import {SafeAreaView} from "react-native-safe-area-context";

import Spy from "../assets/SVGs/Spy";
import Box from "../theme/Box";
import {ThemeType} from "../theme/Theme";

export interface Props extends BoxProps<ThemeType> {
    hasIcon?: boolean;
    style?: StyleProp<ViewStyle>;
}

const Container: React.FC<Props> = ({
    children,
    hasIcon = false,
    style,
    ...props
}) => {
    const staticTheme = useTheme<ThemeType>();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: staticTheme.colors.mainBackground,
            width: "100%",
        },
    });
    return (
        <BottomSheetModalProvider>
            <SafeAreaView style={[styles.container, style]}>
                {hasIcon && (
                    <Box position="absolute" bottom={0} alignSelf="center">
                        <Spy />
                    </Box>
                )}
                <Box width="100%" height="100%" {...props}>
                    {children}
                </Box>
            </SafeAreaView>
        </BottomSheetModalProvider>
    );
};

export default Container;
