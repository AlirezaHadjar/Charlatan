import {NativeStackNavigationOptions} from "@react-navigation/native-stack";

import {ThemeType} from "../theme/Theme";

// const transitionSpec: TransitionSpec = {
//     animation: "timing",
//     config: {duration: 300},
// };

export const getScreenOptions: (
    isRTL: boolean,
    colors: ThemeType["colors"],
) => NativeStackNavigationOptions = (isRTL, colors) => ({
    headerShown: false,
    navigationBarColor: colors.mainBackground,
    navigationBarHidden: true,
    // transitionSpec: {
    //     open: transitionSpec,
    //     close: transitionSpec,
    // },
    // gestureDirection: isRTL ? "horizontal-inverted" : "horizontal",
    // cardStyleInterpolator: ({current: {progress: opacity}}) => ({
    //     cardStyle: {opacity},
    // }),
});
