import React, {useMemo} from "react";
import {FlatList, FlatListProps} from "react-native";

import {useRTL} from "../hooks/isRTL";

const ModifiedFlatList = <ItemT,>(props: FlatListProps<ItemT>) => {
    const isRTL = useRTL();
    const {horizontal: isHorizontal} = props;
    const inverted = useMemo(
        () => isHorizontal && isRTL,
        [isHorizontal, isRTL],
    );
    const finalInverted =
        props.inverted !== undefined ? props.inverted : inverted;
    return <FlatList {...props} inverted={finalInverted} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class AppFlatList<ItemT = any> extends React.Component<FlatListProps<ItemT>> {
    render() {
        return <ModifiedFlatList {...this.props} />;
    }
}

export default AppFlatList;
