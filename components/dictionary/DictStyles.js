import { Wrap } from "@react-native-material/core";
import { StyleSheet } from "react-native";


export default StyleSheet.create({
    dictContainer: {
      flex: 1,
      width: "100%",  
      alignItems: 'center',
    },
    headline: {
      marginTop: 20,
      fontSize: 35,
      fontWeight: 'bold',
      fontFamily: 'monospace',
    },
    dictText: {
      fontFamily: 'monospace',
      fontSize: 15,
      fontWeight: 'bold',
      padding: 15,
      marginHorizontal: 10,
      textAlign: 'center',
    },
    random: {
      marginTop: 30,
      fontSize: 25,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      textDecorationLine: "underline",
    },
    /*BtnContainer: {
      width: "60%",
      height: "10%",
      backgroundColor: 'black',
      alignItems: "center",
      justifyContent: "space-around",
    },*/


    pushContainer: {
      marginTop: 15,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'red,'
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 20,
      margin: 15,
    },
    topContainer: {
      flex: 0.3,
      borderWidth: 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      paddingBottom: 25,
      marginBottom: 10,
    },
    middleContainer: {
      flex: 0.3,
      borderWidth: 2,
      alignItems: 'center',
      paddingBottom: 25,
      marginBottom: 10,
    },
    bottomContainer: {
      flex: 0.3,
      borderWidth: 2,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      alignItems: 'center',
      paddingBottom: 25,
    },
    modal: {
      height: '80%',
      display: 'flex',
      marginTop: 80,
      padding: 50,
      //backgroundColor: '#fcc201',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.4,
      shadowRadius: 4,
      elevation: 5,
    },


    close: {
      marginTop: 50,
      fontWeight: 'bold',
      backgroundColor: 'orange',
      padding: 10,
      paddingLeft: 20,
      paddingRight: 20,
    },
    push: {
      fontSize: 30,
      fontWeight: 'bold',
      textShadowColor: 'indianred',
      textShadowOffset: {width: 5, height: 5},
      textShadowRadius: 5,
    },
    searchBox: {
      marginBottom: 20,
      borderColor: '#333',
      borderWidth: 1,
      padding: 5,
    },
    textInPut: {
      borderWidth: 1,
      borderRadius: 10,
      width: 170,
      height: 40,
      textAlign: 'center',

    },
    resultTextHeadline: {
      fontFamily: 'monospace',
      fontSize: 25,
      fontWeight: 'bold',
      padding: 15,
      marginHorizontal: 10,
      textAlign: 'center',
    },

});