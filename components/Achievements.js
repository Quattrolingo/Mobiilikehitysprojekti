import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Achievements() {
  
var yhtpisteet = 200;
var pisteet = 100;
var pisteet1 = 50;
var pisteet2 = 75;
var pisteet3 = 30;
var pisteet4 = 60;
var tehtävä = 'Eläimet';
var tehtävä1 = 'Perusteet';
var tehtävä2 = 'Ruoka';
var tehtävä3= 'Ympäristö';
var tehtävä4 = 'Ihmiset';



return (
      <View style={AchievementStyles.container}>
        <Text style={AchievementStyles.headline}> Saavutukset</Text>
        <Text style={AchievementStyles.text}>Hienoa! Olet saanut pisteitä yhteensä:</Text>
        <Text style={AchievementStyles.points}>{yhtpisteet}</Text>

        <View style={AchievementStyles.headline2}>
          <Text style={AchievementStyles.text2}> Viimeiset 5 tehtävää</Text>
          <Text style={AchievementStyles.text2}> Tehtävä:          Pisteet:</Text>
        </View>

        <View style={AchievementStyles.headline1}>
          <View style={AchievementStyles.inputWrap}>
            <Text style={AchievementStyles.text1}> {tehtävä}</Text>           
            <Text style={AchievementStyles.text1}> {tehtävä1}</Text>
            <Text style={AchievementStyles.text1}> {tehtävä2}</Text>
            <Text style={AchievementStyles.text1}> {tehtävä3}</Text>
            <Text style={AchievementStyles.text1}> {tehtävä4}</Text>
          </View>

          <View style={AchievementStyles.inputWrap}>
            <Text style={AchievementStyles.text1}>    {pisteet}</Text>           
            <Text style={AchievementStyles.text1}>    {pisteet1}</Text>
            <Text style={AchievementStyles.text1}>    {pisteet2}</Text>
            <Text style={AchievementStyles.text1}>    {pisteet3}</Text>
            <Text style={AchievementStyles.text1}>    {pisteet4}</Text>
          </View>
        </View>

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
      marginTop: 10,
      fontSize: 25,
      textAlign: 'center',
      width: "100%",
      flex: 1,
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