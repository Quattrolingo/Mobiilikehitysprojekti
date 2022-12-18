import { Button, Text, Pressable, View, Modal, TextInput, ScrollView } from 'react-native'
import StyleSheet from './DictStyles';
import { API_KEY } from '@env';
import { useEffect, useState } from 'react';
import Colors from '../../assets/Colors';


export default function Dictionary(props) {

  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalVisible3, setModalVisible3] = useState(false);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [searchWordN, setSearchWordN] = useState('');
  const [searchWordV, setSearchWordV] = useState('');
  const [searchWordA, setSearchWordA] = useState('');
  const [searchWord2, setSearchWord2] = useState('');
  const [example, setExample] = useState('');
  const [example2, setExample2] = useState('');
  const [example3, setExample3] = useState('');
  const [appColor, setBackgroundColor] = useState(props.appSettings.themeColorOptions.background);
  const [textColor, setTextColor] = useState(appColor == Colors.DarkTheme ? Colors.White : Colors.Black);
  const [headlineColor, setHeadlineColor] = useState(appColor == Colors.DarkTheme ? Colors.DarkThemeSecondary : appColor == Colors.DarkYellow ? "orange" : appColor == Colors.LightPink ? "#fab691" : "#14acc9");
  
  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': API_KEY,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com',
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  };


  //random word function

  function close() {

    setModalVisible(false);
    /* const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
     fetch(url, options)
       .then(res => res.json())
       .then(
         (result) => {
           setWord(result.word)
           setDefinition(result.results[0].definition)
         }, (error) => {
           console.log(error)
         })
         */
  }

  function open() {

    const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
    fetch(url, options)
      .then(res => res.json())
      .then(
        (result) => {
          setWord(result.word)
          if (result.results && result.results.length > 0) {
            setDefinition(result.results[0].definition)
          } else {
            setDefinition("Sanalle ei löydy määritelmää")
          }
          setModalVisible(true);
        }, (error) => {
          console.log(error)
          setModalVisible(true);
        }).catch(err=>err)
  }



  /*
    useEffect(() => {
      const url = 'https://wordsapiv1.p.rapidapi.com/words/?random=true';
      fetch(url, options)
        .then(res => res.json())
        .then(
          (result) => {
            setWord(result.word)
            setDefinition(result.results[0].definition)
          }, (error) => {
            console.log(error)
          })
    }, [])
    */


  /*
      useEffect(() => {
        const fetchData = async() => {
          try {
            const response = await fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)
            if (response.ok) {
              const json = await response.json()
              
              setWord(json.result.word)
             
            } else {
              console.log('Error retrieving')
            }
          } catch (error) {
            console.log(error)
          }
        }
        fetchData()
      }, [])
      */



  //pronunciation function

  function close2() {
    setModalVisible2(false);
  }


  useEffect(() => {
    const url2 = 'https://wordsapiv1.p.rapidapi.com/' +
      'words/' +
      searchWord +
      '/pronunciation';
    fetch(url2, options)
      .then(res => res.json())
      .then(
        (result) => {
          setSearchWordA(result.pronunciation.all);
          setSearchWordN(result.pronunciation.noun);
          setSearchWordV(result.pronunciation.verb);

        },

      ).catch(err=>err)
  }, [modalVisible2])




  //examples function

  function close3() {
    setModalVisible3(false);
  }


  useEffect(() => {
    const url3 = 'https://wordsapiv1.p.rapidapi.com/' +
      'words/' +
      searchWord2 +
      '/examples';
    fetch(url3, options)
      .then(res => res.json())
      .then(
        (result) => {
          if (result.examples && result.examples.length > 0) {
            setExample(result.examples[0]);
            setExample2(result.examples[1]);
            setExample3(result.examples[2]);
          } else {
            setExample("Sanalle ei löydy esimerkkilauseita")
            setExample2("Sanalle ei löydy esimerkkilauseita")
            setExample3("Sanalle ei löydy esimerkkilauseita")
          }
        

        },

      ).catch(err=>err)
  }, [modalVisible3])








  return (
    <View style={[{backgroundColor: appColor == Colors.DarkTheme ? Colors.DarkTheme : appColor}, StyleSheet.dictContainer]}>

      <Text style={[{color: textColor, appColor: headlineColor}, StyleSheet.headline]}>Opi lisää sanastoa</Text>

      <View style={StyleSheet.mainContainer}>
        <ScrollView>
          <View style={[{backgroundColor: appColor == Colors.DarkTheme ? Colors.DarkThemeSecondary : 'beige'}, StyleSheet.topContainer]}>
            <Text style={[{color: textColor}, StyleSheet.random]}>Satunnainen sana</Text>
            <Text style={[{color: textColor}, StyleSheet.dictText]}>Opi lisää sanoja ja niiden merkityksiä</Text>
            <View style={StyleSheet.pushContainer}>
              <Modal
                visible={modalVisible}
                onRequestClose={close}
              >
                <View style={[{backgroundColor: appColor == Colors.DarkTheme ? Colors.DarkThemeSecondary : '#fafafa'}, StyleSheet.modal]}>
                  <Text style={[StyleSheet.resultTextHeadline, {color: textColor}]}>Satunnainen sana</Text>
                  <Text style={[StyleSheet.dictText, {color: textColor}]}>{word}</Text>
                  <Text></Text>
                  <Text style={[StyleSheet.resultTextHeadline, {color: textColor}]}>Sanan määritelmä</Text>
                  <Text style={[StyleSheet.dictText, {color: textColor}]}>{definition}</Text>
                  <Pressable onPress={close}>

                    <Text style={[{color: textColor}, StyleSheet.close]}>Sulje</Text>
                  </Pressable>
                </View>
              </Modal>

              <Pressable onPress={open}>
                <Text style={[{color: textColor}, StyleSheet.push]}>PAINA TÄSTÄ</Text>
              </Pressable>
            </View>
          </View>

          <View style={[{backgroundColor: appColor == Colors.DarkTheme ? Colors.DarkThemeSecondary : 'pink'},  StyleSheet.middleContainer]}>
            <Text style={[{color: textColor}, StyleSheet.random]}>Ääntäminen</Text>
            <Text style={[{color: textColor}, StyleSheet.dictText]}>Opi ääntämään sanoja</Text>
            <TextInput style={[{color: textColor, borderColor: textColor}, StyleSheet.textInPut]} placeholder='Enter a word' placeholderTextColor={textColor} value={searchWord} onChangeText={text => setSearchWord(text)} />
            <View style={StyleSheet.pushContainer}>
              <Modal
                visible={modalVisible2}
                onRequestClose={close2}
              >
                <View style={[{backgroundColor: appColor == Colors.DarkTheme ? Colors.DarkThemeSecondary : '#fafafa'}, StyleSheet.modal]}>
                  <Text style={[StyleSheet.resultTextHeadline, {color: textColor}]}>Haettu sana</Text>
                  <Text style={[StyleSheet.dictText, {color: textColor}]}>{searchWord}</Text>
                  <Text style={[StyleSheet.resultTextHeadline, {color: textColor}]}>Ääntäminen / yleinen</Text>
                  <Text style={[StyleSheet.dictText, {color: textColor}]}>{searchWordA}</Text>
                  <Text style={[StyleSheet.resultTextHeadline, {color: textColor}]}>Ääntäminen / substantiivi</Text>
                  <Text style={[StyleSheet.dictText, {color: textColor}]}>{searchWordN}</Text>
                  <Text style={[StyleSheet.resultTextHeadline, {color: textColor}]}>Ääntäminen / verbi</Text>
                  <Text style={[StyleSheet.dictText, {color: textColor}]}>{searchWordV}</Text>
                  <Pressable onPress={() => {
                    setModalVisible2(false);
                  }}>
                    <Text style={[{color: textColor}, StyleSheet.close]}>Sulje</Text>
                  </Pressable>
                </View>
              </Modal>

              <Pressable onPress={() => {
                setModalVisible2(true);
              }}>
                <Text style={[{color: textColor}, StyleSheet.push]}>PAINA TÄSTÄ</Text>
              </Pressable>
            </View>
          </View>

          <View style={[{backgroundColor: appColor == Colors.DarkTheme ? Colors.DarkThemeSecondary : 'peachpuff'}, StyleSheet.bottomContainer]}>
            <Text style={[{color: textColor}, StyleSheet.random]}>Esimerkit</Text>
            <Text style={[{color: textColor}, StyleSheet.dictText]}>Opi esimerkkilauseita</Text>
            <TextInput style={[{color: textColor, borderColor: textColor}, StyleSheet.textInPut]} placeholder='Enter a word' placeholderTextColor={textColor} value={searchWord2} onChangeText={text => setSearchWord2(text)} />
            <View style={StyleSheet.pushContainer}>
              <Modal
                visible={modalVisible3}
                onRequestClose={close3}
              >
                <View style={[{backgroundColor: appColor == Colors.DarkTheme ? Colors.DarkThemeSecondary : '#fafafa'}, StyleSheet.modal]}>
                  <Text style={[{color: textColor}, StyleSheet.resultTextHeadline]}>Haettu sana</Text>
                  <Text style={[{color: textColor}, StyleSheet.dictText]}>{searchWord2}</Text>
                  <Text style={[{color: textColor}, StyleSheet.resultTextHeadline]}>Esimerkkilauseita</Text>
                  <Text style={[{color: textColor}, StyleSheet.dictText]}>1. {example}</Text>
                  <Text style={[{color: textColor}, StyleSheet.dictText]}>2. {example2}</Text>
                  <Text style={[{color: textColor}, StyleSheet.dictText]}>3. {example3}</Text>

                  <Pressable onPress={() => {
                    setModalVisible3(false);
                  }}>
                    <Text style={[{color: textColor}, StyleSheet.close]}>Sulje</Text>
                  </Pressable>
                </View>
              </Modal>

              <Pressable onPress={() => {
                setModalVisible3(true);
              }}>
                <Text style={[{color: textColor}, StyleSheet.push]}>PAINA TÄSTÄ</Text>
              </Pressable>
            </View>
          </View>



        </ScrollView>
      </View>

    </View>
  );
}

