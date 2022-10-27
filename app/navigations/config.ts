import {NativeStackNavigationOptions} from "@react-navigation/native-stack";

// const transitionSpec: TransitionSpec = {
//     animation: "timing",
//     config: {duration: 300},
// };

export const getScreenOptions: (
    isRTL: boolean,
) => NativeStackNavigationOptions = isRTL => ({
    headerShown: false,
    // transitionSpec: {
    //     open: transitionSpec,
    //     close: transitionSpec,
    // },
    // gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
    // cardStyleInterpolator: ({current: {progress: opacity}}) => ({
    //     cardStyle: {opacity},
    // }),
});
