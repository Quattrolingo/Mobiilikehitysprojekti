import { Button, Text, Pressable, View, Modal, TextInput, ScrollView } from 'react-native'
import StyleSheet from './DictStyles';
import { API_KEY } from '@env';
import { useEffect, useState } from 'react';


export default function Dictionary() {

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
        })
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

      )
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

      )
  }, [modalVisible3])








  return (
    <View style={StyleSheet.dictContainer}>

      <Text style={StyleSheet.headline}>Opi lisää sanastoa</Text>

      <View style={StyleSheet.mainContainer}>
        <ScrollView>
          <View style={StyleSheet.topContainer}>
            <Text style={StyleSheet.random}>Satunnainen sana</Text>
            <Text style={StyleSheet.dictText}>Opi lisää sanoja ja niiden merkityksiä</Text>
            <View style={StyleSheet.pushContainer}>
              <Modal
                visible={modalVisible}
                onRequestClose={close}
              >
                <View style={StyleSheet.modal}>
                  <Text style={StyleSheet.resultTextHeadline}>Satunnainen sana</Text>
                  <Text style={StyleSheet.dictText}>{word}</Text>
                  <Text></Text>
                  <Text style={StyleSheet.resultTextHeadline}>Sanan määritelmä</Text>
                  <Text style={StyleSheet.dictText}>{definition}</Text>
                  <Pressable onPress={close}>

                    <Text style={StyleSheet.close}>Sulje</Text>
                  </Pressable>
                </View>
              </Modal>

              <Pressable onPress={open}>
                <Text style={StyleSheet.push}>PAINA TÄSTÄ</Text>
              </Pressable>
            </View>
          </View>

          <View style={StyleSheet.middleContainer}>
            <Text style={StyleSheet.random}>Ääntäminen</Text>
            <Text style={StyleSheet.dictText}>Opi ääntämään sanoja</Text>
            <TextInput style={StyleSheet.textInPut} placeholder='Enter a word' value={searchWord} onChangeText={text => setSearchWord(text)} />
            <View style={StyleSheet.pushContainer}>
              <Modal
                visible={modalVisible2}
                onRequestClose={close2}
              >
                <View style={StyleSheet.modal}>
                  <Text style={StyleSheet.resultTextHeadline}>Haettu sana</Text>
                  <Text style={StyleSheet.dictText}>{searchWord}</Text>
                  <Text style={StyleSheet.resultTextHeadline}>Ääntäminen / yleinen</Text>
                  <Text style={StyleSheet.dictText}>{searchWordA}</Text>
                  <Text style={StyleSheet.resultTextHeadline}>Ääntäminen / substantiivi</Text>
                  <Text style={StyleSheet.dictText}>{searchWordN}</Text>
                  <Text style={StyleSheet.resultTextHeadline}>Ääntäminen / verbi</Text>
                  <Text style={StyleSheet.dictText}>{searchWordV}</Text>
                  <Pressable onPress={() => {
                    setModalVisible2(false);
                  }}>
                    <Text style={StyleSheet.close}>Sulje</Text>
                  </Pressable>
                </View>
              </Modal>

              <Pressable onPress={() => {
                setModalVisible2(true);
              }}>
                <Text style={StyleSheet.push}>PAINA TÄSTÄ</Text>
              </Pressable>
            </View>
          </View>

          <View style={StyleSheet.bottomContainer}>
            <Text style={StyleSheet.random}>Esimerkit</Text>
            <Text style={StyleSheet.dictText}>Opi esimerkkilauseita</Text>
            <TextInput style={StyleSheet.textInPut} placeholder='Enter a word' value={searchWord2} onChangeText={text => setSearchWord2(text)} />
            <View style={StyleSheet.pushContainer}>
              <Modal
                visible={modalVisible3}
                onRequestClose={close3}
              >
                <View style={StyleSheet.modal}>
                  <Text style={StyleSheet.resultTextHeadline}>Haettu sana</Text>
                  <Text style={StyleSheet.dictText}>{searchWord2}</Text>
                  <Text style={StyleSheet.resultTextHeadline}>Esimerkkilauseita</Text>
                  <Text style={StyleSheet.dictText}>1. {example}</Text>
                  <Text style={StyleSheet.dictText}>2. {example2}</Text>
                  <Text style={StyleSheet.dictText}>3. {example3}</Text>

                  <Pressable onPress={() => {
                    setModalVisible3(false);
                  }}>
                    <Text style={StyleSheet.close}>Sulje</Text>
                  </Pressable>
                </View>
              </Modal>

              <Pressable onPress={() => {
                setModalVisible3(true);
              }}>
                <Text style={StyleSheet.push}>PAINA TÄSTÄ</Text>
              </Pressable>
            </View>
          </View>



        </ScrollView>
      </View>

    </View>
  );
}

