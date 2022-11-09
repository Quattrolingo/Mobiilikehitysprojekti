import { ScrollView, StyleSheet, Text, View, Image } from 'react-native'
import { useState, useEffect } from 'react'

export default function ExerciseScrollView(props) { //


  const [propsData, setPropsData] = useState(null)

  useEffect(() => {
    setPropsData(props.languageData)
  }, [])

  return (
    <ScrollView contentContainerStyle={ExerciseScrollViewStyles.container}>
      <Text>This is ExerciseScrollView</Text>
      { propsData ? 
        propsData.map((topicItem, index) => { return(
          <View key={index} style={ExerciseScrollViewStyles.topicContainer}>
            <View style={ExerciseScrollViewStyles.topicHeader}>
              <Text>{topicItem.TOPIC}</Text>
            </View>
            <View style={ExerciseScrollViewStyles.subtopicsContainer}>
            { topicItem.SUBTOPICDATA.map((subtopicItem, index) => {
              return(
              <View key={index}>
                <Image
                  style={ExerciseScrollViewStyles.subtopicItemImage}
                  source={subtopicItem.IMAGE}
                />
                <Text>{subtopicItem.SUBTOPIC}</Text>
              </View>
            )})}
            </View>
          </View>
        )}) : <Text style={ExerciseScrollViewStyles.loadingMessage}>Loading data..</Text>}
    </ScrollView>
  );
}

const ExerciseScrollViewStyles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingMessage: {
    backgroundColor: 'white',
    width: '100%',
    textAlign: 'center',
  },
  topicContainer: {
    minHeight: 20,    
    width: '100%',
    marginBottom: 30,
  },
  topicHeader: {
    padding: 20,
    backgroundColor: 'yellow',
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
  subtopicItemImage: {
    height: 100,
    width: 100
  }
});