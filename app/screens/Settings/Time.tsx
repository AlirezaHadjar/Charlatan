import React, {useCallback, useMemo, useRef} from "react";
import {useDispatch} from "react-redux";

import Container from "../../components/Container";
import Header from "../../components/Header";
import Picker from "../../components/Picker";
import AppText from "../../components/Text";
import {getTime, setTime} from "../../store/reducers/data";
import {useSelector} from "../../store/useSelector";
import {useTranslation} from "../../hooks/translation";
import {useTime} from "../../hooks/useTime";
import Box from "../../theme/Box";
import {PickerRef} from "../../types";

const renderPickerItems = () => {
    const minutes = [];
    for (let i = 0; i < 60; i++) minutes.push({id: `${i}`, title: `${i}`});
    return minutes;
};

const Time: React.FC = () => {
    const time = useSelector(getTime);
    const translation = useTranslation();
    const minRef = useRef<PickerRef>();
    const secRef = useRef<PickerRef>();
    const dispatch = useDispatch();

    const minutes = useMemo(() => {
        const res = Math.floor(time / 60);
        return `${res}`;
    }, [time]);

    const seconds = useMemo(() => {
        const res = Math.floor(time % 60);
        return `${res}`;
    }, [time]);

    const handleZero = useCallback(() => {
        minRef.current?.scrollToTitle("1");
        secRef.current?.scrollToTitle("2");
        // dispatch(setTime(62));
    }, []);

    const handleSelect = useCallback(
        (min: string, sec: string, priority: "urgent" | "normal") => {
            const newTime = +min * 60 + +sec;
            console.log("newTime", newTime);
            if (newTime === 0) handleZero();
            if (priority === "normal" && newTime === 0) return;
            dispatch(setTime(newTime));
        },
        [dispatch, handleZero],
    );
    useTime(time);

    return (
        <Container>
            <Header screenName={translation.Time.header} />
            <Box paddingHorizontal="m" flex={1}>
                {useMemo(
                    () => (
                        <Box flexDirection="row" top="40%">
                            <Box flex={1} alignItems="center">
                                <AppText>Minutes</AppText>
                                <Picker
                                    ref={minRef}
                                    items={renderPickerItems()}
                                    initialTitle={minutes}
                                    onSelect={(min, priority) =>
                                        handleSelect(min, seconds, priority)
                                    }
                                />
                            </Box>
                            <Box flex={1} alignItems="center">
                                <AppText>Seconds</AppText>
                                <Picker
                                    ref={secRef}
                                    items={renderPickerItems()}
                                    initialTitle={seconds}
                                    onSelect={(sec, priority) =>
                                        handleSelect(minutes, sec, priority)
                                    }
                                />
                            </Box>
                        </Box>
                    ),
                    [handleSelect, minutes, seconds],
                )}
            </Box>
        </Container>
    );
};

export default Time;
