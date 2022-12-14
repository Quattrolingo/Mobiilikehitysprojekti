import React, { useState, useEffect, useRef } from 'react'
import { StyleSheet, View } from 'react-native'
import DuoDragDrop, { Word, Placeholder } from "@jamsch/react-native-duo-drag-drop"
import Colors from '../../../assets/Colors'

const TranslateSentenceDrag = (props) => {

    const [exerciseWords, setExerciseWords] = useState([])
    const ref = useRef(null)

    const shuffleWordArray = (wordArray) => {
        let currentIndex = wordArray.length,  randomIndex
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [wordArray[currentIndex], wordArray[randomIndex]] = [wordArray[randomIndex], wordArray[currentIndex]]
        }
        return wordArray
    }

    useEffect(() => {
        setExerciseWords(props.data.words)
    }, [props.data.words])

    const prepareAnswerToBeChecked = () => {
        props.showCheckAnswer(true)
        if(ref.current?.getAnsweredWords().toString() == props.data.answer.toString()){
            props.submittedAnswerIsCorrect(true)
        } else {
            props.submittedAnswerIsCorrect(false)
        }        
    }
    
    return (    
        <View style={TranslateSentenceDragStyles.container}>
            <DuoDragDrop
                ref={ref}
                onDrop={() => {
                    ref.current?.getAnsweredWords().length > 0 ?
                    prepareAnswerToBeChecked() :
                    props.showCheckAnswer(false)
                }}
                wordBankOffsetY={40}
                gesturesDisabled={props.canContinueExercise}
                words={shuffleWordArray(exerciseWords.map(itm => itm.word))}
                renderWord={() => (
                    <Word containerStyle={TranslateSentenceDragStyles.wordContainer} textStyle={TranslateSentenceDragStyles.word}/>
                )}
                renderPlaceholder={({ style }) => <Placeholder style={[style, { borderRadius: 15  }]} />} />
        </View>
    )
}

export default TranslateSentenceDrag

const TranslateSentenceDragStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
    },
    wordContainer: {
        padding: 8,
        height: 50,      
        borderWidth: 3,
        borderRadius: 15,
        backgroundColor: Colors.ExtremeLightGrey,
        borderColor: Colors.LightGrey
    },
    word: {
        fontSize: 19,
        textAlign: 'center',
    }
})

