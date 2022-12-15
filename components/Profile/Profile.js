import { StyleSheet, Text, View, Image, TouchableOpacity, StatusBar } from 'react-native'
import { useEffect, useState } from 'react'
import { Provider } from '@react-native-material/core'
import Settings from './../Settings/Settings'
import CreateProfile from './CreateProfile'
import UpgradeProfile from './UpgradeProfile'
import Colors from '../../assets/Colors'

export default function Profile(props) {

  const [currentProfileView, setCurrentProfileView] = useState("profile")

  useEffect(() => {
    if(currentProfileView == "settings" || currentProfileView == "createProfile"){
      props.navBarVisibility(false)
    } else {
      props.navBarVisibility(true)
    }
  }, [currentProfileView])
  
  return (
    <Provider>
      <StatusBar backgroundColor={props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.DarkTheme : Colors.White}/>
      <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkTheme : Colors.White}, ProfileStyles.container]}>
        {
          currentProfileView == "settings" ? 
          <Settings
            languageData={props.languageData}
            appSettings={props.appSettings}
            modifyAppSettings={props.modifyAppSettings}
            UiTranslations={props.UiTranslations}
            navBarVisibility={props.navBarVisibility}
            setCurrentProfileView={setCurrentProfileView}
            currentProfileView={currentProfileView}
            setCurrentView={props.setCurrentView}
            accountType={props.accountType}
            accountEmail={props.accountEmail}
            deleteAppData={props.deleteAppData}/>

          : currentProfileView == "profile" ?
          <View style={{paddingTop: 55}}>
            <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, ProfileStyles.header]}>
              <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkerGrey}, ProfileStyles.headerText]}>
                {props.UiTranslations.profile.heading}
              </Text>
              <TouchableOpacity style={ProfileStyles.settingsIconContainer} activeOpacity={0.5} onPress={() => setCurrentProfileView((currentProfileView !== "settings" ? "settings" : "profile"))}>
                <Image style={ProfileStyles.settingsIcon} source={require('./../../data/images/settings_icon.png')} />
              </TouchableOpacity>
            </View>
            <View style={ProfileStyles.profileContainer}>
              {
                props.accountEmail.length < 1 ?
                <View style={{width: '90%'}}>
                  <Text style={[{color: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.White : Colors.Black}, ProfileStyles.youNeedAProfile]}>{props.UiTranslations.profile.youNeedAProfile}</Text>
                  <TouchableOpacity  activeOpacity={0.5}
                                     onPress={() => setCurrentProfileView("createProfile")}
                                     style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkGrey : props.appSettings.themeColorOptions.background},
                                            ProfileStyles.largeBtn]}>
                    <Text style={ProfileStyles.largeBtnText}>{props.UiTranslations.settings.createAccount}</Text>
                  </TouchableOpacity>
                </View>                  
                :
                  <View>
                    <Text>{props.accountEmail}</Text>
                    <Text>{props.accountType}</Text>
                  </View>
              }
            </View>            
          </View> 

          : currentProfileView == "createProfile" ?
          <CreateProfile
            appSettings={props.appSettings}
            UiTranslations={props.UiTranslations}
            setCurrentProfileView={setCurrentProfileView}  
            modifyAccountEmail={props.modifyAccountEmail} />

          :
          
          <UpgradeProfile
            appSettings={props.appSettings}
            UiTranslations={props.UiTranslations}
            setCurrentProfileView={setCurrentProfileView}
            accountType={props.accountType}          
            modifyAccountType={props.modifyAccountType} />
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
  },
  profileContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  youNeedAProfile: {
    textAlign: 'center',
    fontSize: 17,
  },
  largeBtn: {
    marginTop: 40,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,      
    borderRadius: 15,
    width: '100%'
  },
  largeBtnText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.White
  }
})