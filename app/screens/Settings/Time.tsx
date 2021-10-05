import React, {useCallback, useEffect, useMemo, useRef} from "react";
import {useDispatch} from "react-redux";
import {AppState, Dimensions} from "react-native";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Picker from "../../components/Picker";
import AppText from "../../components/Text";
import {getTime, setTime} from "../../store/reducers/data";
import {useSelector} from "../../store/useSelector";
import {useTranslation} from "../../hooks/translation";
import {useTime} from "../../hooks/useTime";
import Box from "../../theme/Box";

const {width} = Dimensions.get("window");

const renderSecondsPickerItems = () => {
    const seconds = [];
    for (let i = 0; i < 60; i++) {
        if (i % 5 === 0) seconds.push({id: `${i}`, title: `${i}`});
    }
    return seconds;
};
const renderMinutesPickerItems = () => {
    const minutes = [];
    for (let i = 1; i < 16; i++) minutes.push({id: `${i}`, title: `${i}`});
    return minutes;
};

class TimeClass {
    time: number;
    constructor(val: number) {
        this.time = val;
    }
    get() {
        return this.time;
    }
    set(val) {
        console.log(val);
        this.time = val;
    }
}

const Time: React.FC = () => {
    const translation = useTranslation();
    const time = useSelector(getTime);
    const timeRef = useRef(new TimeClass(time));
    const dispatch = useDispatch();
    const [saveTime] = useTime();

    const minutes = useMemo(() => {
        const res = Math.floor(time / 60);
        return `${res}`;
    }, [time]);

    const seconds = useMemo(() => {
        const res = Math.floor(time % 60);
        return `${res}`;
    }, [time]);

    const handleStateChange = useCallback(() => {
        const time = timeRef.current.get();
        saveTime(time);
    }, [saveTime]);

    useEffect(() => {
        AppState.addEventListener("change", handleStateChange);
        return () => {
            AppState.removeEventListener("change", handleStateChange);
            handleStateChange();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSelect = useCallback(
        (min: string, sec: string) => {
            const newTime = +min * 60 + +sec;
            const oldTime = timeRef.current.get();
            if (oldTime === newTime) return;
            dispatch(setTime(newTime));
            timeRef.current.set(newTime);
        },
        [dispatch],
    );

    const handleMinutesSelect = useCallback(
        min => handleSelect(min, seconds),
        [handleSelect, seconds],
    );
    const handleSecondsSelect = useCallback(
        sec => handleSelect(minutes, sec),
        [handleSelect, minutes],
    );

    return (
        <Container>
            <Header screenName={translation.Time.header} />
            <Box paddingHorizontal="m" flex={1}>
                <Box flexDirection="row" top="40%">
                    <Box flex={1} alignItems="center">
                        <AppText>{translation.Time.minutes}</AppText>
                        {useMemo(
                            () => (
                                <Picker
                                    items={renderMinutesPickerItems()}
                                    itemWidth={(width * 35) / 100}
                                    initialTitle={minutes}
                                    onSelect={handleMinutesSelect}
                                />
                            ),
                            // eslint-disable-next-line react-hooks/exhaustive-deps
                            [handleMinutesSelect],
                        )}
                    </Box>
                    <Box flex={1} alignItems="center">
                        <AppText>{translation.Time.seconds}</AppText>
                        {useMemo(
                            () => (
                                <Picker
                                    items={renderSecondsPickerItems()}
                                    itemWidth={(width * 35) / 100}
                                    initialTitle={seconds}
                                    onSelect={handleSecondsSelect}
                                />
                            ),
                            // eslint-disable-next-line react-hooks/exhaustive-deps
                            [handleSecondsSelect],
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Time;
