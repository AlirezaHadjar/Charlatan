import React, {useCallback, useEffect, useMemo} from "react";
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
import {requests} from "../../api/requests";

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

const Time: React.FC = () => {
    const time = useSelector(getTime);
    const translation = useTranslation();
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
        saveTime(time);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
            dispatch(setTime(newTime));
        },
        [dispatch],
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
                                    onSelect={min => handleSelect(min, seconds)}
                                />
                            ),
                            [handleSelect, minutes, seconds],
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
                                    onSelect={sec => handleSelect(minutes, sec)}
                                />
                            ),
                            [handleSelect, minutes, seconds],
                        )}
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Time;
