/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */

import "react-native-gesture-handler/jestSetup";

const mock = jest.requireMock("react-native-reanimated");
jest.mock("react-native-reanimated", () => {
    global.__reanimatedWorkletInit = jest.fn();
    return {
        ...mock,
        useSharedValue: jest.fn().mockReturnValue(0),
        useAnimatedStyle: jest.fn().mockReturnValue({}),
        useAnimatedScrollHandler: jest.fn().mockReturnValue({}),
        createAnimatedComponent: component =>
            jest.fn().mockReturnValue(component),
        __reanimatedWorkletInit: jest.fn(),
        ScrollView: "ScrollView",
        interpolate: jest.fn(),
        Extrapolate: {CLAMP: jest.fn()},
    };
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock("react-native/Libraries/Animated/src/NativeAnimatedHelper");
