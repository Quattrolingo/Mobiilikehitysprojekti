import { StyleSheet, Text, View, Pressable, Animated } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import Colors from './../../../assets/Colors'

export default function SelectPairs(props) {    

    const [shuffledNativeWordArray, setShuffledNativeWordArray] = useState()
    const [shuffledForeignWordArray, setShuffledForeignWordArray] = useState()
    const [nativeWordID, setNativeWordID] = useState(0)
    const [foreignWordID, setForeignWordID] = useState(0)
    const [falseNativeWordID, setFalseNativeWordID] = useState(0)
    const [falseForeignWordID, setFalseForeignWordID] = useState(0)
    const [allBtnsDisabled, setAllBtnsDisabled] = useState(false)
    const [disabledID, setDisabledID] = useState([])
    const [correctID, setCorrectID] = useState(0)

    const anim = useRef(new Animated.Value(0));

  const shake = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(anim.current, {
          toValue: -2,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(anim.current, {
          toValue: 2,
          duration: 50,
          useNativeDriver: true
        }),
        Animated.timing(anim.current, {
          toValue: 0,
          duration: 50,
          useNativeDriver: true
        }),
      ]),
      { iterations: 2 }
    ).start()
  }

    const shuffleWordArray = (wordArray) => {
        let currentIndex = wordArray.length,  randomIndex
        while (currentIndex != 0) {
            randomIndex = Math.floor(Math.random() * currentIndex)
            currentIndex--
            [wordArray[currentIndex], wordArray[randomIndex]] = [wordArray[randomIndex], wordArray[currentIndex]]
        }
        return wordArray
    }

    useEffect(() => { // Alustetaan tilamuuttujat
        setShuffledNativeWordArray(shuffleWordArray(props.data.words.native))
        setShuffledForeignWordArray(shuffleWordArray(props.data.words.foreign))
        setNativeWordID(0)
        setForeignWordID(0)
        setFalseNativeWordID(0)
        setFalseForeignWordID(0)
        setAllBtnsDisabled(false)
        setDisabledID([])
    }, [props.data])    

    useEffect(() => {
        if(disabledID.length == props.data.words.native.length){
            props.submittedAnswerIsCorrect(true)
            props.checkAnswer()
        }
    }, [disabledID])

    useEffect(() => {
        if((nativeWordID != 0) && (foreignWordID != 0)){ // Jos käyttäjä on klikannut molemmilta puolilta kahta sanaa
            if(nativeWordID == foreignWordID){ // Jos sanojen ID täsmää eli ovat pari
                setAllBtnsDisabled(true)   
                setCorrectID(nativeWordID)                       
                setTimeout(() => {
                    let newDisabledIDArray = [...disabledID]
                    newDisabledIDArray.push(nativeWordID.toString())
                    setDisabledID(newDisabledIDArray)
                    setNativeWordID(0)
                    setForeignWordID(0)
                    setAllBtnsDisabled(false)
                    setCorrectID(0) 
                }, 500)                
            } else { // Jos sanat eivät ole pareja
                setAllBtnsDisabled(true)
                setFalseNativeWordID(nativeWordID)
                setFalseForeignWordID(foreignWordID)
                setNativeWordID(0)
                setForeignWordID(0)
                setTimeout(() => {
                    setFalseNativeWordID(0)
                    setFalseForeignWordID(0)
                    setAllBtnsDisabled(false)
                }, 1200)                
            }            
        }
    }, [nativeWordID, foreignWordID])

    const nativeWordClicked = (itm) => {
        if(itm.id == nativeWordID){
            setNativeWordID(0)
        } else {
            setNativeWordID(itm.id)
        }        
    }

    const foreignWordClicked = (itm) => {        
        if(itm.id == foreignWordID){
            setForeignWordID(0)
        } else {
            setForeignWordID(itm.id)
        }      
    }

    return (
        <View style={SelectPairsStyles.container}>
            <View>
                {
                    shuffledNativeWordArray && shuffledNativeWordArray.map((itm) => {
                        return <Animated.View key={itm.id} style={itm.id == falseNativeWordID ? [{transform: [{ translateX: anim.current }]}, shake()] : null }>
                                    <Pressable                                 
                                        onPress={() => nativeWordClicked(itm)}
                                        disabled={ allBtnsDisabled ? true : disabledID.includes(itm.id) ? true : false }
                                        style={[ SelectPairsStyles.btn, disabledID.includes(itm.id) ? SelectPairsStyles.disabledBtn :
                                                itm.id == correctID ? SelectPairsStyles.correctBtn :
                                                itm.id == falseNativeWordID ? SelectPairsStyles.incorrectBtn :
                                                itm.id == nativeWordID ? SelectPairsStyles.activeBtn :
                                                SelectPairsStyles.inactiveBtn 
                                        ]} >
                                        <Text style={[{color: disabledID.includes(itm.id) ? Colors.Grey : Colors.Black}, SelectPairsStyles.itemText]}>{itm.word}</Text>
                                    </Pressable>
                                </Animated.View>
                    })
                }
            </View>
            <View>
                {
                    shuffledForeignWordArray && shuffledForeignWordArray.map((itm) => {
                        return <Animated.View key={itm.id} style={itm.id == falseForeignWordID ? [{transform: [{ translateX: anim.current }]}, shake()] : null }>
                                    <Pressable                                        
                                        onPress={() => foreignWordClicked(itm)}
                                        disabled={ allBtnsDisabled ? true : disabledID.includes(itm.id) ? true : false }
                                        style={[ SelectPairsStyles.btn, disabledID.includes(itm.id) ? SelectPairsStyles.disabledBtn :
                                                itm.id == correctID ? SelectPairsStyles.correctBtn :
                                                itm.id == falseForeignWordID ? SelectPairsStyles.incorrectBtn :
                                                itm.id == foreignWordID ? SelectPairsStyles.activeBtn :
                                                SelectPairsStyles.inactiveBtn 
                                        ]} >
                                        <Text style={[{color: disabledID.includes(itm.id) ? Colors.Grey : Colors.Black}, SelectPairsStyles.itemText]}>{itm.word}</Text>
                                    </Pressable>
                                </Animated.View>
                    })
                }
            </View>
        </View>
    )
}

const SelectPairsStyles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    btn: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 8,
        height: 50,
        marginBottom: 15,       
        borderWidth: 3,
        borderRadius: 15,
    },
    disabledBtn: {
        backgroundColor: Colors.White,
        borderColor: Colors.ExtremeLightGrey
    },
    inactiveBtn: {
        backgroundColor: Colors.ExtremeLightGrey,
        borderColor: Colors.LightGrey
    },
    activeBtn: {
        backgroundColor: Colors.LightMint,
        borderColor: Colors.RicherMint
        
    },
    correctBtn: {
        backgroundColor: Colors.LimeGreen,
        borderColor: Colors.TrueLimeGreen
    },
    incorrectBtn: {
        backgroundColor: Colors.LightPeach,
        borderColor: Colors.Red  
    },
    itemText: {
        fontSize: 20,
        textAlign: 'center',
    }
})