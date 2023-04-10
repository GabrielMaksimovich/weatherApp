import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Alert, Dimensions, FlatList,
    Image,
    RefreshControl,
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import * as Location from "expo-location";
import {FontAwesome5, Ionicons, MaterialCommunityIcons} from "@expo/vector-icons";

const API_KEY = 'e0b974d89588277d98d91c43108a2c6e';

const Weather = () => {
    const [forecast, setForecast] = useState(null);
    const [refreshing, setRefreshing] = useState(false);

    const loadForecast = async () => {
        setRefreshing(true);

        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
            Alert.alert('Permission to access location was denied');
        }

        const location = await Location.getCurrentPositionAsync({});
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${location.coords.latitude}&lon=${location.coords.longitude}&cnt={cnt}&appid=${API_KEY}&units=metric`);
        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            Alert.alert('Error', 'Something went wrong');
        } else {
            setForecast(data);
        }

        setRefreshing(false);
    };

    useEffect(() => {
        loadForecast();
    }, []);

    if (!forecast) {
        return (
            <SafeAreaView>
                <ActivityIndicator size='large'/>
            </SafeAreaView>
        )
    }

    const current = forecast.weather[0];

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={() => loadForecast()}
                    />
                }
                style={{marginTop:50}}
            >
                <Text style={{alignItems:'center', textAlign:'center', fontSize: 30, opacity: 0.5, fontWeight: 'bold'}}>
                    {forecast.name}
                </Text>
                <View style={styles.current}>
                    <Image
                        style={styles.largeIcon}
                        source={{
                            uri: `https://openweathermap.org/img/wn/${current.icon}@4x.png`,
                        }}
                    />
                    <Text style={styles.currentTemp}>
                        {Math.round(forecast.main.temp)}°С
                    </Text>
                </View>

                <Text style={styles.currentDescription}>
                    {current.description}
                </Text>

                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        <View style={{alignItems: 'center'}}>
                            <FontAwesome5 name="temperature-high" size={24} color="black"/>
                        </View>

                        <Text style={styles.text}>
                            {Math.round(forecast.main.feels_like)}°С
                        </Text>
                        <Text style={styles.text}>
                            Feels like
                        </Text>
                    </View>

                    <View style={styles.info}>
                        <View style={{alignItems: 'center'}}>
                            <Ionicons name="water" size={24} color="black" />
                        </View>

                        <Text style={styles.text}>
                            {Math.round(forecast.main.humidity)}%
                        </Text>
                        <Text style={styles.text}>
                            Humidity
                        </Text>
                    </View>
                </View>

                <View style={styles.extraInfo}>
                    <View style={styles.info}>
                        <View style={{alignItems: 'center'}}>
                            <FontAwesome5 name="wind" size={24} color="black" />
                        </View>

                        <Text style={styles.text}>
                            {forecast.wind.speed} km/h
                        </Text>
                        <Text style={styles.text}>
                            Wind speed
                        </Text>
                    </View>

                    <View style={styles.info}>
                        <View style={{alignItems: 'center'}}>
                            <MaterialCommunityIcons name="scale" size={24} color="black" />
                        </View>

                        <Text style={styles.text}>
                            {Math.round(forecast.main.pressure)} hPa
                        </Text>
                        <Text style={styles.text}>
                            Air pressure
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ecdbba',
    },
    current: {
        flexDirection: 'row',
        alignItems: 'center',
        alignContent: 'center',
    },
    largeIcon: {
        width: 300,
        height: 250
    },
    currentTemp: {
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    currentDescription: {
        width: '100%',
        textAlign: 'center',
        fontWeight: '200',
        fontSize: 24,
        marginBottom: 5,
    },
    info: {
        width: Dimensions.get('screen').width/2.5,
        backgroundColor: 'rgba(0,0,0,0.1)',
        padding: 10,
        borderRadius: 15,
        justifyContent: 'center',
    },
    extraInfo: {
        flexDirection: 'row',
        marginTop:20,
        justifyContent: 'space-between',
        padding:10,
    },
    text: {
        fontSize:20,
        color: '#000',
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 24,
        marginVertical: 12,
        marginLeft: 7,
        color: '#c84b31',
        fontWeight: 'bold',
    },
})

export default Weather;
