import React from 'react';
import PropsTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Weather({temp, condition}) {
    return (
        <View style={styles.container}>
            <View style={styles.halfContainer}>
                <Ionicons name="rainy" size={90} color="black" />
                <Text>{temp}</Text>
            </View>
            <View style={styles.halfContainer}>

            </View>
        </View>
    )
}

Weather.propTypes = {
    temp: PropsTypes.number.isRequired,
    condition: PropsTypes.oneOf(
        [
            "Thunderstorm",
            "Drizzle",
            "Rain",
            "Snow",
            "Fog",
            "Smoke",
            "Dust",
            "Haze",
            "Mist",
            "Clear",
            "Clouds"
        ]
    ).isRequired,
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})
