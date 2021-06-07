import {
    CommonActions,
    CompositeNavigationProp,
    RouteProp,
    useFocusEffect,
    // eslint-disable-next-line import/no-extraneous-dependencies
} from "@react-navigation/core";
import {StackNavigationProp} from "@react-navigation/stack";
import React, {useCallback} from "react";

import Container from "../../components/Container";
import {useTranslation} from "../../hooks/translation";
import {AppRoute} from "../../navigations/AppNavigator";
import {GameRoutes} from "../../navigations/GameNavigator";
import {useAppDispatch} from "../../store/configureStore";
import {setAlert} from "../../store/reducers/alert";
import {
    getLocations,
    getPlayers,
    getSpiesLength,
    resetGame,
} from "../../store/reducers/data";
import {useSelector} from "../../store/useSelector";
import {LanguageData, User, Location} from "../../types";

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<AppRoute, "StartGame">,
    StackNavigationProp<GameRoutes>
>;

export type StartGameProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const StartGame: React.FC<StartGameProps> = ({navigation}) => {
    const dispatch = useAppDispatch();
    const players = useSelector(getPlayers);
    const translation = useTranslation();
    const locations = useSelector(getLocations);
    const spiesLength = useSelector(getSpiesLength);
    const isValid = useCallback(
        (
            players: User[],
            locations: Location[],
            spiesLength: number,
            translation: LanguageData,
        ) => {
            if (players.length < 3) {
                dispatch(
                    setAlert({
                        id: Date.now.toString(),
                        text: translation.Players.lengthBelowAlert,
                    }),
                );
                return false;
            }
            if (locations.length < 5) {
                dispatch(
                    setAlert({
                        id: Date.now.toString(),
                        text: translation.Locations.lengthBelowAlert,
                    }),
                );
                return false;
            }
            if (spiesLength < 1) {
                dispatch(
                    setAlert({
                        id: Date.now.toString(),
                        text: translation.Players.removeSpyAlert,
                    }),
                );
                return false;
            }
            return true;
        },
        [dispatch],
    );
    useFocusEffect(
        useCallback(() => {
            dispatch(resetGame());
            if (!isValid(players, locations, spiesLength, translation)) {
                return navigation.navigate("Main");
            }
            navigation.dispatch((state) => {
                const routes = state.routes.filter(
                    (r) => r.name !== "GameNavigator",
                );
                return CommonActions.reset({
                    ...state,
                    routes,
                    index: routes.length - 1,
                });
            });
            navigation.navigate("GameNavigator");
        }, [
            dispatch,
            isValid,
            locations,
            navigation,
            players,
            spiesLength,
            translation,
        ]),
    );

    return <Container />;
};

export default StartGame;
