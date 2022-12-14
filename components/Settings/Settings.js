import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid } from 'react-native'
import { useEffect, useState } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogActions, Button, Provider } from '@react-native-material/core'
import Colors from '../../assets/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile(props) {

  const [dialogVisible, setDialogVisible] = useState(false) 
  const [dialogContent, setDialogContent] = useState(null)

  const setAppBackgroundcolor = async (param) => {
    try{
      await AsyncStorage.setItem('@theme_backgroundColor', param)
    } catch (e) {}
  }
  const setAppSoundState = async (param) => {
    try{
      await AsyncStorage.setItem('@soundSettings', param)
    } catch (e) {}
  }

  const changeThemeDialog = () => {
    setDialogContent(<>
      <DialogHeader title={props.UiTranslations.settings.theme} />
      <DialogContent>
        <View style={ProfileStyles.colorThemeDialog}>
          <TouchableOpacity style={[{backgroundColor: Colors.DarkYellow}, ProfileStyles.singleThemeItem]}
                            activeOpacity={0.5}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.DarkYellow
                              }
                            })), setAppBackgroundcolor(Colors.DarkYellow), setDialogVisible(false)}} />
          <TouchableOpacity style={[{backgroundColor: Colors.LightPink}, ProfileStyles.singleThemeItem]}
                            activeOpacity={0.5}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.LightPink
                              }
                            })), setAppBackgroundcolor(Colors.LightPink), setDialogVisible(false)}} />
          <TouchableOpacity style={[{backgroundColor: Colors.SummerSky}, ProfileStyles.singleThemeItem]}
                            activeOpacity={0.5}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.SummerSky
                              }
                            })), setAppBackgroundcolor(Colors.SummerSky), setDialogVisible(false)}} />
          <TouchableOpacity style={[{backgroundColor: Colors.DarkTheme}, ProfileStyles.singleThemeItem]}
                            activeOpacity={0.5}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.DarkTheme
                              }
                            })), setAppBackgroundcolor(Colors.DarkTheme), setDialogVisible(false)}} />
        </View>
      </DialogContent>
      <DialogActions>
        <Button
          title={props.UiTranslations.settings.cancel}
          compact
          variant="text"
          color={props.appSettings.themeColorOptions.background}
          onPress={() => {setDialogVisible(false), setDialogContent(null)}} />
      </DialogActions>
    </>)
    setDialogVisible(!dialogVisible)
  }

  const deleteAppData = async () => {
    try {
      await AsyncStorage.setItem('@theme_backgroundColor', Colors.DarkYellow)      
      await AsyncStorage.removeItem('@soundSettings')
      await AsyncStorage.removeItem('@completed_exercises')
      props.modifyAppSettings(prevState => ({
        ...prevState,
        themeColorOptions: {
          background: Colors.DarkYellow
        }
      }))
      props.navBarVisibility(true)
      props.setCurrentView("ExerciseScrollView")
      ToastAndroid.show(
        props.UiTranslations.settings.userDataDeleted,
        ToastAndroid.LONG
    )
    } catch (e) {
    }    
  }

  const changeLanguageDialog = () => {
    setDialogContent(<>
      <DialogHeader title={props.UiTranslations.settings.languageCourse} />
      <DialogContent>
        <Text>nothing here ¯\_(ツ)_/¯</Text>
      </DialogContent>
      <DialogActions>
        <Button title={props.UiTranslations.settings.cancel}
          compact
          variant="text"
          color={props.appSettings.themeColorOptions.background}
          onPress={() => {setDialogVisible(false), setDialogContent(null)}} />
      </DialogActions>
    </>)
    setDialogVisible(!dialogVisible)
  }

  const deleteAppDataWarningDialog = () => {
    setDialogContent(<>
      <DialogHeader title={props.UiTranslations.settings.deleteAppDataDialogTitle} />
      <DialogContent>
        <Text>{props.UiTranslations.settings.deleteAppDataDialogMessage}</Text>
      </DialogContent>
      <DialogActions>
        <Button title={props.UiTranslations.settings.yesBtn}
          compact
          variant="text"
          color={Colors.Red}
          onPress={() => {setDialogVisible(false), setDialogContent(null), deleteAppData()}} />
          <Button title={props.UiTranslations.settings.noBtn}
          compact
          variant="text"
          color={Colors.Black}
          onPress={() => {setDialogVisible(false), setDialogContent(null)}} />
      </DialogActions>
    </>)
    setDialogVisible(!dialogVisible)
  }

  return (
    <Provider>
      <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkTheme : Colors.White}, ProfileStyles.container]}>
        <Dialog visible={dialogVisible} onDismiss={() => {setDialogVisible(false), setDialogContent(null)}}>
          { dialogContent }
        </Dialog>

        <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, ProfileStyles.header]}>
          <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkerGrey}, ProfileStyles.headerText]}>
            {props.UiTranslations.settings.heading}
          </Text>
          <TouchableOpacity style={ProfileStyles.settingsIconContainer} activeOpacity={0.5} onPress={() => props.setSettingsVisible(false)}>
            <Text style={[
                    {color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : props.appSettings.themeColorOptions.background},
                    ProfileStyles.settingsSaveBtn ]}>{props.UiTranslations.settings.save}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={ProfileStyles.settingsScrollView}>

            <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkGrey}, ProfileStyles.settingsGroupHeader]}>
              {props.UiTranslations.settings.general}
            </Text>

            <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, ProfileStyles.settingsGroupContainer]}>
              <View style={ProfileStyles.settingsItem}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, ProfileStyles.settingsItemText]}>
                  {props.UiTranslations.settings.theme}
                </Text>
                <TouchableOpacity style={[{backgroundColor: props.appSettings.themeColorOptions.background}, ProfileStyles.settingsThemeColorSquare]}
                                  activeOpacity={0.5}
                                  onPress={() => changeThemeDialog()}/>
              </View>

              <View style={ProfileStyles.settingsItem}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, ProfileStyles.settingsItemText]}>
                  {props.UiTranslations.settings.languageCourse}
                </Text>
                <TouchableOpacity onPress={() => changeLanguageDialog()} activeOpacity={0.5}>
                  <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : props.appSettings.themeColorOptions.background},
                                ProfileStyles.settingsItemValue]
                              }>
                    {props.languageData.nativeCourseName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkGrey}, ProfileStyles.settingsGroupHeader]}>Muut</Text>

            <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, ProfileStyles.settingsGroupContainer]}>
              <View style={ProfileStyles.settingsItem}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, ProfileStyles.settingsItemText]} onPress={() => deleteAppDataWarningDialog()}>{props.UiTranslations.settings.deleteAppData}</Text>
              </View>
            </View>   

          </View>           
        </ScrollView>        
      </View>
    </Provider>
  )
}
  
const ProfileStyles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    paddingTop: 55,
  },
  header: {
    borderBottomColor: Colors.LightGrey,
    borderBottomWidth: 3,
    width: '100%',
    height: 55,
    position: 'absolute',
    top: 0,
    alignItems: 'center',
    justifyContent: 'center',
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