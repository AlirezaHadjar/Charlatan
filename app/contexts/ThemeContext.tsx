import React, {useState} from "react";
import Animated, {useSharedValue, withTiming} from "react-native-reanimated";

interface Context {
    isDark: boolean;
    animatedDark: Animated.SharedValue<number> | undefined;
    toggle: () => void;
}

const ThemeContext = React.createContext<Context>({
    isDark: true,
    animatedDark: undefined,
    toggle: () => true,
});

const DarkThemeProvider = ({children}) => {
    const [darkTheme, setDarkTheme] = useState(true);
    const animatedDark = useSharedValue(1);

    const toggle = () => {
        setDarkTheme(!darkTheme);
        const to = darkTheme ? 0 : 1;
        animatedDark.value = withTiming(to, {duration: 1000});
    };

    const theme = {
        isDark: darkTheme,
        toggle,
        animatedDark,
    };

    return (
        <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    );
};

const useDarkTheme = () => {
    const context = React.useContext(ThemeContext);
    if (context === undefined) {
        throw new Error("useCount must be used within a CountProvider");
    }
    return context;
};

export {useDarkTheme, DarkThemeProvider};
