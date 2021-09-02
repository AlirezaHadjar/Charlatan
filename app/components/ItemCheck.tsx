import React, {memo} from "react";

import Box from "../theme/Box";
import Check from "../assets/SVGs/Check";

export interface ItemCheckProps {
    selected?: boolean;
}

const ItemCheck: React.FC<ItemCheckProps> = ({selected = false}) => {
    return (
        <Box
            width={30}
            height={30}
            backgroundColor={selected ? "mainBackground" : "transparent"}
            borderWidth={selected ? 0 : 3}
            borderColor="mainTextColor"
            alignItems="center"
            justifyContent="center"
            borderRadius="l">
            {selected && <Check color="buttonPrimary" scale={1.5} />}
        </Box>
    );
};

export default memo(ItemCheck);
