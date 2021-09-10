import React from "react";

import Container from "../components/Container";
import Header from "../components/Header";
import List from "../components/list/guide/List";
import Box from "../theme/Box";
import {useTranslation} from "../hooks/translation";

const Guide: React.FC = () => {
    const translation = useTranslation();
    return (
        <Container>
            <Header screenName={translation.Guide.header} />
            <Box paddingHorizontal="m" flex={1}>
                <Box
                    backgroundColor="thirdBackground"
                    width="100%"
                    borderTopEndRadius="hero1"
                    borderTopStartRadius="hero1"
                    padding="m"
                    flex={1}>
                    <List
                        items={translation.Guide.text.map((item, index) => ({
                            ...item,
                            id: index.toString(),
                        }))}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default Guide;
