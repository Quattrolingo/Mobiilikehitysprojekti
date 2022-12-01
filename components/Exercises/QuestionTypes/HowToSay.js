import { StyleSheet, Text, View, Pressable } from 'react-native'
import { useState, useEffect } from 'react'
import Colors from '../../../assets/Colors'

export default function HowToSay(props) {

    const [pressedID, setPressed] = useState(0)
    
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
        <View style={HowToSayStyles.container}>
            {
                props.data.words && props.data.words.map((itm) => {
                    return <Pressable
                                key={itm.id}
                                onPress={() => checkAnswer(itm)}
                                style={itm.id == pressedID ? HowToSayStyles.activeBtn : HowToSayStyles.inactiveBtn} >
                                <Text style={HowToSayStyles.itemText}>{itm.word}</Text>
                            </Pressable>
                })
            }
        </View>
    )
}

const HowToSayStyles = StyleSheet.create({
    container: {
        display: 'flex',
        width: "100%",
        alignItems: 'center',
    },
    inactiveBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        height: 50,
        width: '90%',
        backgroundColor: Colors.ExtremeLightGrey,        
        borderWidth: 3,
        borderColor: Colors.LightGrey,
        borderRadius: 15,
    },
    activeBtn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        height: 50,
        width: '90%',
        backgroundColor: Colors.LightMint,
        borderWidth: 3,
        borderColor: Colors.RicherMint,
        borderRadius: 15,
        
    },
    itemText: {
        fontSize: 20,
        textAlign: 'center',
    }
})