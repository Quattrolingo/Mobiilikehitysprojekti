import { Text, View } from 'react-native'
import StyleSheet from './DictStyles';
import { API_KEY } from '@env';

export default function Dictionary() {

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key' : API_KEY,
      'X-RapidAPI-Host': 'wordsapiv1.p.rapidapi.com'
    }
  };
  
  fetch('https://wordsapiv1.p.rapidapi.com/words/?random=true', options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.error(err));
  
    return (
      <View style={StyleSheet.container}>
        <Text>This is DICTIONARY</Text>
      </View>
    );
  }
  
  