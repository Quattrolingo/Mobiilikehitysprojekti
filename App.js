import { StyleSheet, View, StatusBar } from 'react-native'
import { useState, useEffect } from 'react'
import MainView from './components/MainView'
import Exercise from './components/Exercises/Exercise'
import LanguageData from './data/translations/fin_eng.json'
import * as NavigationBar from 'expo-navigation-bar'
import Colors from './assets/Colors'

export default function App() {

  const [educationMode, setEducationMode] = useState(null)
  const [exercise, setExercise] = useState(null)
  const [appSettings, setAppSettings] = useState({
    themeColorOptions:
    {
      background: Colors.DarkYellow,
    },
    soundOn: true
  })
  const [UiTranslations, setUiTranslations] = useState(LanguageData.courseData.ui_translations)

  useEffect(() => {
    if(appSettings.themeColorOptions.background == Colors.DarkTheme){
      NavigationBar.setBackgroundColorAsync(Colors.DarkTheme)
    } else {
      NavigationBar.setBackgroundColorAsync("white")
    }
  }, [appSettings.themeColorOptions.background])

  return (
    <View style={AppStyles.container}>
      <StatusBar backgroundColor={(appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkTheme : Colors.White}/>
      {
        exercise ? 
        <Exercise
          exercise={exercise}
          setExercise={setExercise}
          appSettings={appSettings}
          UiTranslations={UiTranslations}
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
