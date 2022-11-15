import { StyleSheet, View } from 'react-native'
import { useState } from 'react'
import MainView from './components/MainView'
import Exercise from './components/Exercises/Exercise'

export default function App() {

  const[exercise, setExercise] = useState(null)

  return (
    <View style={AppStyles.container}>
      {
        exercise ? 
        <Exercise
          exercise={exercise}
          setExercise={setExercise}
        />
        : <MainView
          exercise={exercise}
          setExercise={setExercise}
        />
      }
    </View>
  );
}

const AppStyles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
