import {useEffect, useRef} from "react";

type Callback = () => void;
type Delay = null | number;

export const useInterval = (callback: Callback, delay: Delay) => {
    const savedCallback = useRef<Callback>();

    useEffect(() => {
        savedCallback.current = callback;
    });

    useEffect(() => {
        const tick = () => {
            if (!savedCallback || !savedCallback.current) return;
            savedCallback.current();
        };

        if (delay === null) return;
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
    }, [delay]);
};
