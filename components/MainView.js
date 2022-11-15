import { StyleSheet, View, BackHandler } from 'react-native'
import { useState, useEffect } from 'react'
import ExerciseScrollView from './Exercises/ExerciseScrollView.js'
import Achievements from './Achievements.js'
import Profile from './Profile.js'
import Dictionary from './dictionary/Dictionary.js'
import NavigationBar from './NavigationBar.js'
import LanguageData from '../data/translations/fin_e.json'

export default function MainView(props) {

  const [currentView, setCurrentView] = useState("ExerciseScrollView")
  let data = <></>

  const handleBackButtonClick = () => {
    if(currentView == "ExerciseScrollView"){
      BackHandler.exitApp()
    } else {
      setCurrentView("ExerciseScrollView")
    }
    return true
  }

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick)
    }
  }, [currentView])

  if(currentView == "ExerciseScrollView"){
    data = <ExerciseScrollView languageData={LanguageData} setExercise={props.setExercise} />
  } else if(currentView == "Achievements"){
    data = <Achievements />
  } else if(currentView == "Profile"){          
    data = <Profile />
  } else if(currentView == "Dictionary"){
    data = <Dictionary />
  }

  return(
    <View style={MainViewStyles.container}>
      <View style={MainViewStyles.innerContainer}>
        { data }
      </View>
      <NavigationBar setView={setCurrentView} view={currentView}/>
    </View>
  )
}
  
const MainViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  innerContainer: {
    flex: 1
  }
});