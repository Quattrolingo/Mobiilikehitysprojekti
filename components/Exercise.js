import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

export default function Exercise() {
  
    return (
      <View style={ExerciseStyles.container}>
        <Text>This is Exercise</Text>
      </View>
    );
  }
  
  const ExerciseStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });