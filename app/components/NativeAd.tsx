import React from "react";
import {View, Image, Text, StyleSheet} from "react-native";

import {useAdKey} from "../contexts/AdContext";

import Button from "./Button";

const styles = StyleSheet.create({
    container: {},

    icon: {
        width: 48,
        height: 48,
    },

    title: {
        marginRight: 6,
    },

    image: {
        width: "100%",
        aspectRatio: 1.777777778,
        marginTop: 6,
    },
});

export const NativeAd = () => {
    const {nativeAd} = useAdKey();
    if (!nativeAd || !nativeAd.title) return null;
    return (
        <View style={styles.container}>
            <View
                style={{
                    flexDirection: "row",
                    alignSelf: "flex-end",
                }}>
                <Text style={styles.title}>{nativeAd.title}</Text>

                <Image
                    resizeMode="stretch"
                    style={styles.icon}
                    source={{
                        uri: nativeAd.icon_url,
                    }}
                />
            </View>

            <Text>{nativeAd.description}</Text>

            <Image
                resizeMode="contain"
                style={styles.image}
                source={{
                    uri: nativeAd.landscape_static_image_url,
                }}
            />
            <Button title={nativeAd.call_to_action_text} />
        </View>
    );
};
