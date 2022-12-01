import { StyleSheet, Text, View, BackHandler, Animated } from 'react-native'
import { useEffect, useState, useRef } from 'react'
import ProgressBar from './ProgressBar'
import SingleQuestion from './SingleQuestion'
import Colors from './../../assets/Colors'

export default function Exercise(props) {

    const [questionsDone, setQuestionsDone] = useState(0)
    const [currentQuestion, setCurrentQuestion] = useState(props.exercise.questions[questionsDone])    
    const [questionsCorrectlyAnswered, setQuestionsCorrectlyAnswered] = useState(0)
    const [progressBar, setProgressBar] = useState({
        maxState: props.exercise.questions.length,
        currentState : questionsDone,
        correctAnswers: questionsCorrectlyAnswered
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
        <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White}, ExerciseStyles.startUpScreen]} >
            <Animated.Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.Black, opacity: fadeAnimation, fontSize: 20}]}>
                {props.UiTranslations.exercise.startingExercise}
            </Animated.Text>
        </View>
    )

    const handleBackButtonClick = () => {
        props.setExercise(null)
        return true
    }

    useEffect(() => {
        setProgressBar(prevState => ({
            ...prevState, // do not update maxState value
            currentState : questionsDone,
            correctAnswers: questionsCorrectlyAnswered
        }))
        setCurrentQuestion(props.exercise.questions[questionsDone])
        if(questionsDone == props.exercise.questions.length){
            console.log("exercise completed")
            setTimeout(() => {
                setQuestionsDone(0)
                setQuestionsCorrectlyAnswered(0)
            }, 3000)            
        }
    }, [questionsDone, questionsCorrectlyAnswered])

    useEffect(() => {
        fadeIn()
        setTimeout(() => {
            setContentToRender(<></>)
        }, 2000)

        BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick)
        return () => {
            BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick)
        }             
    }, [])
    
    return (<>
        { contentToRender }
        <View style={[{backgroundColor: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.DarkTheme : Colors.White}, ExerciseStyles.container]}>            
            <View style={ExerciseStyles.exerciseHeader}>
                <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.Black}, ExerciseStyles.returnBtn]} onPress={() => props.setExercise(null)}>X</Text>
                <View style={ExerciseStyles.progressBar}>
                    <ProgressBar data={progressBar}/>
                </View>                
                <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.Black}, ExerciseStyles.returnBtn]}>X</Text>
            </View>
            <View style={ExerciseStyles.exerciseContainer}>
                {
                    progressBar.currentState < progressBar.maxState?
                    <SingleQuestion 
                        questionCompleted={() => setQuestionsDone(questionsDone + 1)}
                        correctlyAnswered={() => setQuestionsCorrectlyAnswered(questionsCorrectlyAnswered + 1)}
                        incorrectAnswer={() => setQuestionsCorrectlyAnswered(0)}
                        questionData={currentQuestion} 
                        appSettings={props.appSettings}
                        UiTranslations={props.UiTranslations.exercise}/>
                    :
                    <Text>done</Text>
                }
                
            </View>
        </View>
    </>)
}
  
const ExerciseStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      justifyContent: 'space-between',
      paddingTop: 15,
      paddingBottom: 30, //ongelmallinen ???????      
      paddingLeft: 25,
      paddingRight: 25
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
        fontSize: 20
    },
    progressBar: {
        width: '75%',
        height: 30
    },
    exerciseContainer: {
        marginTop: 30
    }
})