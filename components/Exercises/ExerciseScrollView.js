import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Pressable
} from 'react-native'

export default function ExerciseScrollView(props) {

  let FlatListRef = null;

  const onPressExercise = (item) => {
    //console.log(item[0].exercises[0].learner.isCompleted)
    //console.log(JSON.stringify(item))

    props.setExercise(item)
    
  }

  const renderSubtopic = ({ item }) => {
    const { data } = item;  
    return (
      <View>
        <View style={ESWStyles.topicHeader}>
          <Text style={ESWStyles.topicHeaderTitle}>{item.id}</Text>
          <Text style={ESWStyles.topicHeaderDescription}>{item.description}</Text>
        </View>      
        {data.map((tier) => {
          return (
            <View key={tier.tier} style={ESWStyles.subtopicsContainer}>
              {tier.exercises.map((exercise) => {
                const url = "https://raw.githubusercontent.com/Quattrolingo/Mobiilikehitysprojekti/main/data/images/" + 
                exercise.definition.picture
                
                return <TouchableOpacity
                    key={exercise.id}
                    onPress={() => onPressExercise(item.data)}
                    style={ESWStyles.subtopicItem}>
                    <View style={ESWStyles.subtopicItemImageContainer}>
                      <Image
                        style={ESWStyles.subtopicItemImage}
                        source={{ uri: url }}
                        resizeMode="cover"
                      />
                    </View>
                    <Text style={ESWStyles.subtopicItemTitle}>{exercise.definition.name}</Text>                
                  </TouchableOpacity>
              })}
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
      : <Text style={ESWStyles.loadingMessage}>Loading data..</Text>
      }
    </SafeAreaView>
  );
}

const ESWStyles = StyleSheet.create({
  loadingMessage: {
    backgroundColor: 'white',
    width: '100%',
    textAlign: 'center',
  },
  scrollToBottomBtn: {
    zIndex: 100000,
    backgroundColor: 'white',
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
    backgroundColor: '#FCC201',
  },
  topicHeaderTitle: {
    fontSize: 23,
    fontWeight: 'bold',
    color: '#5b4217'
  },
  topicHeaderDescription: {
    fontSize: 17,
    marginTop: 5,
    color: '#5b4217'
  },
  subtopicsContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 15
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
    backgroundColor: '#FCC201',
    borderRadius: 100
  },
  subtopicItemImage: {
    height: 80,
    width: 80,
  },
  subtopicItemTitle: {
    marginTop: -15,
    textAlign: 'center',
    backgroundColor: '#FCC201',
    padding: 10,
    borderRadius: 15,
    fontSize: 20,
  }
});