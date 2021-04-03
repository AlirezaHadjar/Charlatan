import React, {useCallback, useMemo} from "react";
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

const renderMinutes = () => {
    const minutes = [];
    for (let i = 0; i < 60; i++) minutes.push({id: `${i}`, title: `${i}`});
    return minutes;
};

const Time: React.FC<{}> = ({}) => {
    const time = useSelector(getTime);
    const translation = useTranslation();
    const dispatch = useDispatch();
    const minutes = useMemo(() => {
        const res = Math.floor(time / 60);
        return `${res}`;
    }, [time]);
    const seconds = useMemo(() => {
        const res = Math.floor(time % 60);
        return `${res}`;
    }, [time]);
    const handleSelect = useCallback(
        (min: string, sec: string) => {
            const newTime = +min * 60 + +sec;
            dispatch(setTime(newTime));
        },
        [dispatch],
    );
    useTime(time);
    return (
        <Container>
            <Header screenName={translation.Time.header} />
            <Box paddingHorizontal="m" flex={1}>
                <Box flexDirection="row" top="50%">
                    <Box flex={1} alignItems="center">
                        <AppText>Minutes</AppText>
                        <Picker
                            items={renderMinutes()}
                            initialTitle={minutes}
                            onSelect={(min) => handleSelect(min, seconds)}
                        />
                    </Box>
                    <Box flex={1} alignItems="center">
                        <AppText>Seconds</AppText>
                        <Picker
                            items={renderMinutes()}
                            initialTitle={seconds}
                            onSelect={(sec) => handleSelect(minutes, sec)}
                        />
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default Time;