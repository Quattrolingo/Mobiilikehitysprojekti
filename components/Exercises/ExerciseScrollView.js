import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TouchableOpacity } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import Colors from './../../assets/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CircularProgressBar from 'react-native-circular-progress-indicator'

export default function ExerciseScrollView(props) {
  
  const [completedExercises, setCompletedExercises] = useState([])
  const FlatListRef = useRef()
  const [x, setX] = useState({ // this useState controls which subtopic's exercises are visible
    isOpen: false,
    parentName: null
  })
  const [appColor, setThemeColor] = useState(props.appSettings.themeColorOptions)

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

  const renderSubtopic = ({ item, index }) => {
    const { data } = item
    return (
      <View style={{backgroundColor: (appColor.background == '#121212') ? Colors.DarkThemeSecondary : Colors.White}}>
        <View style={[{backgroundColor: appColor.background}, ESWStyles.topicHeader]}>
          <Text style={[{color: (appColor.background == '#121212') ? Colors.White : Colors.Brown}, ESWStyles.topicHeaderTitle]}>{item.id}</Text>
          <Text style={[{color: (appColor.background == '#121212') ? Colors.White : Colors.Brown}, ESWStyles.topicHeaderDescription]}>{item.description}</Text>
        </View>      
        {data.map((tier) => {
          const url = "https://raw.githubusercontent.com/Quattrolingo/Mobiilikehitysprojekti/main/data/images/" + tier.picture
          return (
            <View key={tier.tier} style={ESWStyles.subtopicsContainer}>
              <TouchableOpacity onPress={() => onPressExercise(tier)} style={ESWStyles.subtopicItem} activeOpacity={0.5}>
                <View style={ESWStyles.circularProgressBar}>
                  <CircularProgressBar                   
                    value={getCircularProgressBarStatus(tier.exercises)}
                    maxValue={tier.exercises.length}
                    initialValue={0}
                    radius={56}
                    activeStrokeColor={(appColor.background == '#121212') ? Colors.RicherMint : Colors.CircularProgressGreen}
                    inActiveStrokeColor={"transparent"}
                    activeStrokeWidth={20}
                    rotation={180}
                    progressValueColor={'transparent'}
                    duration={150}
                  />
                </View>
                <View style={[{backgroundColor: "transparent",
                               borderWidth: 4,
                               borderColor: (appColor.background == '#121212') ? Colors.DarkTheme : appColor.background}, 
                               ESWStyles.subtopicItemImageContainer]}>
                  <View style={[{borderColor: (appColor.background == '#121212') ? Colors.DarkTheme : appColor.background}, ESWStyles.subtopicImageInnerContainer]}>
                    <Image
                    style={ESWStyles.subtopicItemImage}
                    source={{ uri: url }}
                    resizeMode="cover" />
                  </View>
                </View>
                <Text style={[{color: (appColor.background == '#121212') ? Colors.White : Colors.Black},
                              {backgroundColor: appColor.background},
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
                          style={[{backgroundColor: (appColor.background == '#121212') ? Colors.DarkGrey : Colors.White}, {borderColor: appColor.background}, ESWStyles.singleExerciseBtn]}
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
      <TouchableOpacity activeOpacity={0.5} onPress={() => FlatListRef.current?.scrollToEnd()} style={ESWStyles.scrollToBottomBtn}>
        <Image
          style={{height: 50, width: 50}}
          source={require('./../../data/images/black_white_arrow.png')}
          resizeMode="cover"/>
      </TouchableOpacity>
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
    </SafeAreaView>
  )
}

const ESWStyles = StyleSheet.create({
  loadingMessage: {
    width: '100%',
    textAlign: 'center',
  },
  scrollToBottomBtn: {
    zIndex: 100000,
    backgroundColor: Colors.White,
    position: 'absolute',
    right: 20,
    bottom: 20,
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
    justifyContent: 'center'
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