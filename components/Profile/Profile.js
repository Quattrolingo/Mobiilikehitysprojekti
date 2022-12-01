import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import { useEffect, useState } from 'react'
import { Provider } from '@react-native-material/core'
import Settings from './../Settings/Settings'
import Colors from '../../assets/Colors';

export default function Profile(props) {

  const [settingsVisible, setSettingsVisible] = useState(false)

  useEffect(() => {
    if(settingsVisible){
      props.navBarVisibility(false)
    } else {
      props.navBarVisibility(true)
    }
  }, [settingsVisible])
  
  return (
    <Provider>
      <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White}, ProfileStyles.container]}>
        {
          settingsVisible ? 
          <Settings
            languageData={props.languageData}
            appSettings={props.appSettings}
            modifyAppSettings={props.modifyAppSettings}
            UiTranslations={props.UiTranslations}
            navBarVisibility={props.navBarVisibility}
            setSettingsVisible={setSettingsVisible}/>
          :
          <View style={{paddingTop: 55}}>
            <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White}, ProfileStyles.header]}>
              <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.Black}, ProfileStyles.headerText]}>
                {props.UiTranslations.profile.heading}
              </Text>
              <TouchableOpacity style={ProfileStyles.settingsIconContainer} onPress={() => setSettingsVisible(!settingsVisible)}>
                <Image style={ProfileStyles.settingsIcon} source={require('./../../data/images/settings_icon.png')} />
              </TouchableOpacity>
            </View>
            <Text>This is PROFILE</Text>
          </View>
        }
        
      </View>
    </Provider>
  )
}
  
const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
  },
  header: {
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: 3,
    width: '100%',
    height: 55,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  headerText: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  settingsIconContainer: {
    position: 'absolute',
    right: 20,
  },
  settingsIcon: {      
    height: 32,
    width: 32
  },
  settingsSaveBtn: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  settingsScrollView: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    padding: 30
  },
  settingsGroupHeader: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5
  },
  settingsGroupContainer: {
    width: '100%',
    borderColor: Colors.LightGrey,
    borderWidth: 3,
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  settingsItem: {
    paddingLeft: 5,
    paddingRight: 5,
    marginTop: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: Colors.LightGrey,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  settingsItemText: {
    fontSize: 20
  },
  settingsItemValue: {
    fontSize: 20
  },
  settingsThemeColorSquare: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: Colors.White,
    borderRadius: 5
  },
  singleThemeItem: {
    margin: 20,
    width: 60,
    height: 60,
  },
  colorThemeDialog: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
})