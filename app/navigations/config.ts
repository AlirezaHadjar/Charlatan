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
    cardStyleInterpolator: ({current: {progress: opacity}}) => ({
        cardStyle: {opacity},
    }),
};
