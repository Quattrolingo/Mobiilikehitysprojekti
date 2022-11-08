import { ScrollView, StyleSheet, Text, View } from 'react-native'
import { useState, useEffect } from 'react'

export default function ExerciseScrollView(props) { //


  const [topics, setTopics] = useState([])

  useEffect(() => {
    let allTopics = props.languageData.map(({ TOPIC }) => TOPIC) // Get all topics and save them into an array
    setTopics(Array.from(new Set(allTopics))) // Remove duplicate topics from "allTopics" array and save to state
  }, [])

  return (
    <ScrollView contentContainerStyle={ExerciseScrollViewStyles.container}>
      <Text>This is ExerciseScrollView</Text>
      { props.languageData ? 
        topics.map((topicItem, index) => { return(
          <View key={index} style={ExerciseScrollViewStyles.topicContainer}>
            <View style={ExerciseScrollViewStyles.topicHeader}>
              <Text>{topicItem}</Text>
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
  }
});