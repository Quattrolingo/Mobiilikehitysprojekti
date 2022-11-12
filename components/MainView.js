import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import ExerciseScrollView from './ExerciseScrollView.js'
import Achievements from './Achievements.js'
import Profile from './Profile.js'
import Dictionary from './dictionary/Dictionary.js'
import NavigationBar from './NavigationBar.js'
import LanguageData from '../data/translations/fin_eng'

export default function MainView() {

  const [currentView, setCurrentView] = useState("ExerciseScrollView")

  let data = <></>

  if(currentView == "ExerciseScrollView"){
    data = <ExerciseScrollView languageData={LanguageData} />
  } else if(currentView == "Achievements"){
    data = <Achievements />
  } else if(currentView == "Profile"){          
    data = <Profile />
  } else if(currentView == "Dictionary"){
    data = <Dictionary />
  }

  return(
    <View style={MainViewStyles.container}>
      { data }
      <NavigationBar setView={setCurrentView} view={currentView}/>
    </View>
  )
}
  
const MainViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});