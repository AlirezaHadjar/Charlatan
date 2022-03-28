import React, {useMemo} from "react";
import {createBox, ResponsiveValue} from "@shopify/restyle";
import {FlexStyle} from "react-native";

import {useRTL} from "../hooks/isRTL";

import {ThemeType} from "./theme";

const BaseBox = createBox<ThemeType>();

type SameValueFn<T> = (value?: Responsive<T>) => T;
type Responsive<T> = ResponsiveValue<T, ThemeType>;

type FlexDirection = FlexStyle["flexDirection"];
type AlignItems = FlexStyle["alignItems"];
type MarginStart = FlexStyle["marginStart"];

const getFlexDirections: SameValueFn<FlexDirection> = direction => {
    if (!direction) return "column";
    if (direction === "row") return "row-reverse";
    return "row";
};

const getAlignItems: SameValueFn<AlignItems> = direction => {
    if (!direction) return "stretch";
    if (direction === "flex-start") return "flex-end";
    if (direction === "flex-end") return "flex-start";
    if (direction === "center") return "center";
};

type Props = React.ComponentProps<typeof BaseBox>;

const AppBox = (props: Props) => {
    const isRTL = useRTL();
    const flexDirection = getFlexDirections(props.flexDirection);
    const alignItems = getAlignItems(props.alignItems);
    const styles: Props = useMemo(
        () =>
            isRTL
                ? {
                      flexDirection,
                      alignItems,
                      marginStart: props.marginEnd,
                      marginEnd: props.marginStart,
                      paddingStart: props.paddingEnd,
                      paddingEnd: props.paddingStart,
                  }
                : {},
        [isRTL, flexDirection, alignItems, props],
    );
    return <BaseBox {...props} {...styles} />;
};
const RotatedAppBox = (props: Props) => {
    const isRTL = useRTL();
    const styles: Props = useMemo(
        () =>
            isRTL
                ? {
                      style: {transform: [{rotate: "180deg"}]},
                  }
                : {},
        [isRTL],
    );
    return <AppBox {...props} {...styles} />;
};
class Box extends React.Component<Props> {
    render() {
        return <AppBox {...this.props} />;
    }
}
export class RotatedBox extends React.Component<Props> {
    render() {
        return <RotatedAppBox {...this.props} />;
    }
}

export default Box;
