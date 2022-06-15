import {
    StackNavigationOptions,
    TransitionSpec,
} from "@react-navigation/stack/lib/typescript/src/types";

const transitionSpec: TransitionSpec = {
    animation: "timing",
    config: {duration: 300},
};

export const getScreenOptions: (
    isRTL: boolean,
) => StackNavigationOptions = isRTL => ({
    headerShown: false,
    transitionSpec: {
        open: transitionSpec,
        close: transitionSpec,
    },
    gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
    cardStyleInterpolator: ({current: {progress: opacity}}) => ({
        cardStyle: {opacity},
    }),
});
