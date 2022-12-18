import { StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid } from 'react-native'
import { useState } from 'react'
import Colors from '../../assets/Colors'

export default function CreateProfile(props) {

    const [emailInput, setEmailInput] = useState("")

    const saveAccount = () => {
        props.modifyAccountEmail(emailInput)
        props.setCurrentProfileView("profile")
        ToastAndroid.show(props.UiTranslations.profile.profileAdded, ToastAndroid.SHORT)
    }

    return (
        <View>
            <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, CreateProfileStyles.header]}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkerGrey}, CreateProfileStyles.headerText]}>
                    {props.UiTranslations.profile.createProfile}
                </Text>
            </View>

            <View style={{paddingTop: 55, height: '100%'}}>
                <View style={CreateProfileStyles.contentContainer}>
                    <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, CreateProfileStyles.enterEmailText]}>{props.UiTranslations.profile.enterEmail}</Text>            
                    <View style={CreateProfileStyles.inputContainer}>                
                        <TextInput
                            style={[{backgroundColor: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.Grey : Colors.ExtremeLightGrey,
                                     color: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.White : Colors.Black}, CreateProfileStyles.emailInput]}
                            value={emailInput}
                            onChangeText={input => setEmailInput(input)}
                            placeholder={props.UiTranslations.profile.enterEmailHint}
                            placeholderTextColor={props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.ExtremeLightGrey : Colors.Grey} />

                    </View>
                </View>       
                    <TouchableOpacity activeOpacity={0.5}
                                    style={[{backgroundColor: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.DarkGrey : Colors.Grey}, CreateProfileStyles.btnCancel]}
                                    onPress={() => props.setCurrentProfileView("profile")}>
                        <Text style={CreateProfileStyles.btnText}>{props.UiTranslations.settings.cancel}</Text>
                    </TouchableOpacity>
                    {
                        emailInput.length < 5 ?
                        <View style={{width: '40%'}}/>
                        :
                        <TouchableOpacity activeOpacity={0.5}
                                    style={[{backgroundColor: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.DarkGrey : props.appSettings.themeColorOptions.background}, CreateProfileStyles.btnContinue]}
                                    onPress={() => saveAccount()}>
                            <Text style={[CreateProfileStyles.btnText]}>{props.UiTranslations.exercise.continue}</Text>
                        </TouchableOpacity>
                    }
            </View>
        </View>
        
    )
}
  
const CreateProfileStyles = StyleSheet.create({    
    header: {
        borderBottomColor: Colors.LightGrey,
        borderBottomWidth: 3,
        width: '100%',
        height: 55,
        position: 'absolute',
        top: 0,
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 100
    },
    headerText: {
        fontSize: 22,
        fontWeight: 'bold',
    },
    contentContainer: {
        position: 'absolute',
        justifyContent: 'center',
        top: 0,
        bottom: 0,
        width: '90%',
        alignSelf: 'center'
    },
    inputContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    enterEmailText: {
        fontSize: 19,
        marginBottom: 15
    },
    emailInput: {       
        borderWidth: 3,
        borderColor: Colors.LightGrey,
        borderRadius: 15,
        height: 50,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
        fontSize: 18
    },
    btnCancel: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 15,
        position: 'absolute',
        left: 20, 
        bottom: 20,
        width: '40%'
    },
    btnContinue: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        borderRadius: 15,
        position: 'absolute',
        bottom: 20, 
        right: 20,
        width: '40%'
    },
    btnText: {
        textAlign: 'center',
        fontSize: 21,
        fontWeight: 'bold',
        color: Colors.White
    },
})