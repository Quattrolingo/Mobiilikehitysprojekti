import { Button, Text, Pressable, View, Modal } from 'react-native'
import StyleSheet from './DictStyles';
import { API_KEY } from '@env';
import { useEffect, useState } from 'react';


export default function Dictionary() {

  const [modalVisible, setModalVisible] = useState(false);
  const [word, setWord] = useState('');
  const [definition, setDefinition] = useState('');

  function close() {
    setModalVisible(false);
  }

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key' : API_KEY,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };
  
/*
  fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)
    .then(res => res.json())
    .then(res => console.log(res))
    .catch(err => console.error(err));
    */

    useEffect(() => {
    fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)
    .then(res => res.json())
    .then(
      (result) => {
        setWord(result.word);
        setDefinition(result.results[0].definition);
      },
 
    )
    }, [])


  
    return (
    <View style={StyleSheet.dictContainer}>
      <Text style={StyleSheet.headline}>Opi lisää sanastoa</Text>
      <View style={StyleSheet.mainContainer}>
        <View style={StyleSheet.topContainer}>
          <Text style={StyleSheet.random}>Satunnainen sana</Text>
          <Text style={StyleSheet.dictText}>Opi lisää opiskeltavan kielen sanoja ja niiden merkityksiä</Text>

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
              <Text style={StyleSheet.push}>PAINA TÄSTÄ SANA</Text>
            </Pressable>
          </View>
        </View>
        <View style={StyleSheet.middleContainer}>
            <Text style={StyleSheet.dictText}>Seuraava komponentti</Text>
        </View>
        <View style={StyleSheet.bottomContainer}>
          <Text style={StyleSheet.dictText}>Kolmas komponentti</Text>
        </View>
      </View>
    </View>
  );
}

  