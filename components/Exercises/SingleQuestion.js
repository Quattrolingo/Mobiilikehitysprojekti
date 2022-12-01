import { StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import TranslateSentence from './QuestionTypes/TranslateSentence'
import SelectMissingWord from './QuestionTypes/SelectMissingWord'
import HowToSay from './QuestionTypes/HowToSay'
import SelectPairs from './QuestionTypes/SelectPairs'
import SelectCorrectWord from './QuestionTypes/SelectCorrectWord'
import Colors from './../../assets/Colors'

export default function SingleQuestion(props) {

    const [componentToDisplay, setComponentToDisplay] = useState(null)
    const [confirmAnswerBtnVisible, setConfirmAnswerBtnVisible] = useState(false)
    const [userAnswer, setUserAnswer] = useState(null)
    const [resultVisible, setResultVisible] = useState(false)
    const feedbackAnimation = useRef(new Animated.Value(0)).current

    const fadeView = () => {
    Animated.timing(
        feedbackAnimation, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }
    const checkAnswer = () => {
        if(userAnswer == true){            
            props.correctlyAnswered()
            setConfirmAnswerBtnVisible(false)
            setResultVisible(true)
            fadeView()
        } else {
            //props.questionCompleted()
            setConfirmAnswerBtnVisible(false)
            setResultVisible(true)
            fadeView()
        }        
    }

    const nextQuestion = () => {
        props.questionCompleted()
        setResultVisible(false)

        Animated.timing( // reset feedback fade animation
            feedbackAnimation, {
                toValue: 0,
                duration: 0,
                useNativeDriver: false,
            }).start()
    }

    useEffect(() => {
        if(props.questionData.type == "translate_sentence"){
            setComponentToDisplay(
                <TranslateSentence
                    data={props.questionData}
                    showCheckAnswer={() => setConfirmAnswerBtnVisible(true)}
                    submittedAnswerIsCorrect={setUserAnswer}
                    canContinueExercise={resultVisible} />
            )
            nextQuestion()
        } else if(props.questionData.type == "select_missing_word"){
            setComponentToDisplay(
                <SelectMissingWord
                    data={props.questionData}
                    showCheckAnswer={() => setConfirmAnswerBtnVisible(true)}
                    submittedAnswerIsCorrect={setUserAnswer}
                    canContinueExercise={resultVisible} />
            )
        } else if(props.questionData.type == "how_to_say"){
            setComponentToDisplay(
                <HowToSay
                    data={props.questionData}
                    showCheckAnswer={() => setConfirmAnswerBtnVisible(true)}
                    submittedAnswerIsCorrect={setUserAnswer}
                    canContinueExercise={resultVisible} />
            )
        } else if(props.questionData.type == "select_pairs"){
            setComponentToDisplay(
                <SelectPairs
                    data={props.questionData}
                    showCheckAnswer={() => setConfirmAnswerBtnVisible(true)}
                    submittedAnswerIsCorrect={setUserAnswer}
                    canContinueExercise={resultVisible} />
            )
        } else if(props.questionData.type == "select_correct_word"){
            setComponentToDisplay(
                <SelectCorrectWord
                    data={props.questionData}
                    showCheckAnswer={() => setConfirmAnswerBtnVisible(true)}
                    submittedAnswerIsCorrect={setUserAnswer}
                    canContinueExercise={resultVisible} />
            )
        }
    },[props.questionData, resultVisible])
  
    return (
      <View style={QuestionStyles.container}>
        <View>
            <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.Black}, QuestionStyles.questionTask]}>{props.questionData.task}</Text>
            {
                props.questionData.sentence &&
                <Text style={[{color: (props.appSettings.themeColorOptions.background == '#121212') ? Colors.White : Colors.Black}, QuestionStyles.questionSentence]}>{props.questionData.sentence.replace('*', '_____')}</Text>
            }
        </View>
        <View style={{paddingLeft: 25, paddingRight: 25}}>
            { componentToDisplay }
        </View>
        <View style={QuestionStyles.confirmAnswerContainer}>
            { 
                confirmAnswerBtnVisible &&
                <View style={QuestionStyles.confirmAnswerInnerContainer}>
                    <TouchableOpacity style={QuestionStyles.confirmAnswerBtnContainer} activeOpacity={0.5} onPress={() => checkAnswer()}>
                        <Text style={QuestionStyles.btnText}>TARKISTA VASTAUS</Text>
                    </TouchableOpacity>
                </View>
            }
            { 
                (resultVisible && userAnswer) &&
                <><Animated.View style={[QuestionStyles.feedbackCorrectBackground, {opacity: feedbackAnimation}]}>
                    <Text style={QuestionStyles.feedbackTextCorrect}>Oikein!</Text>
                </Animated.View>
                <View style={QuestionStyles.feedbackCorrectBtn}>
                    <TouchableOpacity style={QuestionStyles.feedbackCorrect} activeOpacity={0.5} onPress={() => nextQuestion()}>
                        <Text style={QuestionStyles.btnText}>JATKA</Text>
                    </TouchableOpacity>
                </View></>
            }
            {
                (resultVisible && !userAnswer) &&
                <><Animated.View style={[QuestionStyles.feedbackIncorrectBackground, {opacity: feedbackAnimation}]}>
                    <Text style={QuestionStyles.feedbackTextIncorrect}>Ei aivan..</Text>
                    <Text style={QuestionStyles.feedbackTextIncorrect}>Oikea vastaus olisi:</Text>
                    <Text style={QuestionStyles.feedbackTextAnswer}>{props.questionData.answer}</Text>                    
                </Animated.View>
                <View style={QuestionStyles.feedbackIncorrectBtn}>
                    <TouchableOpacity style={QuestionStyles.feedbackIncorrect} activeOpacity={0.5} onPress={() => nextQuestion()}>
                        <Text style={QuestionStyles.btnText}>JATKA</Text>
                    </TouchableOpacity>
                </View></>
            }
        </View>  
      </View>
    )
  }
  
