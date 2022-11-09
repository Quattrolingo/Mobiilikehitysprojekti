import { ScrollView, StyleSheet, Text, View, Image, Animated, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'

export default function ExerciseScrollView(props) { //

  const [propsData, setPropsData] = useState(null)

  const animation = new Animated.Value(0)
  const inputRange = [0, 1]
  const outputRange = [1, 0.8]
  const scale = animation.interpolate({inputRange, outputRange})

  useEffect(() => {
    setPropsData(props.languageData)
  }, [])  

  const onPressIn = () => {
    Animated.spring(animation, {
      toValue: 0.5,
      useNativeDriver: true,
    }).start();
  };
  const onPressOut = () => {
    Animated.spring(animation, {
      toValue: 0,
      useNativeDriver: true,
    }).start();
  };

  return (
    <ScrollView>
      <Text>This is ExerciseScrollView</Text>
      { propsData ? 
        propsData.map((topicItem, index) => { return(
          <View key={index} style={ESWStyles.topicContainer}>
            <View style={ESWStyles.topicHeader}>
              <Text style={ESWStyles.topicHeaderTitle}>{topicItem.TOPIC}</Text>
            </View>
            <View style={ESWStyles.subtopicsContainer}>
            { topicItem.SUBTOPICDATA.map((subtopicItem, index) => {
              return(
              <Animated.View
                key={index}
                style={[ESWStyles.subtopicBtn, {transform: [{scale}]}]} >
                <TouchableOpacity
                  activeOpacity={1}
                  onPressIn={onPressIn}
                  onPressOut={onPressOut} >
                  <View style={ESWStyles.subtopicItemImageContainer}>
                    <Image
                      style={ESWStyles.subtopicItemImage}
                      source={subtopicItem.IMAGE}
                    />
                  </View>
                  <Text style={ESWStyles.subtopicItemTitle} >{subtopicItem.SUBTOPIC}</Text>
                </TouchableOpacity>
              </Animated.View>
            )})}
            </View>
          </View>
        )}) : <Text style={ESWStyles.loadingMessage}>Loading data..</Text>}
    </ScrollView>
  );
}

const ESWStyles = StyleSheet.create({
  loadingMessage: {
    backgroundColor: 'white',
    width: '100%',
    textAlign: 'center',
  },
  topicContainer: {
    width: '100%',
    marginBottom: 30,
  },
  topicHeader: {
    padding: 20,
    backgroundColor: '#FCC201',
  },
  topicHeaderTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#5b4217'
  },
  subtopicsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  subtopicBtn: {
    padding: 20,
  },
  subtopicItemImageContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: 110,
    width: 110,
    backgroundColor: '#FCC201',
    borderRadius: 100,
  },
  subtopicItemImage: {
    height: 80,
    width: 80,
  },
  subtopicItemTitle: {
    marginTop: -13,
    textAlign: 'center',
    backgroundColor: '#FCC201',
    padding: 10,
    borderRadius: 15,
    fontSize: 15,
  }
});