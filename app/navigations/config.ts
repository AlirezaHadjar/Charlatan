import {
    StackNavigationOptions,
    TransitionSpec,
} from "@react-navigation/stack/lib/typescript/src/types";

const transitionSpec: TransitionSpec = {
    animation: "timing",
    config: {duration: 300},
};

export const screenOptions: StackNavigationOptions = {
    headerShown: false,
    transitionSpec: {
        open: transitionSpec,
        close: transitionSpec,
    },
    gestureEnabled: false,
    cardStyleInterpolator: ({current: {progress: opacity}}) => ({
        cardStyle: {opacity},
    }),
};
