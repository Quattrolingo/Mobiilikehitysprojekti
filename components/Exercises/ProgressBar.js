import { StyleSheet, Text, View, Animated } from 'react-native'
import { useEffect, useState, useRef } from 'react'

export default function ProgressBar(props) {

    const counter = useRef(new Animated.Value(0)).current
    const countInterval = useRef(null)
    const [count, setCount] = useState(0)
    const [color, setColor] = useState("#3be62c")
    const [strikeMessage, setStrikeMessage] = useState('')

    const anim = useRef(new Animated.Value(0)).current

    const flash = () => {
        Animated.loop(
            Animated.sequence([
              Animated.timing(anim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
              }),
              Animated.timing(anim, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
              })
            ]),
            {
              iterations: 3
            }
          ).start()
    }

    const load = (count) => {
        Animated.timing(counter, {
        toValue: count,
        duration: 500,
        useNativeDriver: false, // This MUST be set to false, otherwise will cause error. Should consider using react-native-reanimated for this
        }).start()
    }

    const width = counter.interpolate({
        inputRange: [0, props.data.maxState],
        outputRange: ["10%", "100%"],
        extrapolate: "clamp"
    })
        
    useEffect(() => {
        load(count)
        if (count >= 100) {
            setCount(100);
            clearInterval(countInterval)
        }
    }, [count])

    useEffect(() => {
        countInterval.current = setCount(props.data.currentState)
        return () => {
            clearInterval(countInterval)
        }
    }, [props.data.currentState])

    useEffect(() => {
        if(props.data.correctAnswers == 3){
            setColor("#edfa00")
            flash()
            setStrikeMessage('3 in a row!')
        } else if(props.data.correctAnswers == 4){
            setColor("#fad900")
            flash()
            setStrikeMessage('4 in a row!')
        } else if(props.data.correctAnswers == 5){
            setColor("#fa9e00")
            flash()
            setStrikeMessage('5 in a row!')
        } else if(props.data.correctAnswers > 5 ){
            setColor("#fa9e00")
        } else {
            setColor("#3be62c")
        }
    }, [props.data.correctAnswers])

    return (
        <Animated.View style={ProgressBarStyles.container}>
            <Animated.Text style={[{ opacity: anim }, ProgressBarStyles.innerText]}>{strikeMessage}</Animated.Text>
            <Animated.View style={[StyleSheet.absoluteFill, ProgressBarStyles.progressBar, {width: width},  {backgroundColor: color}]}/>
        </Animated.View>
        )
}
  
const ProgressBarStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'lightgrey',
        borderRadius: 5,
    },
    progressBar: {
        borderRadius: 5,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    innerText: {
        marginTop: 5,
        textAlign: 'center',
        zIndex: 10,
        fontWeight: 'bold'
    }
})