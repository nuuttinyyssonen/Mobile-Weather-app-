import React, {useEffect, useState} from "react";
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, ImageBackground, TextInput, Button } from 'react-native';

var deviceWidth = Dimensions.get("window").width;
var deviceHeigth = Dimensions.get("window").height;

export default function WeatherApi() {
    const [city, setCity] = useState("Kuopio")
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=Enter api key here...`
    const [cityName, setCityName] = useState("");
    const [dates, setDates] = useState([]);
    const [temps, setTemps] = useState([]);
    const [icons, setIcons] = useState([]);

    useEffect(() => {
        const fetchWeatherData = async () => {
            const response = await fetch(url);
            const result = await response.text();
            const jsonData = JSON.parse(result);
            const dataSet = jsonData.list
            setCityName(jsonData.city.name);
            for(let i = 0; i < dataSet.length - 36; i++) {
                if(!dates.includes(jsonData.list[i].dt_txt)) {
                    setDates(prev => [...prev, jsonData.list[i].dt_txt])
                }
                if(!temps.includes(jsonData.list[i].main.temp)) {
                    setTemps(prev => [...prev, jsonData.list[i].main.temp])
                }
                if(!icons.includes(jsonData.list[i].weather[0].icon)) {
                    setIcons(prev => [...prev, jsonData.list[i].weather[0].icon])
                }
            }
        }
        fetchWeatherData();
    }, [])

    let datesMap = dates.map((item, i) => {
        return(
            <View key={i}>
                <Text style={styles.date}>{item.slice(-8,-3)}</Text>
            </View>
        );
    });

   let tempMap = temps.map((item, i) => {
        return(
            <View key={i}>
                <Text style={styles.temp}>{Math.round(item - 273.15)}°C</Text>
                <Text>{"\n"}</Text>
            </View>
        );
    });

    let iconsMap = icons.map((item, i) => {
        return(
            <View style={styles.oneImage} key={i}>
                <Image 
                style={styles.pic}
                source={{
                    uri: "http://openweathermap.org/img/wn/" + item + "@2x.png"
                }}/>
            </View>
        );
    })

    function handleChange(e) {
        setCity(e.target);
    }

    return(
        <View style={styles.fullContainer}>
        <ImageBackground source={{ uri: 'https://i.pinimg.com/564x/82/5f/8a/825f8a868d384c10060527e43f87d99b.jpg'}} resizeMode="cover" style={styles.image}>
            <ScrollView>
                
                <View style={styles.header}>
                    <Text style={styles.city}>{city}</Text>
                    <Text style={styles.currentTemp}>{Math.round(temps[0] - 273.15)}°C</Text>
                </View>
                <View style={styles.inputs}>
                    <TextInput onChangeText={handleChange} value={city} placeholderTextColor="white"  style={styles.textInput} placeholder="Enter a city..."></TextInput>
                </View>
                <View style={styles.datesContainer}>
                    {datesMap}
                </View>
                <View style={styles.picContainer}>
                    {iconsMap}
                </View>
                <View style={styles.tempContainer}>
                    {tempMap}
                </View>    
            </ScrollView>
            </ImageBackground>
        </View>
    );
};

const styles = StyleSheet.create({
    pic: {
        width: 80,
        height: 80,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        width: deviceWidth
    },
    fullContainer: {
        backgroundColor: "white",
        alignItems: "center"
    },
    picContainer: {
        display: "flex",
        flex: 0,
        justifyContent: "center",
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        gap: 20
    },
    datesContainer : {
        display: "flex",
        flexDirection: "row",
        gap: 60,
        justifyContent: "center",
        borderTopWidth: 1,
        borderTopRightRadius: 30,
        borderTopLeftRadius: 30,
        borderTopColor: "white",
        paddingTop: 10
    },
    date: {
        color: "white"
    },
    tempContainer: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: 70
    },
    temp: {
        color: "white"
    },
    header: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 40,
        paddingTop: deviceHeigth / 8
    },
    city: {
        color: "white",
        fontSize: 40
    },
    currentTemp: {
        color: "white",
        fontSize: 40
    },
    inputs : {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        paddingTop: deviceHeigth / 2.25,
        paddingLeft: deviceWidth / 12
    },
    textInput: {
        color: "white",
        height: 40,
        width: 80
    }
})