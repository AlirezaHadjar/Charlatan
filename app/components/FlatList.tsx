import React, {useMemo} from "react";
import {FlatList, FlatListProps} from "react-native";

import {useRTL} from "../hooks/isRTL";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ModifiedFlatList = <ItemT extends any>(props: FlatListProps<ItemT>) => {
    const isRTL = useRTL();
    const {horizontal: isHorizontal} = props;
    const inverted = useMemo(
        () => isHorizontal && isRTL,
        [isHorizontal, isRTL],
    );
    return <FlatList {...props} inverted={inverted} />;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
class AppFlatList<ItemT = any> extends React.Component<FlatListProps<ItemT>> {
    render() {
        return <ModifiedFlatList {...this.props} />;
    }
}

export default AppFlatList;
