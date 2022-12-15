import { StyleSheet, Text, View, TouchableOpacity, TextInput, ToastAndroid, Alert } from 'react-native'
import { useState } from 'react'
import Colors from '../../assets/Colors'

export default function UpgradeProfile(props) {

    const [activationCodeInput, setActivationCodeInput] = useState("")
    const [falseInput, setFalseInput] = useState(false)

    const verifyActivationCode = () => {
        if(activationCodeInput == "111-222-333-444"){
            setActivationCodeInput("")
            props.modifyAccountType("student")
            props.setCurrentProfileView("profile")
            ToastAndroid.show(props.UiTranslations.profile.activationSuccessfulMessage, ToastAndroid.SHORT)
        } else {            
            setFalseInput(true)
            setTimeout(() => {
                setFalseInput(false)
            }, 3000)

        }
    }

    const formatInput = (input) => {
        let newInput = input.split("-").join("")
        if (newInput.length > 0) {
            newInput = newInput.match(new RegExp('.{1,3}', 'g')).join("-")
        }
        setActivationCodeInput(newInput) 
    }

    const showHint = () => {
        Alert.alert(
            "",
            "111-222-333-444",
            [
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ]
        )
    }

    return (
        <View>
            <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White}, UpgradeProfileStyles.header]}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.DarkerGrey}, UpgradeProfileStyles.headerText]}>
                    {props.UiTranslations.profile.upgradeProfile}
                </Text>
            </View>

            <View style={{paddingTop: 55, height: '100%'}}>
                <View style={UpgradeProfileStyles.contentContainer}>
                    <Text style={[{color: (props.appSettings.themeColorOptions.background == Colors.DarkTheme) ? Colors.White : Colors.Black}, UpgradeProfileStyles.enterCodeText]}>
                        {props.UiTranslations.profile.activationCode}
                    </Text>            
                    <View style={UpgradeProfileStyles.inputContainer}>                
                        <TextInput
                            textAlign='center'
                            keyboardType='numeric'
                            maxLength={15}
                            contextMenuHidden={true}
                            style={[{backgroundColor: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.Grey : Colors.ExtremeLightGrey,
                                     color: falseInput ? Colors.Red : props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.White : Colors.Black}, UpgradeProfileStyles.codeInput]}
                            value={activationCodeInput}
                            onChangeText={input => formatInput(input)}
                            placeholder={props.UiTranslations.profile.enterCode}
                            placeholderTextColor={props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.ExtremeLightGrey : Colors.Grey} />     
                    </View>
                    <View style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>                        
                        {
                            falseInput ? <Text style={{color: Colors.Red}}>{props.UiTranslations.profile.incorrectCode}</Text> : <Text />
                        }
                        <Text style={{marginRight: 10, fontWeight: 'bold', color: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.White : Colors.Black}}
                            onPress={() => showHint()}>{props.UiTranslations.profile.activationCodeHint}</Text>
                    </View>
                </View>       
                    <TouchableOpacity activeOpacity={0.5}
                                    style={[{backgroundColor: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.DarkGrey : Colors.Grey}, UpgradeProfileStyles.btnCancel]}
                                    onPress={() => props.setCurrentProfileView("profile")}>
                        <Text style={UpgradeProfileStyles.btnText}>{props.UiTranslations.settings.cancel}</Text>
                    </TouchableOpacity>
                    {
                        activationCodeInput.length < 15 ?
                        <View style={{width: '40%'}}/>
                        :
                        <TouchableOpacity activeOpacity={0.5}
                                    style={[{backgroundColor: props.appSettings.themeColorOptions.background == Colors.DarkTheme ? Colors.DarkGrey : props.appSettings.themeColorOptions.background}, UpgradeProfileStyles.btnContinue]}
                                    onPress={() => verifyActivationCode()}>
                            <Text style={[UpgradeProfileStyles.btnText]}>{props.UiTranslations.exercise.continue}</Text>
                        </TouchableOpacity>
                    }
            </View>
        </View>
        
    )
}
  
const UpgradeProfileStyles = StyleSheet.create({    
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
    enterCodeText: {
        fontSize: 19,
        marginBottom: 15
    },
    codeInput: {       
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