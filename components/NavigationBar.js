import { StyleSheet, View, Image, Pressable } from 'react-native'

export default function NavigationBar({view}) {
  
    return (
      <View style={NavBarStyles.container}>
        <Pressable onPress={() => view("ExerciseScrollView")}>
          <Image
            style={NavBarStyles.navbarBtn}
            source={require('./../data/images/navigation_bar_home.png')} />
        </Pressable>
        <Pressable onPress={() => view("Achievements")}>
          <Image
            style={NavBarStyles.navbarBtn}
            source={require('./../data/images/navigation_bar_achievements.png')} />
        </Pressable>
        <Pressable onPress={() => view("Profile")}>
          <Image
            style={NavBarStyles.navbarBtn}
            source={require('./../data/images/navigation_bar_profile.png')} />
        </Pressable >
        <Pressable onPress={() => view("Dictionary")}>
          <Image
            style={NavBarStyles.navbarBtn}
            source={require('./../data/images/navigation_bar_dictionary.png')} />
        </Pressable>
      </View>
    );
  }
  
  const NavBarStyles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-around',
      alignItems: 'center',
      height: 70,
      borderTopWidth: 2,
      borderTopColor: 'lightgrey'
    },
    navbarBtn: {
      height: 35,
      width: 35
    }
  });