import { StyleSheet, Text, View, BackHandler, Animated, Image, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import ProgressBar from './ProgressBar'
import SingleQuestion from './SingleQuestion'
import Colors from './../../assets/Colors'

export default function Exercise(props) {

    const [currentExerciseUniqueID, setCurrentExerciseUniqueID] = useState(props.exercise.uniqueID)
    const [questionsDone, setQuestionsDone] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(props.exercise.questions[questionsDone])    
    const [strikeStatus, setStrikeStatus] = useState(0)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const intervalRef = useRef()
    const [seconds, setSeconds] = useState(0)
    const [appColor, setAppCOlor] = useState(props.appSettings.themeColorOptions.background)
    const [progressBar, setProgressBar] = useState({
        maxState: props.exercise.questions.length,
        currentState : questionsDone,
        correctAnswers: strikeStatus
    })
    
    const fadeAnimation = useRef(new Animated.Value(0)).current
        const fadeIn = () => {
        Animated.timing(fadeAnimation, {
            toValue: 1,
            duration: 1000,
            useNativeDriver: true
        }).start()
    }

    const [contentToRender, setContentToRender] = useState(
        <View style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkTheme : Colors.White}, ExerciseStyles.startUpScreen]} >
            <Animated.Text style={[{color: (appColor == Colors.DarkTheme) ? Colors.White : Colors.Black, opacity: fadeAnimation, fontSize: 20}]}>
                {props.UiTranslations.exercise.startingExercise}
            </Animated.Text>
        </View>
    )

    const handleBackButtonClick = (boolean) => {
        if(boolean == true){
            props.setExercise(null)            
        } else {
            Alert.alert(
                props.UiTranslations.exercise.quitExerciseTitle,
                props.UiTranslations.exercise.quitExerciseMessage,
                [
                    {
                        text: props.UiTranslations.exercise.quitExerciseBtn,
                        onPress: () => props.setExercise(null)
                    },
                    {
                        text: props.UiTranslations.exercise.stayInExerciseBtn,
                        onPress: () => {},
                        style: "cancel"                        
                    }
                ]
            )
        }        
        return true
    }

    const getSuccessRate = () => {
        return parseInt(100 / props.exercise.questions.length *  correctAnswers)
    }

    const getCompletionTime = () => {
        let hours = Math.floor(seconds / 3600)
        let minutes = Math.floor(seconds / 60)
        if(hours >= 1){
            return hours.toString() + "h"
        } else if(minutes >= 1){
            return minutes.toString() + "min"
        } else {
            return seconds.toString() + "sec"
        }
    }

    const getCollectedXP = () => {        
        if(parseInt(parseFloat(getSuccessRate()).toFixed(2) / 100) == 1){ // if success rate 100%, return points equal to 2x the amount of questions completed
            return props.exercise.questions.length * 2
        } else { // If success rate lower than 100%, return the sum of the amount of questions and the success rate converted to a hundredth part
            return parseInt(props.exercise.questions.length + (parseFloat(getSuccessRate()).toFixed(2) / 10))        
        }
    }

    useEffect(() => {
        setProgressBar(prevState => ({
            ...prevState, // do not update maxState value
            currentState : questionsDone,
            correctAnswers: strikeStatus
        }))
        setCurrentQuestion(props.exercise.questions[questionsDone])
    }, [questionsDone, strikeStatus])

    useEffect(() => {
        if(progressBar.currentState == progressBar.maxState){
            props.setPointsFromLastExercise(getCollectedXP())
        }
    }, [progressBar])

    useEffect(() => {
        const interval = setInterval(() => {setSeconds(seconds => seconds + 1)}, 1000)
        intervalRef.current = interval
        fadeIn()
        setTimeout(() => {
            setContentToRender(<></>)
        }, 2000)

        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick)
            clearInterval(interval)
        }             
    }, [props])

    return (<>
        {/* contentToRender */}
        <View style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkTheme : Colors.White}, ExerciseStyles.container]}>
            {
                (progressBar.currentState >= progressBar.maxState)?
                <></>
                :
                <View style={ExerciseStyles.exerciseHeader}>
                    <TouchableOpacity activeOpacity={0.5} onPress={() => handleBackButtonClick()}>  
                        <Text style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.LightGrey : Colors.White}, ExerciseStyles.returnBtn]}>X</Text>
                    </TouchableOpacity>  
                    <View style={ExerciseStyles.progressBar}>
                        <ProgressBar data={progressBar}/>
                    </View>                              
                    <Text style={{width: 30}}></Text>  
                </View>
            }
            <GestureHandlerRootView style={ExerciseStyles.exerciseContainer}>
                {
                    (progressBar.currentState < progressBar.maxState)?
                    <SingleQuestion
                        questionCompleted={() => setQuestionsDone(questionsDone + 1)}
                        correctlyAnswered={() => setStrikeStatus(prevState => prevState + 1)}
                        incorrectAnswer={() => setStrikeStatus(0)}
                        questionData={currentQuestion} 
                        appSettings={props.appSettings}
                        UiTranslations={props.UiTranslations.exercise}
                        incrementCorrectAnswers={() => setCorrectAnswers(prevState => prevState + 1)}/>

                    :

                    <View style={ExerciseStyles.endScreen} onLayout={(e) => { clearInterval(intervalRef.current); props.exerciseCompleted() }}>
                        <Text style={[{color: (appColor == Colors.DarkTheme) ? Colors.White : appColor}, ExerciseStyles.completedText]}>
                            {props.UiTranslations.exercise.exerciseCompleted}
                        </Text>

                        <View style={ExerciseStyles.feedbackContainer}>                            
                            <View style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White},
                                          {borderColor: (appColor == Colors.DarkTheme) ? Colors.LightGrey : appColor}, 
                                          ExerciseStyles.feedbackContainerItem]}>                                
                                <Text style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkThemeSecondary : appColor},
                                              {color: (appColor == Colors.DarkTheme) ? Colors.White : Colors.Black}, 
                                              ExerciseStyles.feedbackItemHeading]}>
                                    {props.UiTranslations.exercise.successRate}
                                </Text>
                                <View style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkGrey : Colors.White}, ExerciseStyles.feedbackContainerItemInner]}>
                                    <Image style={ExerciseStyles.feedbackItemImage} source={require('./../../data/images/aim_icon_color.png')}/>
                                    <Text style={[{color: (appColor == Colors.DarkTheme) ? Colors.White : Colors.Black}, ExerciseStyles.feedbackItemText]}>
                                        {getSuccessRate()}%
                                    </Text>
                                </View>
                            </View> 

                            <View style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White},
                                          {borderColor: (appColor == Colors.DarkTheme) ? Colors.LightGrey : appColor},                                
                                          ExerciseStyles.feedbackContainerItem]}>                                
                                <Text style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkThemeSecondary : appColor},
                                              {color: (appColor == Colors.DarkTheme) ? Colors.White : Colors.Black}, 
                                              ExerciseStyles.feedbackItemHeading]}>
                                    {props.UiTranslations.exercise.timePassed}
                                </Text>
                                <View style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkGrey : Colors.White}, ExerciseStyles.feedbackContainerItemInner]}>
                                    <Image style={ExerciseStyles.feedbackItemImage} source={require('./../../data/images/timer_icon_color.png')}/>
                                    <Text style={[{color: (appColor == Colors.DarkTheme) ? Colors.White : Colors.Black}, ExerciseStyles.feedbackItemText]}>
                                        {getCompletionTime()}
                                    </Text>
                                </View>
                            </View> 

                            <View style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkThemeSecondary : Colors.White},
                                          {borderColor: (appColor == Colors.DarkTheme) ? Colors.LightGrey : appColor}, 
                                          ExerciseStyles.feedbackContainerItem]}>                                
                                <Text style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkThemeSecondary : appColor},
                                              {color: (appColor == Colors.DarkTheme) ? Colors.White : Colors.Black}, 
                                              ExerciseStyles.feedbackItemHeading]}>
                                    {props.UiTranslations.exercise.collectedXp}
                                </Text>
                                <View style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.DarkGrey : Colors.White}, ExerciseStyles.feedbackContainerItemInner]}>
                                    <Image style={ExerciseStyles.feedbackItemImage} source={require('./../../data/images/points_icon_star.png')}/>
                                    <Text style={[{color: (appColor == Colors.DarkTheme) ? Colors.White : Colors.Black}, ExerciseStyles.feedbackItemText]}>
                                        {getCollectedXP()}
                                    </Text>
                                </View>                                
                            </View>

                        </View>
                        <TouchableOpacity style={[{backgroundColor: (appColor == Colors.DarkTheme) ? Colors.LightGrey : appColor}, ExerciseStyles.btnExit]}
                                        activeOpacity={0.5} onPress={() => handleBackButtonClick(true)}>
                            <Text style={[{color: (appColor == Colors.DarkTheme) ? Colors.Black : Colors.White}, ExerciseStyles.btnExitText]}>{props.UiTranslations.exercise.continue}</Text>
                        </TouchableOpacity>
                    </View>
                }                
            </GestureHandlerRootView>
        </View>
    </>)
}
  
