import React, {useState} from "react";

import {NativeAd} from "../types";

interface Context {
    setNativeAd: React.Dispatch<React.SetStateAction<NativeAd>>;
    nativeAd?: NativeAd;
}

const AdContext = React.createContext<Context>({
    setNativeAd: () => true,
});
const AdProvider = ({children}) => {
    const [nativeAd, setNativeAd] = useState<NativeAd>();

    const ad = {
        nativeAd,
        setNativeAd,
    };

    return <AdContext.Provider value={ad}>{children}</AdContext.Provider>;
};

const useAdKey = () => {
    const context = React.useContext(AdContext);
    if (context === undefined) {
        throw new Error("useCount must be used within a CountProvider");
    }
    return context;
};

export {useAdKey, AdProvider};
