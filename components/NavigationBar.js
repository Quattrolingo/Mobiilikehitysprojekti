import { StyleSheet, View, Image, Pressable } from 'react-native'
import Colors from '../assets/Colors'

export default function NavigationBar({setView, view, appSettings}) {
  
    return (
      <View style={[{backgroundColor: (appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White}, NavBarStyles.container]}>
        <Pressable onPress={() => setView("ExerciseScrollView")}>
          {
            (view == "ExerciseScrollView") ?
            <View style={NavBarStyles.navbarBtnActive}>
              <Image   
              style={NavBarStyles.navbarBtn}           
              source={require('./../data/images/navigation_bar_home.png')} />
            </View>
            :
            <View style={[
                    {backgroundColor: (appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White},
                    {borderColor: (appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White},
                    NavBarStyles.navbarBtnInactive
                  ]}>
              <Image   
              style={NavBarStyles.navbarBtn}           
              source={require('./../data/images/navigation_bar_home.png')} />
            </View>
          }          
        </Pressable>
        <Pressable onPress={() => setView("Achievements")}>
          {
            (view == "Achievements") ?
            <View style={NavBarStyles.navbarBtnActive}>
              <Image
              style={NavBarStyles.navbarBtn}
              source={require('./../data/images/navigation_bar_achievements.png')} />
            </View>
            :
            <View style={[
                    {backgroundColor: (appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White},
                    {borderColor: (appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White},
                    NavBarStyles.navbarBtnInactive
                  ]}>
              <Image
              style={NavBarStyles.navbarBtn}
              source={require('./../data/images/navigation_bar_achievements.png')} />
            </View>
          }          
        </Pressable>
        <Pressable onPress={() => setView("Profile")}>
          {
            (view == "Profile") ?
            <View style={NavBarStyles.navbarBtnActive}>
              <Image
              style={NavBarStyles.navbarBtn}
              source={require('./../data/images/navigation_bar_profile.png')} />
            </View>
            :
            <View style={[
                    {backgroundColor: (appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White},
                    {borderColor: (appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White},
                    NavBarStyles.navbarBtnInactive
                  ]}>
              <Image
              style={NavBarStyles.navbarBtn}
              source={require('./../data/images/navigation_bar_profile.png')} />
            </View>
          }          
        </Pressable >
        <Pressable onPress={() => setView("Dictionary")}>
          {
            (view == "Dictionary") ?
            <View style={NavBarStyles.navbarBtnActive}>
              <Image
              style={NavBarStyles.navbarBtn}
              source={require('./../data/images/navigation_bar_dictionary.png')} />
            </View>
            :
            <View style={[
                    {backgroundColor: (appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White},
                    {borderColor: (appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White},
                    NavBarStyles.navbarBtnInactive
                  ]}>
              <Image
              style={NavBarStyles.navbarBtn}
              source={require('./../data/images/navigation_bar_dictionary.png')} />
            </View>
          }
          
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
      borderTopColor: Colors.LightGrey,
    },
    navbarBtn: {
      height: 35,
      width: 35,
    },
    navbarBtnActive: {
      backgroundColor: '#f5e6c4',
      padding: 5,
      borderRadius: 15,
      borderWidth: 2,
      borderColor: '#fad47d' 
    },
    navbarBtnInactive: {
      padding: 5,
      borderWidth: 2,
    }
  });