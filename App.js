import Loading from "./Loading";
import {useEffect, useState} from "react";
import * as Location from "expo-location";
import {StyleSheet, Text} from "react-native";
import axios from "axios";
import Weather from "./Weather";

const API_KEY = 'e0b974d89588277d98d91c43108a2c6e';


export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [temp, setTemp] = useState(0);
  const [condition, setCondition] = useState('');
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      const { coords: { latitude, longitude }} = await Location.getCurrentPositionAsync({});
      await getWeather(latitude, longitude);
    })();
  }, []);

  const getWeather = async (latitude, longitude) => {
    const { data: {main: {temp}, weather} } = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`)
    setCondition(weather[0].main);
    setTemp(temp);
    setIsLoading(false);
  }

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  }

  return (
      isLoading ? <Loading /> : <Weather temp={Math.round(temp)} condition={condition}/>
  );
}

const styles = StyleSheet.create({

})
