import { StyleSheet, Text, View, TouchableOpacity, ScrollView, ToastAndroid, Image } from 'react-native'
import { useEffect, useState } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogActions, Button, Provider } from '@react-native-material/core'
import Colors from '../../assets/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function Profile(props) {

  const [dialogVisible, setDialogVisible] = useState(false) 
  const [dialogContent, setDialogContent] = useState(null)
  let madebyMsg = "Made with <3 by Quattrolingo team"

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
        <View style={SettingsStyles.colorThemeDialog}>
          <TouchableOpacity style={[{backgroundColor: Colors.DarkYellow}, SettingsStyles.singleThemeItem]}
                            activeOpacity={0.5}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.DarkYellow
                              }
                            })), setAppBackgroundcolor(Colors.DarkYellow), setDialogVisible(false)}} />
          <TouchableOpacity style={[{backgroundColor: Colors.LightPink}, SettingsStyles.singleThemeItem]}
                            activeOpacity={0.5}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.LightPink
                              }
                            })), setAppBackgroundcolor(Colors.LightPink), setDialogVisible(false)}} />
          <TouchableOpacity style={[{backgroundColor: Colors.SummerSky}, SettingsStyles.singleThemeItem]}
                            activeOpacity={0.5}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.SummerSky
                              }
                            })), setAppBackgroundcolor(Colors.SummerSky), setDialogVisible(false)}} />
          <TouchableOpacity style={[{backgroundColor: Colors.DarkTheme}, SettingsStyles.singleThemeItem]}
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

  const deleteAppData = () => {
    props.deleteAppData()
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
  }

  const changeLanguageDialog = () => {
    setDialogContent(<>
      <DialogHeader title={props.UiTranslations.settings.chooseLanguageCourse} />
          <DialogContent>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[SettingsStyles.chooseLanguageDialogItem]}
              onPress={() => {setDialogVisible(false), setDialogContent(null), props.setCourseDataName("english")}}>
            <Image
              style={{height: 30, width: 47, marginRight: 10}}
              source={require('./../../data/images/course_flag_english.png')}
              resizeMode="cover"/>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: Colors.Grey}}>Englanti</Text>
          </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[SettingsStyles.chooseLanguageDialogItem]}
              onPress={() => {setDialogVisible(false), setDialogContent(null), props.setCourseDataName("swedish")}}>
            <Image
              style={{height: 30, width: 47, marginRight: 10}}
              source={require('./../../data/images/course_flag_swedish.png')}
              resizeMode="cover"/>
            <Text style={{fontWeight: 'bold', fontSize: 18, color: Colors.Grey}}>Ruotsi</Text>
          </TouchableOpacity>
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
      <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkTheme : Colors.White}, SettingsStyles.container]}>
        <Dialog visible={dialogVisible} onDismiss={() => {setDialogVisible(false), setDialogContent(null)}}>
          { dialogContent }
        </Dialog>

        <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, SettingsStyles.header]}>
          <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkerGrey}, SettingsStyles.headerText]}>
            {props.UiTranslations.settings.heading}
          </Text>
          <TouchableOpacity style={SettingsStyles.settingsIconContainer} activeOpacity={0.5} onPress={() => props.setCurrentProfileView("profile")}>
            <Text style={[
                    {color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : props.appSettings.themeColorOptions.background},
                    SettingsStyles.settingsSaveBtn ]}>{props.UiTranslations.settings.save}</Text>
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={SettingsStyles.settingsScrollView}>
            <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkGrey}, SettingsStyles.settingsGroupHeader]}>
              {props.UiTranslations.settings.general}
            </Text>

            <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, SettingsStyles.settingsGroupContainer]}>
              <View style={SettingsStyles.settingsItem}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, SettingsStyles.settingsItemText]}>
                  {props.UiTranslations.settings.theme}
                </Text>
                <TouchableOpacity style={[{backgroundColor: props.appSettings.themeColorOptions.background}, SettingsStyles.settingsThemeColorSquare]}
                                  activeOpacity={0.5}
                                  onPress={() => changeThemeDialog()}/>
              </View>

              <View style={SettingsStyles.settingsItem}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, SettingsStyles.settingsItemText]}>
                  {props.UiTranslations.settings.languageCourse}
                </Text>
                <TouchableOpacity onPress={() => changeLanguageDialog()} activeOpacity={0.5}>
                  <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : props.appSettings.themeColorOptions.background},
                                SettingsStyles.settingsItemValue]
                              }>
                    {props.languageData.nativeCourseName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkGrey}, SettingsStyles.settingsGroupHeader]}>
              {props.UiTranslations.settings.account}
            </Text>

            <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, SettingsStyles.settingsGroupContainer]}>
              {
                props.accountEmail.length < 1 ?
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, SettingsStyles.settingsNoEmailFound]}>
                  {props.UiTranslations.settings.noAccountFound}
                </Text>
                :
                <>
                  <View style={SettingsStyles.settingsItem}>
                    <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, SettingsStyles.settingsItemText]}>
                      {props.UiTranslations.settings.email}
                    </Text>
                    <TouchableOpacity onPress={() => {}} activeOpacity={0.5}>
                      <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : props.appSettings.themeColorOptions.background},
                                    SettingsStyles.settingsItemValue]
                                  }>
                        {props.accountEmail}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={SettingsStyles.settingsItem}>
                    <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, SettingsStyles.settingsItemText]}>
                      {props.UiTranslations.settings.accountType}
                    </Text>
                    <TouchableOpacity onPress={() => props.setCurrentProfileView("upgradeProfile")} activeOpacity={0.5}>
                      <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : props.appSettings.themeColorOptions.background},
                                    SettingsStyles.settingsItemValue]
                                  }>
                        {props.accountType == 'student' ? props.UiTranslations.settings.student : props.UiTranslations.settings.consumer}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </>
              }      
            </View>

            {
              props.accountType == 'consumer' && props.accountEmail.length == 0 ?
              <TouchableOpacity style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, SettingsStyles.largeBtn]}
                                activeOpacity={0.5} onPress={() => props.setCurrentProfileView("createProfile")}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkGrey}, SettingsStyles.largeBtnText]}>
                  {props.UiTranslations.settings.createAccount}
                </Text>
              </TouchableOpacity>

                : props.accountType == 'consumer' ?
                <TouchableOpacity style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, SettingsStyles.largeBtn]}
                                activeOpacity={0.5} onPress={() => props.setCurrentProfileView("upgradeProfile")}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkGrey}, SettingsStyles.largeBtnText]}>
                  {props.UiTranslations.settings.editAccount}
                </Text>
              </TouchableOpacity>

              :
              <></>
            }            

            <TouchableOpacity style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, SettingsStyles.largeBtn]}
                              activeOpacity={0.5} onPress={() => deleteAppDataWarningDialog()}>
              <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkGrey}, SettingsStyles.largeBtnText]}>
                {props.UiTranslations.settings.deleteAppData}
              </Text>
            </TouchableOpacity>           

          </View>
        </ScrollView>
        <Text style={{alignSelf: 'center', position: 'absolute', bottom: 0, color: Colors.Grey}}>{madebyMsg}</Text>
      </View>
    </Provider>
  )
}
  
const SettingsStyles = StyleSheet.create({
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
  chooseLanguageDialogItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    margin: 10
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
    borderRadius: 15,
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
    fontSize: 20,
    marginRight: 20
  },
  settingsItemValue: {
    fontSize: 20,
    maxWidth: 170,
    overflow: "hidden",
    maxHeight: 30
  },
  settingsThemeColorSquare: {
    width: 25,
    height: 25,
    borderWidth: 1,
    borderColor: Colors.White,
    borderRadius: 7
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
  largeBtn: {
    marginTop: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,      
    borderRadius: 15,
    borderWidth: 3,
    borderColor: Colors.LightGrey,
    width: '100%'
  },
  largeBtnText: {
    fontSize: 17,
    fontWeight: 'bold'
  },
  settingsNoEmailFound: {
    fontSize: 20,
    padding: 5,
  }
})