const ExerciseStyles = StyleSheet.create({
    btnExit: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50,      
        borderRadius: 15,
        width: '90%'
    },
    btnExitText: {
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold'
    },
    container: {
      flex: 1,
      width: "100%",
      justifyContent: 'space-between',
      paddingTop: 15,
      paddingBottom: 30, //ongelmallinen ???????      
      paddingLeft: 20,
      paddingRight: 20
    },
    startUpScreen: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        zIndex: 1000,
        width: '100%',
        height: '100%'
    },
    exerciseHeader: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    returnBtn: {
        textAlign: 'center',
        fontSize: 21,
        borderWidth: 2,
        borderColor: "black",
        borderRadius: 100,
        height: 30,
        width: 30
    },
    progressBar: {
        width: '75%',
        height: 30
    },
    exerciseContainer: {
        marginTop: 30
    },
    endScreen: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '100%'
    },
    completedText: {
        width: 200,
        textAlign: 'center',
        fontSize: 40,
        fontWeight: 'bold',
    },
    feedbackItemHeading: {
        fontSize: 14,
        fontWeight: 'bold',
        width: '100%',
        padding: 10,
        borderTopLeftRadius: 7,
        borderTopRightRadius:7,
        textAlign: 'center'        
    },
    feedbackContainer: {
        display: 'flex',
        flexDirection: 'column'
    },
    feedbackContainerItem: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: 30,
        borderWidth: 2,
        borderRadius: 10,
    },
    feedbackContainerItemInner: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        padding: 10,
        borderBottomLeftRadius: 7,
        borderBottomRightRadius:7
    },
    feedbackItemImage: {
        height: 30,
        width: 30,
        marginRight: 10
    },
    feedbackItemText: {
        fontSize: 17,
        fontWeight: 'bold'
    }
})