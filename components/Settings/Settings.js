import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { useState } from 'react'
import { Dialog, DialogHeader, DialogContent, DialogActions, Button, Provider } from '@react-native-material/core'
import Colors from '../../assets/Colors';

export default function Profile(props) {

  const [dialogVisible, setDialogVisible] = useState(false) 
  const [dialogContent, setDialogContent] = useState(null)

  const changeThemeDialog = () => {
    setDialogContent(<>
      <DialogHeader title={props.UiTranslations.settings.theme} />
      <DialogContent>
        <View style={ProfileStyles.colorThemeDialog}>
          <TouchableOpacity style={[{backgroundColor: Colors.DarkYellow}, ProfileStyles.singleThemeItem]}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.DarkYellow
                              }
                            })), setDialogVisible(false)}} />
          <TouchableOpacity style={[{backgroundColor: Colors.LightPink}, ProfileStyles.singleThemeItem]}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.LightPink
                              }
                            })), setDialogVisible(false)}} />
          <TouchableOpacity style={[{backgroundColor: Colors.SummerSky}, ProfileStyles.singleThemeItem]}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.SummerSky
                              }
                            })), setDialogVisible(false)}} />
          <TouchableOpacity style={[{backgroundColor: Colors.DarkTheme}, ProfileStyles.singleThemeItem]}
                            onPress={() => {props.modifyAppSettings(prevState => ({
                              ...prevState,
                              themeColorOptions: {
                                background: Colors.DarkTheme
                              }
                            })), setDialogVisible(false)}} />
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
  return (
    <Provider>
      <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White}, ProfileStyles.container]}>
        <Dialog visible={dialogVisible} onDismiss={() => {setDialogVisible(false), setDialogContent(null)}}>
          { dialogContent }
        </Dialog>
            <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.DarkThemeSecondary : Colors.White}, ProfileStyles.header]}>
              <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.DarkerGrey}, ProfileStyles.headerText]}>
                {props.UiTranslations.settings.heading}
              </Text>
              <TouchableOpacity style={ProfileStyles.settingsIconContainer} onPress={() => props.setSettingsVisible(false)}>
                <Text style={[
                        {color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : props.appSettings.themeColorOptions.background},
                        ProfileStyles.settingsSaveBtn ]}>{props.UiTranslations.settings.save}</Text>
              </TouchableOpacity>
            </View>
            <ScrollView>
              <View style={ProfileStyles.settingsScrollView}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.DarkGrey}, ProfileStyles.settingsGroupHeader]}>
                  {props.UiTranslations.settings.general}
                </Text>
                <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.DarkThemeSecondary : Colors.White},
                              ProfileStyles.settingsGroupContainer]}>                
                  <View style={ProfileStyles.settingsItem}>
                    <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.Black}, ProfileStyles.settingsItemText]}>
                      {props.UiTranslations.settings.theme}
                    </Text>
                    <TouchableOpacity style={[{backgroundColor: props.appSettings.themeColorOptions.background}, ProfileStyles.settingsThemeColorSquare]}
                                      onPress={() => changeThemeDialog()}/>
                  </View>
                  <View style={ProfileStyles.settingsItem}>
                    <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.Black}, ProfileStyles.settingsItemText]}>
                      {props.UiTranslations.settings.languageCourse}
                    </Text>
                    <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : props.appSettings.themeColorOptions.background},
                                  ProfileStyles.settingsItemValue]
                                }
                          onPress={() => changeLanguageDialog()}>
                      {props.languageData.nativeCourseName}
                    </Text>
                  </View>
                </View>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.DarkGrey}, ProfileStyles.settingsGroupHeader]}>Muut</Text>
                <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.DarkThemeSecondary : Colors.White},
                              ProfileStyles.settingsGroupContainer]}>
                  <View style={ProfileStyles.settingsItem}>
                    <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.Black}, ProfileStyles.settingsItemText]}>Kiasgasdg</Text>
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