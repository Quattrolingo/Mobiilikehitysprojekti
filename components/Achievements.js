import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Colors from '../assets/Colors'

export default function Achievements(props) {
  

const [first, setfirst] = useState([{nimi:'', pisteet:''}])
const [second, setsecond] = useState(0)
const [third, setthird] = useState(0)
const [backgroundColor, setBackgroundColor] = useState(props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.DarkThemeSecondary : props.appSettings.themeColorOptions.background)
const [textColor, setTextColor] = useState(props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.White : Colors.Black)

useEffect (() => {

getFirstfivepoints()
getTotalpoints()
getTotalExer()

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

const getTotalExer = async () => {
  try{
    const data = await AsyncStorage.getItem('@completed_exercises')
    if (data != null){
      setthird(JSON.parse(data).length)
    }
  } catch (e) {}
}


return (
      
      <View style={[{backgroundColor: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.DarkTheme : Colors.White},AchievementStyles.container]}>
        <Text style={[{backgroundColor: backgroundColor, color: textColor}, AchievementStyles.headline]}> Saavutukset</Text>
        <Text style={[{backgroundColor: backgroundColor, color: textColor}, AchievementStyles.text]}>Hienoa! Olet saanut pisteitä yhteensä:</Text>
        <Text style={AchievementStyles.points}>{second}</Text>

        <View style={[{backgroundColor: backgroundColor}, AchievementStyles.headline2]}>
          <Text style={[{color: textColor}, AchievementStyles.text2]}> Viimeiset 5 tehtävää</Text>
          <Text style={[{color: textColor}, AchievementStyles.text2]}> Tehtävä:          Pisteet:</Text>
        </View>

        {
          first.map((item, index) => {
            return (
            <View key={index} style={[{backgroundColor: backgroundColor}, AchievementStyles.headline1]}>
              <View style={AchievementStyles.inputWrap}>
              <Text style={[{color: textColor}, AchievementStyles.text1]}> {item.nimi}</Text>
              </View>
              <View style={AchievementStyles.inputWrap}>         
              <Text style={[{color: textColor}, AchievementStyles.text1]}>    {item.pisteet}</Text>
              </View>
            </View>
          )})
        }
        
        <View style={[{backgroundColor: backgroundColor}, AchievementStyles.headline3]}>
          <Text style={[{color: textColor}, AchievementStyles.text3]}> Harjoituksia tehty yhteensä: {third}</Text>
        </View>

      </View>
    );
  }
  
  const AchievementStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      alignItems: 'center',
    },
    headline: {
      marginTop: 0,
      fontSize: 40,
      textAlign: 'center',
      height: 70,
      width: "100%",
      textAlignVertical: 'center',
      fontFamily: 'monospace',
    },
    text: {
      fontSize: 20,
      fontFamily: 'monospace',
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
      textAlignVertical: 'center',
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
      display: 'flex',
      textAlign: 'center',
      width: "100%",
      flexDirection: "row",
      fontFamily: 'monospace',
    },
    headline2: {
      marginTop: 10,
      fontSize: 25,
      textAlign: 'center',
      width: "100%",
      height: 55,
      fontFamily: 'monospace',
    },
    inputWrap: {
      flex: 1,
    },
    headline3: {
      marginTop: 10,
      fontSize: 25,
      textAlign: 'center',
      width: "100%",
      height: 30,
      fontFamily: 'monospace',

    },
    text3: {
      fontSize: 18,
      fontFamily: 'monospace',
      width: "100%",
      marginTop: 0,
      textAlign: 'left',

    },
  });