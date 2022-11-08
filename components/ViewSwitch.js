import { StyleSheet, Text, View } from 'react-native'

export default function ViewSwitch({view}) {
  
    return (
      <View style={ViewSwitchStyles.container}>
        <Text onPress={() => view("ExerciseScrollView")}>exercises</Text>
        <Text onPress={() => view("Achievements")}>achievements</Text>
        <Text onPress={() => view("Profile")}>profile</Text>
      </View>
    );
  }
  
  const ViewSwitchStyles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 70,
    },
  });