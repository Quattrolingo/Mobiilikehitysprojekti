import { Button, Text, Pressable, View, Modal, TextInput } from 'react-native'
import StyleSheet from './DictStyles';
import { API_KEY } from '@env';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'X-RapidAPI-Host';


export default function Dictionary() {

  const [modalVisible, setModalVisible] = useState(false);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');
  const [searchWord, setSearchWord] = useState('');
  const [searchWordN, setSearchWordN] = useState('');
  const [searchWordV, setSearchWordV] = useState('');

  function close() {
    setModalVisible(false);
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key' : API_KEY,
      'X-RapidAPI-Host': API_URL,
    }
  };

    //random word function

    useEffect(() => {
      const url = API_URL +
      'words/?random=true';
    fetch(url, options)
    .then(res => res.json())
    .then(
      (result) => {
        setWord(result.word);
        setDefinition(result.results[0].definition);
      },
 
    )
    }, [])

   
    //pronunciation function

    useEffect(() => {
      const url2 = API_URL +
      'words/' +
      searchWord +
      '/pronunciation';
      fetch(url2, options)
      .then(res2 => res2.json())
      .then(
        (result2) => {
          setSearchWordN(result2.pronunciation.noun);
          setSearchWordV(result2.pronunciation.verb);
        },
   
      )
      }, [])



  
    return (
    <View style={StyleSheet.dictContainer}>
      <Text style={StyleSheet.headline}>Opi lisää sanastoa</Text>

      <View style={StyleSheet.mainContainer}>
        <View style={StyleSheet.topContainer}>
          <Text style={StyleSheet.random}>Satunnainen sana</Text>
          <Text style={StyleSheet.dictText}>Opi lisää sanoja ja niiden merkityksiä</Text>
          <View style={StyleSheet.pushContainer}>
            <Modal
              visible={modalVisible}
              onRequestClose={close}
            >
              <View style={StyleSheet.modal}>
                <Text>Satunnainen sana</Text>
                <Text>{word}</Text>
                <Text>Sanan määritelmä</Text>
                <Text>{definition}</Text>
                <Pressable onPress={() => {
                  setModalVisible(false);
                }}>
                  <Text style={StyleSheet.close}>Sulje</Text>
                </Pressable>
              </View>
            </Modal>

            <Pressable onPress={() => {
              setModalVisible(true);
            }}>
              <Text style={StyleSheet.push}>PAINA TÄSTÄ</Text>
            </Pressable>
          </View>
        </View>

        <View style={StyleSheet.middleContainer}>
            <Text style={StyleSheet.random}>Ääntäminen</Text>
            <Text style={StyleSheet.dictText}>Opi ääntämään sanoja</Text>
            <TextInput style={StyleSheet.textInPut} placeholder='Syötä tähän sana' value={searchWord} onChangeText={text => setSearchWord(text)}/>
            <View style={StyleSheet.pushContainer}>
            <Modal
              visible={modalVisible}
              onRequestClose={close}
            >
              <View style={StyleSheet.modal}>
                <Text>Haettu sana</Text>
                <Text>{searchWord}</Text>
                <Text>Ääntäminen / subjekti</Text>
                <Text>{searchWordN}</Text>
                <Text>Ääntäminen / verbi</Text>
                <Text>{searchWordV}</Text>
                <Pressable onPress={() => {
                  setModalVisible(false);
                }}>
                  <Text style={StyleSheet.close}>Sulje</Text>
                </Pressable>
              </View>
            </Modal>

            <Pressable onPress={() => {
              setModalVisible(true);
            }}>
              <Text style={StyleSheet.push}>PAINA TÄSTÄ</Text>
            </Pressable>
          </View>
        </View>

        <View style={StyleSheet.bottomContainer}>
          <Text style={StyleSheet.dictText}>Kolmas komponentti</Text>
        </View>
      </View>
    </View>
  );
}

  