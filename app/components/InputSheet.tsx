import React, {useRef, useState} from "react";

import CheckIcon from "../assets/SVGs/Check";
import Box from "../theme/Box";

import AppInput, {AppInputRef} from "./AppInput";
import AppBottomSheet, {AppBottomSheetProps} from "./BottomSheet";
import AppTouchable from "./Touchable";

interface InputSheetProps extends AppBottomSheetProps {
    placeholder?: string;
    onSubmit: (query: string) => void;
    disableText?: string;
}

const InputSheet: React.FC<InputSheetProps> = ({
    placeholder,
    onSubmit,
    disableText,
    ...props
}) => {
    const inputRef = useRef<AppInputRef>(null);
    const [query, setQuery] = useState("");
    const disabled = query.trim() === "";

    const handleSubmit = () => {
        if (disabled) return;
        onSubmit(query);
        setQuery("");
    };

    return (
        <AppBottomSheet {...props}>
            <Box paddingHorizontal="m">
                <Box
                    width="100%"
                    borderWidth={1}
                    borderRadius="l"
                    alignItems="center"
                    paddingHorizontal="m"
                    justifyContent="center"
                    flexDirection={"row"}>
                    <Box flex={1}>
                        <AppInput
                            ref={inputRef}
                            isInBottomSheet
                            style={{color: "black"}}
                            placeholder={placeholder}
                            onChangeText={text => setQuery(text)}
                        />
                    </Box>
                    <AppTouchable
                        disabled={disabled}
                        disableText={disableText}
                        onPress={handleSubmit}>
                        <Box
                            width={30}
                            height={30}
                            borderRadius="m"
                            alignItems="center"
                            justifyContent="center"
                            backgroundColor="mainTextColor">
                            <CheckIcon />
                        </Box>
                    </AppTouchable>
                </Box>
                <Box height={50} />
            </Box>
        </AppBottomSheet>
    );
};

export default InputSheet;
