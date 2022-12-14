import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Achievements() {
  

const [first, setfirst] = useState([{nimi:'', pisteet:''}])
const [second, setsecond] = useState(0)

useEffect (() => {

getFirstfivepoints()
getTotalpoints()

}, [])

const getFirstfivepoints = async () => {
  try{
    const data = await AsyncStorage.getItem('@Firstfivepoints')
    if (data != null){
      setfirst(JSON.parse(data)) 
    }
  } catch (e) {}
}

const getTotalpoints = async () => {
  try{
    const data = await AsyncStorage.getItem('@Totalpoints')
    if (data != null){
      setsecond(JSON.parse(data)) 
    }
  } catch (e) {}
}


return (
      
      <View style={AchievementStyles.container}>
        <Text style={AchievementStyles.headline}> Saavutukset</Text>
        <Text style={AchievementStyles.text}>Hienoa! Olet saanut pisteitä yhteensä:</Text>
        <Text style={AchievementStyles.points}>{second}</Text>

        <View style={AchievementStyles.headline2}>
          <Text style={AchievementStyles.text2}> Viimeiset 5 tehtävää</Text>
          <Text style={AchievementStyles.text2}> Tehtävä:          Pisteet:</Text>
        </View>

        {
          first.map((item, index) => {
            return (
            <View key={index} style={AchievementStyles.headline1}>
              <View style={AchievementStyles.inputWrap}>
              <Text style={AchievementStyles.text1}> {item.nimi}</Text>
              </View>
              <View style={AchievementStyles.inputWrap}>         
              <Text style={AchievementStyles.text1}>    {item.pisteet}</Text>
              </View>
            </View>
          )})
        }
      </View>
    );
  }
  
  const AchievementStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: 'white',
      alignItems: 'center',
    },
    headline: {
      marginTop: 0,
      fontSize: 40,
      backgroundColor: '#fcc201',
      textAlign: 'center',
      height: 70,
      width: "100%",
      textAlignVertical: 'center',
    },
    text: {
      fontSize: 20,
      fontFamily: 'monospace',
      backgroundColor: '#fcc201',
      width: "100%",
      textAlign: 'center',
      marginTop: 40,
      height: 70,
      textAlignVertical: 'center',
    },
    points: {
      fontSize: 100,
      color: 'green',
    },
    text1: {
      fontSize: 20,
      fontFamily: 'monospace',
      width: "100%",
      marginTop: 5,
    },
    text2: {
      fontSize: 20,
      fontFamily: 'monospace',
      width: "100%",
      marginTop: 0,
      textAlign: 'left',
    },
    headline1: {
      fontSize: 25,
      textAlign: 'center',
      width: "100%",
      display: 'flex',
      flexDirection: "row",
    },
    headline2: {
      marginTop: 10,
      fontSize: 25,
      textAlign: 'center',
      width: "100%",
      backgroundColor: '#fcc201',
      height: 55,
    },
    inputWrap: {
      flex: 1,
    },
  });