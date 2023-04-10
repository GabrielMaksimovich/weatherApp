import React from 'react';
import PropsTypes from 'prop-types';
import { StyleSheet, Text, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const weatherOptions = {
    Thunderstorm: {
        iconName: 'weather-lightning',
        gradient: ['#141e30', '#243b55']
    },
    Drizzle: {
        iconName: 'weather-rainy',
        gradient: ['#3a7db5', '#3a6073']
    },
    Rain: {
        iconName: 'weather-pouring',
        gradient: ['#000046', '#1cb5e0'],
        title: 'Короткочасний дощ',
        subtitle: 'Кращє бути вдома',
    },
    Snow: {
        iconName: 'snowflake',
        gradient: ['#83a4d4', '#b6fbff']
    },
    Dust: {
        iconName: 'weather-windy-variant',
        gradient: ['#b79891', '#94716b']
    },
    Smoke: {
        iconName: 'weather-windy',
        gradient: ['#56ccf2', '#2f80ed']
    },
    Haze: {
        iconName: 'weather-hazy',
        gradient: ['#3e5151', '#decba4']
    },
    Mist: {
        iconName: 'weather-fog',
        gradient: ['#606c88', '#3f4c6b']
    },
    Clear: {
        iconName: 'weather-sunny',
        gradient: ['#56ccf2', '#2f80ed']
    },
    Clouds: {
        iconName: 'weather-cloudy',
        gradient: ['#757f9a', '#d7dde8']
    },

}

export default function Weather({
    temp,
    condition,
    city,
  }) {
    return (
        <LinearGradient
            colors={weatherOptions[condition].gradient}
            style={styles.container}>
            <View style={{ ...styles.textContainer, ...styles.header }}>
                <Text style={styles.city}>{city}</Text>
            </View>
            <View style={styles.halfContainer}>
                <MaterialCommunityIcons name={weatherOptions[condition].iconName} size={96} color="white" />
                <Text style={styles.temp}>{temp}°</Text>

                <View
                    style={{
                        width: '90%',
                        height: 1,
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white',
                    }}
                />
            </View>
            <View style={{ ...styles.halfContainer, ...styles.textContainer }}>
                <Text style={styles.title}>{weatherOptions[condition].title}</Text>
                <Text style={styles.subtitle}>{weatherOptions[condition].subtitle}</Text>
            </View>
        </LinearGradient>
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
    },
    header: {
        paddingVertical: 20,
    },
    halfContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    textContainer: {
        paddingHorizontal: 18,
        alignItems: "flex-start"
    },
    city: {
        color: "white",
        fontSize: 20,
        marginBottom: 20,
    },
    temp: {
        fontSize: 36,
        color: "white",
        fontWeight: "900",
        marginBottom: 30,
    },
    title: {
        color: "white",
        fontSize: 44,
        fontWeight: "300",
        marginBottom: 10,
    },
    subtitle: {
        color: "white",
        fontSize: 24,
        fontWeight: "600",
    }
})
