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
import {AppRoute} from "../../navigations/AppNavigator";
import {GameRoutes} from "../../navigations/GameNavigator";
import {useAppDispatch} from "../../store/configureStore";
import {resetGame} from "../../store/reducers/data";

type NavigationProps = CompositeNavigationProp<
    StackNavigationProp<AppRoute, "Main">,
    StackNavigationProp<GameRoutes>
>;

export type StartGameProps = {
    navigation: NavigationProps;
    route: RouteProp<AppRoute, "Main">;
};

const StartGame: React.FC<StartGameProps> = ({navigation}) => {
    const dispatch = useAppDispatch();
    useFocusEffect(
        useCallback(() => {
            dispatch(resetGame());
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
        }, [dispatch, navigation]),
    );

    return <Container />;
};

export default StartGame;
