import { StyleSheet, Text, View, Image, FlatList, SafeAreaView, TouchableOpacity, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import Colors from './../../assets/Colors'

export default function ExerciseScrollView(props) {
  
  const [completedExercises, setCompletedExercises] = useState(["8932489he","89eryu9he","8ertute"])
  let FlatListRef = null
  const [x, setX] = useState({ // this useState controls which subtopic's exercises are visible
    isOpen: false,
    parentName: null
  })
  const [themeColor, setThemeColor] = useState(props.appSettings.themeColorOptions)

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

  const renderSubtopic = ({ item }) => {
    const { data } = item
    return (
      <View style={{backgroundColor: (themeColor.background == '#121212') ? Colors.DarkThemeSecondary : Colors.White}}>
        <View style={[{backgroundColor: themeColor.background}, ESWStyles.topicHeader]}>
          <Text style={[{color: (themeColor.background == '#121212') ? Colors.White : Colors.Brown}, ESWStyles.topicHeaderTitle]}>{item.id}</Text>
          <Text style={[{color: (themeColor.background == '#121212') ? Colors.White : Colors.Brown}, ESWStyles.topicHeaderDescription]}>{item.description}</Text>
        </View>      
        {data.map((tier) => {
          const url = "https://raw.githubusercontent.com/Quattrolingo/Mobiilikehitysprojekti/main/data/images/" + 
          tier.picture
          return (
            <View key={tier.tier} style={ESWStyles.subtopicsContainer}>
              <TouchableOpacity
                onPress={() => onPressExercise(tier)}
                style={ESWStyles.subtopicItem}>
                <View style={[{backgroundColor: themeColor.background}, ESWStyles.subtopicItemImageContainer]}>
                  <Image
                    style={ESWStyles.subtopicItemImage}
                    source={{ uri: url }}
                    resizeMode="cover"
                  />
                </View>
                <Text style={[{color: (themeColor.background == '#121212') ? Colors.White : Colors.Black}, {backgroundColor: themeColor.background}, ESWStyles.subtopicItemTitle]}>{tier.name}</Text>         
              </TouchableOpacity>
              <View style={ESWStyles.singleExerciseContainer}>
                {
                  x.isOpen && x.parentName == tier.name && (
                    tier.exercises.map((itm) => {
                      return(
                        <TouchableOpacity
                          key={itm.id}
                          style={[{backgroundColor: (themeColor.background == '#121212') ? Colors.DarkGrey : Colors.White}, {borderColor: themeColor.background}, ESWStyles.singleExerciseBtn]}
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
      <Pressable onPress={() => FlatListRef.scrollToEnd()} style={ESWStyles.scrollToBottomBtn}>
        <Image
          style={{height: 50, width: 50}}
          source={require('./../../data/images/black_white_arrow.png')}
          resizeMode="cover"/>
      </Pressable>
      { props.languageData ?
        <FlatList
          ref={ref => FlatListRef = ref}
          data={props.languageData.sections}
          renderItem={renderSubtopic}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      : <Text style={[{backgroundColor: themeColor.background}, ESWStyles.loadingMessage]}>{props.UiTranslations.home.loadingExerciseScrollViewData}</Text>
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
  subtopicItemImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',    
    height: 110,
    width: 110,
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