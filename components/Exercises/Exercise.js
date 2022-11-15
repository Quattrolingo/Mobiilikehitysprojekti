import { StyleSheet, Text, View, BackHandler } from 'react-native'
import { useEffect, useState } from 'react'

export default function Exercise(props) {

    console.log(props.exercise)
    const [contentToRender, setContentToRender] = useState(
        <View>
            <Text>Starting exercise</Text>
        </View>
    )

    const handleBackButtonClick = () => {
        props.setExercise(null)
        return true
    }

    useEffect(() => {
        setTimeout(() => {
            setContentToRender(
                <View style={AchievementStyles.container}>
                    <Text>This is Exercise</Text>
                    <Text onPress={() => props.setExercise(null)} style={{marginTop: 100}}>End</Text>
                </View>                
            )
          }, 3000)

          BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)
          return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick)
          }
    }, [])
  
    return ( <>{contentToRender}</> )
  }
  
  const AchievementStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: 'lightblue',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });