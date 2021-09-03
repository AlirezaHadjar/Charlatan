import React, {memo} from "react";

import Box from "../theme/Box";
import Cross from "../assets/SVGs/Cross";

export interface ItemCheckProps {
    disabled?: boolean;
}

const ItemCheck: React.FC<ItemCheckProps> = ({disabled = false}) => {
    return (
        <Box
            width={30}
            height={30}
            backgroundColor="mainTextColor"
            opacity={disabled ? 0.3 : 1}
            alignItems="center"
            justifyContent="center"
            borderRadius="m">
            <Cross />
        </Box>
    );
};

export default memo(ItemCheck);
