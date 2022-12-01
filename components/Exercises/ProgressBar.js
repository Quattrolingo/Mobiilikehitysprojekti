import { StyleSheet, Text, View, Animated } from 'react-native'
import { useEffect, useState, useRef } from 'react'

export default function ProgressBar(props) {

    const counter = useRef(new Animated.Value(0)).current
    const countInterval = useRef(null)
    const [count, setCount] = useState(0)
    const [color, setColor] = useState("#3be62c")

    const load = (count) => {
        Animated.timing(counter, {
        toValue: count,
        duration: 500,
        useNativeDriver: false,
        }).start();
    };

    const width = counter.interpolate({
        inputRange: [0, props.data.maxState],
        outputRange: ["10%", "100%"],
        extrapolate: "clamp"
    })
        
    useEffect(() => {
        load(count)
        if (count >= 100) {
        setCount(100);
        clearInterval(countInterval);
        }
    }, [count]);

    useEffect(() => {
        countInterval.current = setCount(props.data.currentState)
        return () => {
        clearInterval(countInterval);
        };
    }, [props.data.currentState]);

    useEffect(() => {
        if(props.data.correctAnswers > 2 && props.data.correctAnswers < 4){
            setColor("#edfa00")
        } else if(props.data.correctAnswers > 3 && props.data.correctAnswers < 5){
            setColor("#fad900")
        }else if(props.data.correctAnswers > 4){
            setColor("#fa9e00")
        } else {
            setColor("#3be62c")
        }
    }, [props.data.correctAnswers])

    return (
        <View style={ProgressBarStyles.container}>
            <Animated.View style={[StyleSheet.absoluteFill, ProgressBarStyles.progressBar, {width: width},  {backgroundColor: color}]}/>
        </View>
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
    }
})