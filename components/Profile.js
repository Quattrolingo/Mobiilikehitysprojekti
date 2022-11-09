import { StyleSheet, Text, View } from 'react-native'
import { useState } from 'react'

export default function Profile() {
  
    return (
      <View style={ProfileStyles.container}>
        <Text>This is PROFILE</Text>
      </View>
    );
  }
  
  const ProfileStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: 'lightgreen',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });