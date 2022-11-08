import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

export default function Achievements() {
  
    return (
      <View style={AchievementStyles.container}>
        <Text>This is Achievements</Text>
      </View>
    );
  }
  
  const AchievementStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: 'lightgreen',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });