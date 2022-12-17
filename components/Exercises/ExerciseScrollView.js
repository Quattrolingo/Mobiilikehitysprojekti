import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import Colors from './../../assets/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CircularProgressBar from 'react-native-circular-progress-indicator'
import { Dialog, DialogHeader, DialogContent, DialogActions, Button, Provider } from '@react-native-material/core'

export default function ExerciseScrollView(props) {
  
  const [completedExercises, setCompletedExercises] = useState([])
  const FlatListRef = useRef()
  const [x, setX] = useState({ // this useState controls which subtopic's exercises are visible
    isOpen: false,
    parentName: null
  })
  const [appColor, setThemeColor] = useState(props.appSettings.themeColorOptions)
  const [courseFlag, setCourseFlag] = useState([])
  const [dialogVisible, setDialogVisible] = useState(false)

  const getCompletedExercises = async () => {
    const exercises = await AsyncStorage.getItem('@completed_exercises')
    if(exercises !== null){
      setCompletedExercises(JSON.parse(exercises))
    } else {
      setCompletedExercises([])
    }
  }

  const getCircularProgressBarStatus = (exercises) => {
    let exerciseArray = exercises.map(item => item.uniqueID)
    let count = 0
    for(let i = 0; i < exerciseArray.length; i++){
      try {
        if(completedExercises.includes(exerciseArray[i])){
          count = count + 1
        }
      } catch(e) {
      }
    }
    return count
  }

  useEffect(() => {
    getCompletedExercises()
  }, [props])

  useEffect(() => {
    setThemeColor(props.appSettings.themeColorOptions)
  }, [props.appSettings.themeColorOptions])

  const getSingleExerciseNumber = (data) => { // get image for single exercise
    let imageSource = ''
    if(data.itemID == 1){
      if(completedExercises.includes(data.itemUniqID)){
        imageSource = require('./../../data/images/first_emblem_border.png')
      } else {
        imageSource = require('./../../data/images/first_emblem.png')
      }      
    } else if(data.itemID == 2){
      if(completedExercises.includes(data.itemUniqID)){
        imageSource = require('./../../data/images/second_emblem_border.png')
      } else {
        imageSource = require('./../../data/images/second_emblem.png')
      }      
    } else if(data.itemID == 3){
      if(completedExercises.includes(data.itemUniqID)){
        imageSource = require('./../../data/images/third_emblem_border.png')
      } else {
        imageSource = require('./../../data/images/third_emblem.png')
      }      
    } else {
      imageSource = require('./../../data/images/noimage.png')
    }
    
    return(
      <Image
        style={{ height: 65, width: 65 }}
        source={imageSource}
        resizeMode="cover"/>
    )
  }

  const onPressExercise = (item) => { // execute when a subtopic exercise item is clicked (for example: "numbers" inside main topic "basics")
    if(item.exercises.length && item.exercises.length > 1){ // if item has more than one exercise, then show the sub-exercises
      if(x.parentName == item.name){
        // if the sub exercises of the clicked item are already visible, then hide the sub-exercises
        setX({
          parentName: item.name,
          isOpen: !x.isOpen,
        })        
      } else {
        // else if the sub exercises are open on another item but not on the one that was clicked, 
        // then hide the other one's sub-exercises and show the one's that was clicked
        setX({
          parentName: item.name,
          isOpen: true,
        })
      }      
    } else {
      // else if the item has only single exercise, then enter straight into exercise when the item is clicked
      props.setExercise(item.exercises[0])
    }    
  }

  const validateExerciseAvailability = (item) => {
    if(item.uniqueID != props.languageData.courseData.sectionStructure[0].tierUniqueID && props.accountType != "student"){
      let amount = 0
      let index = props.languageData.courseData.sectionStructure.findIndex(itm => itm.tierUniqueID == item.uniqueID)
      for(let i = 0; i < props.languageData.courseData.sectionStructure[index - 1].exercises.length; i++){
        if(completedExercises.includes(props.languageData.courseData.sectionStructure[index - 1].exercises[i])){
          amount = amount + 1
        }        
      }
      if(amount == props.languageData.courseData.sectionStructure[index - 1].exercises.length){
        onPressExercise(item)
      } else {
        // Do nothing
      }
    } else {
      onPressExercise(item)
    }
  }

  const getExerciseAvailabilityStyle = (item) => {
    if(item.uniqueID != props.languageData.courseData.sectionStructure[0].tierUniqueID  && props.accountType != "student"){
      let amount = 0
      let index = props.languageData.courseData.sectionStructure.findIndex(itm => itm.tierUniqueID == item.uniqueID)
      for(let i = 0; i < props.languageData.courseData.sectionStructure[index - 1].exercises.length; i++){
        if(completedExercises.includes(props.languageData.courseData.sectionStructure[index - 1].exercises[i])){
          amount = amount + 1
        }        
      }
      if(amount == props.languageData.courseData.sectionStructure[index - 1].exercises.length){
        return true
      } else {
        return false
      }
    } else {
      return true
    }
  }  

  const renderSubtopic = ({ item }) => {
    const { data } = item
    return (
      <View style={{backgroundColor: (appColor.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}}>
        <View style={[{backgroundColor: appColor.background}, ESWStyles.topicHeader]}>
          <Text style={[{color: (appColor.background == Colors.DarkTheme) ? Colors.White : Colors.Brown}, ESWStyles.topicHeaderTitle]}>{item.id}</Text>
          <Text style={[{color: (appColor.background == Colors.DarkTheme) ? Colors.White : Colors.Brown}, ESWStyles.topicHeaderDescription]}>{item.description}</Text>
        </View>      
        {data.map((tier) => {
          const url = "https://raw.githubusercontent.com/Quattrolingo/Mobiilikehitysprojekti/main/data/images/" + tier.picture
          return (
            <View key={tier.tier} style={ESWStyles.subtopicsContainer}>
              <TouchableOpacity onPress={() => validateExerciseAvailability(tier)} style={ESWStyles.subtopicItem} activeOpacity={0.5}>
                <View style={ESWStyles.circularProgressBar}>
                  <CircularProgressBar                   
                    value={getCircularProgressBarStatus(tier.exercises)}
                    maxValue={tier.exercises.length}
                    initialValue={0}
                    radius={56}
                    activeStrokeColor={(appColor.background == Colors.DarkTheme) ? Colors.RicherMint : Colors.CircularProgressGreen}
                    inActiveStrokeColor={"transparent"}
                    activeStrokeWidth={20}
                    rotation={180}
                    progressValueColor={'transparent'}
                    duration={150}
                  />
                </View>
                <View style={[{backgroundColor: "transparent",
                               borderWidth: 4,
                               borderColor: getExerciseAvailabilityStyle(tier) == false  &&  appColor.background == Colors.DarkTheme ? Colors.Grey
                                                                                  : getExerciseAvailabilityStyle(tier) == false ? Colors.LightGrey
                                                                                  : appColor.background == Colors.DarkTheme ? Colors.DarkTheme
                                                                                  : appColor.background}, 
                               ESWStyles.subtopicItemImageContainer]}>
                  <View style={[{borderColor: getExerciseAvailabilityStyle(tier) == false ? "transparent"
                                                                                          : appColor.background == Colors.DarkTheme ? Colors.DarkTheme
                                                                                          : appColor.background},
                                ESWStyles.subtopicImageInnerContainer]}>
                    {
                      getExerciseAvailabilityStyle(tier) == false && appColor.background == Colors.DarkTheme ?
                      <Image
                        style={ESWStyles.lockedSubtopicItemImage}
                        source={courseFlag}
                        resizeMode="cover" />
                      : getExerciseAvailabilityStyle(tier) == false ?
                      <Image
                        style={ESWStyles.lockedSubtopicItemImage}
                        source={require('../../data/images/lock_lightgrey_background.png')}
                        resizeMode="cover" />
                      :
                      <Image
                        style={ESWStyles.subtopicItemImage}
                        source={{ uri: url }}
                        resizeMode="cover" />
                    }
                  </View>
                </View>
                <Text style={[{color: (appColor.background == Colors.DarkTheme) ? Colors.White : Colors.Black},
                              {backgroundColor: getExerciseAvailabilityStyle(tier) == false  &&  appColor.background == Colors.DarkTheme ? Colors.Grey
                                                                                            : getExerciseAvailabilityStyle(tier) == false ? Colors.LightGrey
                                                                                            : appColor.background},
                              ESWStyles.subtopicItemTitle]}>
                  {tier.name}
                </Text>                
              </TouchableOpacity>
              <View style={ESWStyles.singleExerciseContainer}>
                {
                  x.isOpen && x.parentName == tier.name && (
                    tier.exercises.map((itm) => {
                      return(
                        <TouchableOpacity
                          activeOpacity={0.5}
                          key={itm.id}
                          style={[{backgroundColor: (appColor.background == Colors.DarkTheme) ? Colors.DarkGrey : Colors.White}, {borderColor: appColor.background}, ESWStyles.singleExerciseBtn]}
                          onPress={() => props.setExercise(itm)} >
                          { getSingleExerciseNumber({itemID:itm.id, itemUniqID:itm.uniqueID}) }
                        </TouchableOpacity>
                      )
                    })
                  )
                } 
              </View>           
            </View>
          )
        })}
      </View>
    )
  }

  return (
    <SafeAreaView>
      <Provider>
        <Dialog visible={dialogVisible} onDismiss={() => setDialogVisible(false)}>
          <DialogHeader title={props.UiTranslations.settings.chooseLanguageCourse} />
          <DialogContent>
            <TouchableOpacity activeOpacity={0.5} style={[ESWStyles.chooseLanguageDialogItem]} onPress={() => {setDialogVisible(!dialogVisible); props.setCourseDataName("english")}}>
            <Image
              style={{height: 30, width: 47, marginRight: 10}}
              source={require('./../../data/images/course_flag_english.png')}
              resizeMode="cover"/>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: Colors.Grey}}>Englanti</Text>
          </TouchableOpacity>
            <TouchableOpacity activeOpacity={0.5} style={[ESWStyles.chooseLanguageDialogItem]} onPress={() => {setDialogVisible(!dialogVisible); props.setCourseDataName("swedish")}}>
            <Image
              style={{height: 30, width: 47, marginRight: 10}}
              source={require('./../../data/images/course_flag_swedish.png')}
              resizeMode="cover"/>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: Colors.Grey}}>Ruotsi</Text>
          </TouchableOpacity>
          </DialogContent>
          <DialogActions>
            <Button title={props.UiTranslations.settings.cancel}
              compact
              variant="text"
              color={props.appSettings.themeColorOptions.background}
              onPress={() => {setDialogVisible(false)}} />
          </DialogActions>
        </Dialog>      
        <View style={[{backgroundColor: appColor.background == Colors.DarkTheme ? Colors.DarkTheme : appColor.background,
                      borderBottomColor: appColor.background == Colors.DarkTheme ? Colors.DarkThemeSecondary
                                          : appColor.background == Colors.DarkYellow ? "#DAA520"
                                          : appColor.background == Colors.LightPink ? "#fcbbc4" : "#6fbfbb"}, ESWStyles.courseHeader]}>
          <TouchableOpacity activeOpacity={0.5} style={[ESWStyles.courseFlag]} onPress={() => setDialogVisible(!dialogVisible)}>
            {
              courseFlag.map((index) => {
                let flagSource = './../../data/images/' + props.languageData.courseData.courseFlag
                return (
                  <Image
                    key={index}
                    style={{height: 24, width: 41}}
                    source={{ uri: flagSource }}
                    resizeMode="cover"/>
                )
              })
            }
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.5} style={[ESWStyles.totalPointsContainer]} onPress={() => props.setCurrentView("Achievements")}>
            <Image
              style={{height: 29, width: 28}}
              source={require('./../../data/images/points_icon_star_bordered.png')}
              resizeMode="cover"/>
            <Text style={ESWStyles.totalPoints}>{props.totalPoints}</Text>
          </TouchableOpacity>        
        </View>
        {
          dialogVisible ? <></> :
          <TouchableOpacity activeOpacity={0.5} onPress={() => FlatListRef.current?.scrollToEnd()} style={ESWStyles.scrollToBottomBtn}>
            <Image
              style={{height: 50, width: 50}}
              source={require('./../../data/images/black_white_arrow.png')}
              resizeMode="cover"/>
          </TouchableOpacity>
        }        
        { props.languageData ?
          <FlatList
            ref={FlatListRef}
            data={props.languageData.sections}
            renderItem={renderSubtopic}
            keyExtractor={(item) => item.id}
            showsVerticalScrollIndicator={false}
          />
        : <Text style={[{backgroundColor: appColor.background}, ESWStyles.loadingMessage]}>{props.UiTranslations.home.loadingExerciseScrollViewData}</Text>
        }
      </Provider>
    </SafeAreaView>
  )
}

const ESWStyles = StyleSheet.create({
  courseHeader: {
    height: 45,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: 20,
    paddingLeft: 20,
    borderBottomWidth: 2,
  },
  courseFlag: {
    borderWidth: 2,
    borderRadius: 3,
    borderColor: Colors.White
  },
  totalPointsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalPoints: {
    marginLeft: 8,
    fontWeight: 'bold',
    fontSize: 22,
    color: Colors.White
  },
  chooseLanguageDialogItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
  },
  loadingMessage: {
    width: '100%',
    textAlign: 'center',
  },
  scrollToBottomBtn: {
    zIndex: 1000,
    backgroundColor: Colors.White,
    position: 'absolute',
    right: 20,
    bottom: 60,
    width: 60,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderRadius: 100    
  },
  topicHeader: {
    padding: 15,
  },
  topicHeaderTitle: {
    fontSize: 23,
    fontWeight: 'bold',
  },
  topicHeaderDescription: {
    fontSize: 17,
    marginTop: 5,
  },
  subtopicsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15,
  },
  subtopicItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  circularProgressBar: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 34
  },
  subtopicItemImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',    
    height: 115,
    width: 115,
    zIndex: 10,
    borderRadius: 100
  },
  subtopicImageInnerContainer: {
    borderWidth: 4,
    borderRadius: 100
  },
  subtopicItemImage: {
    height: 80,
    width: 80,
  },
  lockedSubtopicItemImage: {
    height: 86,
    width: 86,
  },
  subtopicItemTitle: {
    marginTop: -15,
    textAlign: 'center',
    padding: 10,
    borderRadius: 15,
    fontSize: 20,
    zIndex: 20
  },
  singleExerciseContainer: {
    marginT: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    width: '95%'
  },
  singleExerciseBtn:{
    margin: 10,
    padding: 8,
    borderWidth: 4,
    borderRadius: 25,
  }
})