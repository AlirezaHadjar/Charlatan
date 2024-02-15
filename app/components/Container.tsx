// import {BottomSheetModalProvider} from "@gorhom/bottom-sheet";
import {BoxProps, useTheme} from "@shopify/restyle";
import React from "react";
import {StyleProp, StyleSheet, View, ViewStyle} from "react-native";
import {useSafeAreaInsets} from "react-native-safe-area-context";

import Spy from "../assets/SVGs/Spy";
import Box from "../theme/Box";
import {ThemeType} from "../theme/Theme";

export interface Props extends BoxProps<ThemeType> {
    hasIcon?: boolean;
    style?: StyleProp<ViewStyle>;
    children: React.ReactNode;
}

const Container: React.FC<Props> = ({
    children,
    hasIcon = false,
    style,
    ...props
}) => {
    const staticTheme = useTheme<ThemeType>();
    const {bottom, top} = useSafeAreaInsets();

    const styles = StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: staticTheme.colors.mainBackground,
            width: "100%",
            paddingBottom: bottom,
            paddingTop: top,
        },
    });
    return (
        <View style={[styles.container, style]}>
            {hasIcon && (
                <Box position="absolute" bottom={0} alignSelf="center">
                    <Spy />
                </Box>
            )}
            <Box width="100%" height="100%" {...props}>
                {children}
            </Box>
        </View>
    );
};

export default Container;
