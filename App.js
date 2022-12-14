import { StyleSheet, View, StatusBar, ToastAndroid, Text, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import MainView from './components/MainView'
import Exercise from './components/Exercises/Exercise'
import LanguageData from './data/translations/fin_eng.json'
import * as NavigationBar from 'expo-navigation-bar'
import Colors from './assets/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  const [educationMode, setEducationMode] = useState(null)
  const [exercise, setExercise] = useState(null)
  const [appSettings, setAppSettings] = useState({ themeColorOptions: { background: Colors.DarkYellow }, soundOn: true })
  const [UiTranslations, setUiTranslations] = useState(LanguageData.courseData.ui_translations)
  const [loaded, setLoaded] = useState(false)
  const [pointsFromLastExercise, setPointsFromLastExercise] = useState(0)

  const getAppSettings = async () => {
    try {
      const theme_backgroundColor = await AsyncStorage.getItem('@theme_backgroundColor')
      const soundSettings = await AsyncStorage.getItem('@soundSettings')
      if(theme_backgroundColor !== null){
        setAppSettings(prevState => ({
          ...prevState,
          themeColorOptions: {
            background: theme_backgroundColor
          }
        }))
      } else {
        setAppSettings(prevState => ({
          ...prevState,
          themeColorOptions: {
            background: Colors.DarkYellow
          }
        }))
      }
      if(soundSettings !== null){
        setAppSettings(prevState => ({
          ...prevState,
          soundOn: soundSettings
        }))
      }
      setLoaded(true)
    } catch (e) {}    
  }


  useEffect(() => {
    getAppSettings()
  }, [])

  useEffect(() => {
    if(appSettings.themeColorOptions.background == Colors.DarkTheme){
      NavigationBar.setBackgroundColorAsync(Colors.DarkTheme)
    } else {
      NavigationBar.setBackgroundColorAsync("white")
    }
  }, [appSettings.themeColorOptions.background])

  const exerciseCompleted = async () => {
    try {
        const totalPoints = await AsyncStorage.getItem('@Totalpoints')
        const previousExerciseData = await AsyncStorage.getItem('@completed_exercises')

        if(totalPoints != null){      
          try {
            let newTotalPoints = JSON.parse(totalPoints) + pointsFromLastExercise
            await AsyncStorage.setItem('@Totalpoints', JSON.stringify(newTotalPoints))            
          } catch (e) {}
        } else {
          try {
            await AsyncStorage.setItem('@Totalpoints', JSON.stringify(pointsFromLastExercise))
          } catch(e) {} 
        }

        if(previousExerciseData !== null) {
            let modifiablePreviousExerciseData = JSON.parse(previousExerciseData)
            if(modifiablePreviousExerciseData.includes(exercise.uniqueID)){
                // do nothing
            } else {
              modifiablePreviousExerciseData.push(exercise.uniqueID)
              try {
                  await AsyncStorage.setItem('@completed_exercises', JSON.stringify(modifiablePreviousExerciseData))
              } catch(e) {
                  ToastAndroid.show(e, ToastAndroid.SHORT)
              }                    
            }                
        } else {
            try {
                await AsyncStorage.setItem('@completed_exercises', JSON.stringify([exercise.uniqueID]))
            } catch(e) {
                ToastAndroid.show(e, ToastAndroid.SHORT)
            }                
        }            
    } catch(e) {
        ToastAndroid.show(e, ToastAndroid.SHORT)
    }
  }

  return (
    <View style={AppStyles.container}>
      {
        loaded ?
        <>
          <StatusBar
            barStyle={(appSettings.themeColorOptions.background == Colors.DarkTheme) ? 'light-content' : 'dark-content'}
            backgroundColor={(appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkTheme : appSettings.themeColorOptions.background}/>
          {
            exercise ? 
            <Exercise
              exercise={exercise}
              setExercise={setExercise}
              appSettings={appSettings}
              UiTranslations={UiTranslations}
              exerciseCompleted={exerciseCompleted}
              setPointsFromLastExercise={setPointsFromLastExercise}
            />
            :
            <MainView
              exercise={exercise}
              setExercise={setExercise}
              languageData={LanguageData}
              appSettings={appSettings}
              modifyAppSettings={setAppSettings}
              UiTranslations={UiTranslations}
            />
          }
        </>
        :
        <>
          <Text style={{marginBottom: 20}}>loading app..</Text>
          <ActivityIndicator size="large" color={Colors.DarkYellow} />
        </>
        
      }      
    </View>
  )
}

const AppStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.White,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
