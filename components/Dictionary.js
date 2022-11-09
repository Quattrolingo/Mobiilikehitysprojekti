import { StyleSheet, Text, View } from 'react-native'

export default function Dictionary() {
  
    return (
      <View style={DictionaryStyles.container}>
        <Text>This is DICTIONARY</Text>
      </View>
    );
  }
  
  const DictionaryStyles = StyleSheet.create({
    container: {
      flex: 1,
      width: "100%",
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });