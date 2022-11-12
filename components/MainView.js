import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import ExerciseScrollView from './ExerciseScrollView.js'
import Achievements from './Achievements.js'
import Profile from './Profile.js'
import Dictionary from './dictionary/Dictionary.js'
import NavigationBar from './NavigationBar.js'
import LanguageData from '../data/translations/fin_eng'

export default function MainView(props) {

    const [currentView, setCurrentView] = useState("ExerciseScrollView")

    if(currentView == "ExerciseScrollView"){
        return (
            <View style={MainViewStyles.container}>
              <ExerciseScrollView languageData={LanguageData} />
              <NavigationBar view={setCurrentView}/>
            </View>
          )
    } else if(currentView == "Achievements"){
        return (
            <View style={MainViewStyles.container}>

              <Achievements />
              <NavigationBar view={setCurrentView}/>
            </View>
          )
    } else if(currentView == "Profile"){
        return (
            <View style={MainViewStyles.container}>
              <Profile />
              <NavigationBar view={setCurrentView}/>
            </View>
          )
    } else if(currentView == "Dictionary"){
      return (
          <View style={MainViewStyles.container}>
            <Dictionary />
            <NavigationBar view={setCurrentView}/>
          </View>
        )
  }
}
  
const MainViewStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
});