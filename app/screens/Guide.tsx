import React from "react";
import {StyleSheet, Dimensions, ScrollView} from "react-native";
import Container from "../components/Container";
import Header from "../components/Header";
import AppText from "../components/Text";
import Box from "../theme/Box";

export interface GuideProps {}

const {height, width} = Dimensions.get("window");

const Guide: React.FC<GuideProps> = ({}) => {
    return (
        <Container style={styles.container}>
            <Header screenName="Guide" />
            <Box paddingHorizontal="m" flex={1}>
                <Box
                    backgroundColor="secondBackground"
                    width="100%"
                    borderTopEndRadius="hero1"
                    borderTopStartRadius="hero1"
                    padding="m"
                    flex={1}>
                    <ScrollView showsVerticalScrollIndicator={false}>
                        <AppText lineHeight={30}>
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. In reprehenderit voluptatibus, facilis nobis
                            repellendus commodi necessitatibus rem soluta ullam
                            optio id voluptatum hic dolore iure nisi aliquid
                            laudantium excepturi quia? Lorem ipsum dolor sit
                            amet consectetur adipisicing elit. In reprehenderit
                            voluptatibus, facilis nobis repellendus commodi
                            necessitatibus rem soluta ullam optio id voluptatum
                            hic dolore iure nisi aliquid laudantium excepturi
                            quia? Lorem ipsum dolor sit amet consectetur
                            adipisicing elit. In reprehenderit voluptatibus,
                            facilis nobis repellendus commodi necessitatibus rem
                            soluta ullam optio id voluptatum hic dolore iure
                            nisi aliquid laudantium excepturi quia? Lorem ipsum
                            dolor sit amet consectetur adipisicing elit. In
                            reprehenderit voluptatibus, facilis nobis
                            repellendus commodi necessitatibus rem soluta ullam
                            optio id voluptatum hic dolore iure nisi aliquid
                            laudantium excepturi quia?
                        </AppText>
                    </ScrollView>
                </Box>
            </Box>
        </Container>
    );
};

const styles = StyleSheet.create({
    container: {},
});

export default Guide;
