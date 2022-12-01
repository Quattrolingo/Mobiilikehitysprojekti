import { StyleSheet, Text, View, Animated } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import Colors from '../../../assets/Colors'

export default function TranslateSentence(props) {
    
    const checkAnswer = (item) => {
        if(props.canContinueExercise == false){
            setPressed(item.id)
            props.showCheckAnswer()
            if(item.word == props.data.answer[0]){
                props.submittedAnswerIsCorrect(true)
            } else {
                props.submittedAnswerIsCorrect(false)
            }
        }        
    }

    return (
        <View style={TranslateSentenceStyles.container}>
            {
                props.data.words ? props.data.words.map((itm, index) => {
                    return <View
                    key={itm.id}
                    data={itm}
                    style={TranslateSentenceStyles.draggableWord} />
                }) :
                <Text>Hello</Text>
            }
            <View style={TranslateSentenceStyles.dropZone}>
                <Text>Drop them here!</Text>
            </View>
        </View>
    )
}

const TranslateSentenceStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        width: "100%",
    },
    itemText: {
        fontSize: 20,
        textAlign: 'center',
    },
    dropZone: {
        zIndex: 100000,
        position: 'absolute',
        bottom: -240,
        width: '100%',
        left: 0,
        height: 200,
        backgroundColor: "#00334d"
    }
})