import React, {useCallback, useEffect} from "react";
import {
    Dimensions,
    StyleSheet,
    TouchableOpacity,
    TouchableWithoutFeedback,
} from "react-native";
import Animated, {
    Extrapolate,
    interpolate,
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withTiming,
} from "react-native-reanimated";

import Box from "../theme/Box";
import Danger from "../assets/SVGs/Danger";
import {useSelector} from "../store/useSelector";
import {getAlert, removeAlert} from "../store/reducers/alert";
import {Alert as AlertType} from "../types";
import {useAppDispatch} from "../store/configureStore";
import {useTranslation} from "../hooks/translation";

import AppText from "./Text";

const {height, width} = Dimensions.get("window");

const styles = StyleSheet.create({
    askButton: {
        width: "50%",
        borderRadius: 20,
        overflow: "hidden",
    },
});

const Alert: React.FC = () => {
    const alert = useSelector(getAlert);
    const isExist = useSharedValue(0);
    const dispatch = useAppDispatch();
    const translation = useTranslation();

    useEffect(() => {
        if (alert) isExist.value = withTiming(1);
    }, [alert, isExist]);

    const opacStyle = useAnimatedStyle(() => {
        const opacity = interpolate(
            isExist.value,
            [0, 1],
            [0, 0.5],
            Extrapolate.CLAMP,
        );

        return {
            opacity,
            backgroundColor: "#000",
            position: "absolute",
            width: "100%",
            height: "100%",
            zIndex: -1,
        };
    }, [isExist.value]);

    const boxStyle = useAnimatedStyle(() => {
        return {
            transform: [{scale: isExist.value}],
        };
    }, [isExist.value]);

    const handleIgnore = useCallback((alert: AlertType) => {
        if (alert.onIgnore) alert.onIgnore();
    }, []);
    const handleCancel = useCallback((alert: AlertType) => {
        if (alert.onCancel) alert.onCancel();
    }, []);
    const handleAccept = useCallback((alert: AlertType) => {
        if (alert.onAccept) alert.onAccept();
    }, []);
    const wrapper = useCallback(
        (alert: AlertType, callback) => {
            dispatch(removeAlert());
            callback(alert);
        },
        [dispatch],
    );
    const handlePress = useCallback(
        (alert: AlertType, callback: (alert: AlertType) => void) => {
            isExist.value = withTiming(0, {}, (isFinished) => {
                if (!isFinished) return;
                runOnJS(wrapper)(alert, callback);
            });
        },
        [isExist, wrapper],
    );

    const renderInfoVariant = useCallback(
        (alert: AlertType) => {
            return (
                <Box padding="m">
                    <Box alignSelf="center" top={-45} position="absolute">
                        <Danger />
                    </Box>
                    <AppText
                        color="fourthText"
                        variant="bold"
                        textAlign="center">
                        {alert.text}
                    </AppText>
                    <TouchableOpacity
                        onPress={() => handlePress(alert, handleAccept)}>
                        <Box
                            width="100%"
                            height={40}
                            alignItems="center"
                            justifyContent="center"
                            borderRadius="hero1">
                            <AppText variant="bold" color="danger">
                                {alert.acceptButtonText ||
                                    translation.components.Alert.okButtonText
                                        .default}
                            </AppText>
                        </Box>
                    </TouchableOpacity>
                </Box>
            );
        },
        [
            handleAccept,
            handlePress,
            translation.components.Alert.okButtonText.default,
        ],
    );

    const renderAskVariant = useCallback(
        (alert: AlertType) => {
            return (
                <Box padding="m">
                    <AppText
                        color="fourthText"
                        variant="bold"
                        textAlign="center">
                        {alert.text}
                    </AppText>
                    <Box flexDirection="row" marginTop="s">
                        <TouchableOpacity
                            style={styles.askButton}
                            onPress={() => handlePress(alert, handleAccept)}>
                            <Box
                                backgroundColor="danger"
                                height={40}
                                alignItems="center"
                                justifyContent="center">
                                <AppText variant="bold" color="buttonPrimary">
                                    {alert.acceptButtonText ||
                                        translation.components.Alert
                                            .acceptButtonText.default}
                                </AppText>
                            </Box>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.askButton}
                            onPress={() => handlePress(alert, handleCancel)}>
                            <Box
                                height={40}
                                alignItems="center"
                                backgroundColor="buttonPrimary"
                                justifyContent="center">
                                <AppText variant="bold" color="danger">
                                    {alert.cancelButtonText ||
                                        translation.components.Alert
                                            .rejectButtonText.default}
                                </AppText>
                            </Box>
                        </TouchableOpacity>
                    </Box>
                </Box>
            );
        },
        [
            handleAccept,
            handleCancel,
            handlePress,
            translation.components.Alert.acceptButtonText.default,
            translation.components.Alert.rejectButtonText.default,
        ],
    );

    const renderContent = useCallback(
        (alert: AlertType) => {
            if (!alert) return null;
            if (alert.variant === "info") return renderInfoVariant(alert);
            if (alert.variant === "ask") return renderAskVariant(alert);
            return null;
        },
        [renderAskVariant, renderInfoVariant],
    );
    return alert ? (
        <Box
            position="absolute"
            height="100%"
            width="100%"
            backgroundColor="transparent"
            alignItems="center"
            justifyContent="center">
            <TouchableWithoutFeedback
                onPress={() => handlePress(alert, handleIgnore)}>
                <Box position="absolute" height="100%" width="100%" />
            </TouchableWithoutFeedback>
            <Animated.View style={opacStyle} />
            <Animated.View style={boxStyle}>
                <Box
                    width={(width * 77) / 100}
                    maxHeight={(height * 80) / 100}
                    borderRadius="hero1"
                    backgroundColor="buttonPrimary">
                    {renderContent(alert)}
                </Box>
            </Animated.View>
        </Box>
    ) : null;
};

export default Alert;
