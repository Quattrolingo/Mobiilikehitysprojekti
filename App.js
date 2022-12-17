import { StyleSheet, View, StatusBar, ToastAndroid, Text, ActivityIndicator } from 'react-native'
import { useState, useEffect } from 'react'
import MainView from './components/MainView'
import Exercise from './components/Exercises/Exercise'
import EnglishCourseData from './data/translations/fin_eng.json'
import SwedishCourseData from './data/translations/fin_swe.json'
import * as NavigationBar from 'expo-navigation-bar'
import Colors from './assets/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function App() {

  const [accountType, setAccountType] = useState("consumer")
  const [accountEmail, setAccountEmail] = useState("")
  const [exercise, setExercise] = useState(null)
  const [appSettings, setAppSettings] = useState({ themeColorOptions: { background: Colors.DarkYellow }, soundOn: true })
  const [loaded, setLoaded] = useState(false)
  const [pointsFromLastExercise, setPointsFromLastExercise] = useState(0)
  const [courseDataName, setCourseDataName] = useState("english")
  const [courseData, setCourseData] = useState(courseDataName == "english" ? EnglishCourseData : SwedishCourseData)
  const [UiTranslations, setUiTranslations] = useState(courseData.courseData.ui_translations)
  const [totalPoints, setTotalPoints] = useState(0)

  const getAppSettings = async () => { // Get app settings from async storage
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

  const getTotalpoints = async () => { // Get total points (gathered from exercises) from async storage
    try{
      const data = await AsyncStorage.getItem('@Totalpoints')
      if (data != null){
        setTotalPoints(JSON.parse(data)) 
      }
    } catch (e) {}
  }

  useEffect(() => { // get various data from async storage on startup / page render
    getAppSettings()
    getAccountType()
    getActiveCourse()
  }, [])

  useEffect(() => {
    setCourseData(courseDataName == "english" ? EnglishCourseData : SwedishCourseData)
    modifyActiveCourse()
  }, [courseDataName])

  useEffect(() => { // useEffect to help update total points
    getTotalpoints()
  }, [exercise])

  useEffect(() => { // useEffect that controls Android NavigationBar styling
    if(appSettings.themeColorOptions.background == Colors.DarkTheme){
      NavigationBar.setBackgroundColorAsync(Colors.DarkTheme)
    } else {
      NavigationBar.setBackgroundColorAsync("white")
    }
  }, [appSettings.themeColorOptions.background])

  const deleteAppData = async () => { // Function to delete all app data from async storage
    setLoaded(false)
    try {
      await AsyncStorage.setItem('@theme_backgroundColor', Colors.DarkYellow)
      await AsyncStorage.removeItem('@quattrolingo_account_type')
      await AsyncStorage.removeItem('@quattrolingo_account_email')      
      await AsyncStorage.removeItem('@soundSettings')
      await AsyncStorage.removeItem('@completed_exercises')
      await AsyncStorage.removeItem('@Totalpoints')
      await AsyncStorage.removeItem('@Firstfivepoints')
      await AsyncStorage.removeItem('@activeCourseName')
      setAccountType("consumer")
      setAccountEmail("")
      setCourseDataName("english")
    } catch (e) {
    }
    setLoaded(true)
  }

  const getActiveCourse = async () => { // Get active language course name (english or swedish as of December 2022)
    try{
      const course = await AsyncStorage.getItem('@activeCourseName')
      if(course != null){
        setCourseDataName(course)             
      }
    } catch (e) {
    }
  }

  const modifyActiveCourse = async () => { // Saves new language course name to async storage
    try{
      await AsyncStorage.setItem('@activeCourseName', courseDataName)
    } catch (e) {
    }
  }

  const getAccountType = async () => { // Get account type (consumer or student (PRO version))
    try{
      const accountTypeData = await AsyncStorage.getItem('@quattrolingo_account_type')
      const accountEmail = await AsyncStorage.getItem('@quattrolingo_account_email')
      if(accountTypeData == null){
        modifyAccountType("consumer")             
      } else {
        setAccountType(accountTypeData)
      }
      if(accountEmail == null){
        modifyAccountEmail("")   
      } else {
        setAccountEmail(accountEmail)
      }
    } catch (e) {
    }
  }

  const modifyAccountType = async (type) => { // Modify account type in async storage
    try{
      await AsyncStorage.setItem('@quattrolingo_account_type', type)
      setAccountType(type)
    } catch (e) {
    }
  }

  const modifyAccountEmail = async (email) => { // Modify account email in async storage
    try{
      await AsyncStorage.setItem('@quattrolingo_account_email', email)
      setAccountEmail(email)
    } catch (e) {
    }
  }

  const exerciseCompleted = async () => { // Executed when an exercise is finished -> save points and completed exercise to async storage
    try {
      const previousExerciseData = await AsyncStorage.getItem('@completed_exercises')
      const lastFiveExercises = await AsyncStorage.getItem('@Firstfivepoints')
      const totalPoints = await AsyncStorage.getItem('@Totalpoints')      

      if(totalPoints != null){ // If total points exist in storage -> sum previous points and last exercise's points
        try {
          let newTotalPoints = JSON.parse(totalPoints) + pointsFromLastExercise
          await AsyncStorage.setItem('@Totalpoints', JSON.stringify(newTotalPoints))            
        } catch (e) {}
      } else { // If total points do not exist in storage, add last exercise's points
        try {
          await AsyncStorage.setItem('@Totalpoints', JSON.stringify(pointsFromLastExercise))
        } catch(e) {} 
      }

      if(lastFiveExercises != null){ // Update list of last 5 exercises
        try {
          let newLastFiveExercises = JSON.parse(lastFiveExercises)
          if(newLastFiveExercises.length == 5){
            newLastFiveExercises.shift()
            newLastFiveExercises.push({nimi: exercise.definition.name, pisteet: pointsFromLastExercise})
          } else {
            newLastFiveExercises.push({nimi: exercise.definition.name, pisteet: pointsFromLastExercise})
          }
          await AsyncStorage.setItem('@Firstfivepoints', JSON.stringify(newLastFiveExercises))            
        } catch (e) {}
      } else {
        try {
          await AsyncStorage.setItem('@Firstfivepoints', JSON.stringify([{nimi: exercise.definition.name, pisteet: pointsFromLastExercise}]))
        } catch(e) {} 
      }

      if(previousExerciseData !== null) { // Update list of all completed exercises
        let modifiablePreviousExerciseData = JSON.parse(previousExerciseData)
        if(modifiablePreviousExerciseData.includes(exercise.uniqueID)){
            // do nothing
        } else {
          modifiablePreviousExerciseData.push(exercise.uniqueID)
          try {
              await AsyncStorage.setItem('@completed_exercises', JSON.stringify(modifiablePreviousExerciseData))
          } catch(e) {}                    
        }                
    } else {
        try {
            await AsyncStorage.setItem('@completed_exercises', JSON.stringify([exercise.uniqueID]))
        } catch(e) {
            ToastAndroid.show(e, ToastAndroid.SHORT)
        }                
      }            
    } catch(e) {}
  }

  return (
    <View style={AppStyles.container}>
      {
        loaded ?
        <>
          <StatusBar
            barStyle={(appSettings.themeColorOptions.background == Colors.DarkTheme) ? 'light-content' : 'dark-content'}
            backgroundColor={appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.DarkTheme : exercise ? Colors.White : appSettings.themeColorOptions.background}/>
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
              languageData={courseData}
              appSettings={appSettings}
              modifyAppSettings={setAppSettings}
              UiTranslations={UiTranslations}
              accountType={accountType}
              modifyAccountType={modifyAccountType}
              accountEmail={accountEmail}
              modifyAccountEmail={modifyAccountEmail}
              deleteAppData={deleteAppData}
              totalPoints={totalPoints}
              setCourseDataName={setCourseDataName}
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
