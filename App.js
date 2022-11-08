import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'
import MainView from './components/MainView'
import Exercise from './components/Exercise'

export default function App() {

  const[exercise, setExercise] = useState(false) 

  return (
    <View style={AppStyles.container}>
      {
        exercise ?  <Exercise /> : <MainView/>
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