const QuestionStyles = StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      justifyContent: 'space-between'
    },
    questionTask: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    questionSentence: {
        marginTop: 30,
        fontSize: 20,
    },
    confirmAnswerContainer: {
        display: 'flex',
        width: "100%",
        alignItems: 'center',
        height: 50,        
        marginBottom: 20,
    },
    confirmAnswerInnerContainer: {
        height: 50,
        backgroundColor: Colors.DarkYellow,        
        borderRadius: 15,
        width: '90%',
    },
    confirmAnswerBtnContainer: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50        
    },
    feedbackCorrectBtn: {
        zIndex: 1000,
        height: 50,
        backgroundColor: Colors.LimeGreen,        
        borderRadius: 15,
        width: '90%'
    },
    feedbackCorrect: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    feedbackIncorrectBtn: {
        zIndex: 1000,
        height: 50,
        backgroundColor: Colors.Red,        
        borderRadius: 15,
        width: '90%'
    },
    feedbackIncorrect: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: 50
    },
    btnText: {
        fontSize: 20,
        textAlign: 'center',
        fontWeight: 'bold',
        color: Colors.White
    },
    feedbackCorrectBackground: {
        position: 'absolute',
        height: 200,
        bottom: -20,
        left: -25,
        right: -25,
        zIndex: 999,
        backgroundColor: Colors.LightMint,
        paddingTop: 20
    },
    feedbackIncorrectBackground: {
        position: 'absolute',
        height: 200,
        bottom: -20,
        left: -25,
        right: -25,
        zIndex: 999,
        backgroundColor: Colors.LightPeach,
        paddingTop: 20
    },
    feedbackTextIncorrect: {
        fontSize: 20,
        marginLeft: 40,
        fontWeight: 'bold',
        color: Colors.Red
    },
    feedbackTextCorrect: {
        fontSize: 30,
        marginLeft: 40,
        fontWeight: 'bold',
        color: Colors.LimeGreen
    },
    feedbackTextAnswer: {
        fontSize: 20,
        marginLeft: 40,
        color: Colors.Black
    }
})