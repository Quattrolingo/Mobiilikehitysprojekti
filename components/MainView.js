import { StyleSheet, View, BackHandler } from 'react-native'
import { useState, useEffect } from 'react'
import ExerciseScrollView from './Exercises/ExerciseScrollView.js'
import Achievements from './Achievements.js'
import Profile from './Profile/Profile.js'
import Dictionary from './dictionary/Dictionary.js'
import NavigationBar from './NavigationBar.js'

export default function MainView(props) {

  const [currentView, setCurrentView] = useState("ExerciseScrollView")
  const [navBarVisible, setNavBarVisible] = useState(true)
  let data = <></>

  const handleBackButtonClick = () => { // this controls hardware back button press
    if(currentView == "ExerciseScrollView"){
      BackHandler.exitApp() // if user in ExerciseScrollView and back button pressed, then exit app
    } else {
      setCurrentView("ExerciseScrollView") // if user is in some other view, then enter into ExerciseScrollView
      setNavBarVisible(true)
    }
    return true
  }

  useEffect(() => { // this useEffect sets and removes the event listener for the hardware back button
    BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick)
    }
  }, [currentView])

  if(currentView == "ExerciseScrollView"){ // this if-else controls what is rendered depending on what view the user enters from the navigation bar
    data = <ExerciseScrollView languageData={props.languageData} setExercise={props.setExercise} appSettings={props.appSettings} UiTranslations={props.UiTranslations} />
  } else if(currentView == "Achievements"){
    data = <Achievements UiTranslations={props.UiTranslations} appSettings={props.appSettings}/>
  } else if(currentView == "Profile"){          
    data = <Profile 
              languageData={props.languageData.courseData}
              appSettings={props.appSettings}
              modifyAppSettings={props.modifyAppSettings}
              UiTranslations={props.UiTranslations}
              navBarVisibility={setNavBarVisible}
              setCurrentView={setCurrentView}
              accountType={props.accountType}
              modifyAccountType={props.modifyAccountType}
              accountEmail={props.accountEmail}
              modifyAccountEmail={props.modifyAccountEmail}
              deleteAppData={props.deleteAppData}/>
  } else if(currentView == "Dictionary"){
    data = <Dictionary UiTranslations={props.UiTranslations} appSettings={props.appSettings}/>
  }

  return(
    <View style={MainViewStyles.container}>
      <View style={MainViewStyles.innerContainer}>
        { data }
      </View>
      {
        navBarVisible ? <NavigationBar setView={setCurrentView} view={currentView} appSettings={props.appSettings} /> : <></>
      }
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
})