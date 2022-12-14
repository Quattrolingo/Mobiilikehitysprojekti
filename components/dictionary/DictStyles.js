import { StyleSheet } from "react-native";


export default StyleSheet.create({
    dictContainer: {
      flex: 1,
      width: "100%",
      backgroundColor: '#fcc201',   
      alignItems: 'center',
    },
    headline: {
      marginTop: 20,
      fontSize: 35,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      backgroundColor: "orange",
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
      marginTop: 20,
      alignItems: 'center',
      justifyContent: 'center',
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 20,
      margin: 5,
    },
    topContainer: {
      flex: 0.3,
      backgroundColor: 'beige',
      borderWidth: 2,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
      paddingBottom: 25,
      marginBottom: 10,
    },
    middleContainer: {
      flex: 0.3,
      backgroundColor: "pink",
      borderWidth: 2,
      alignItems: 'center',
      paddingBottom: 25,
      marginBottom: 10,
    },
    bottomContainer: {
      flex: 0.3,
      backgroundColor: "peachpuff",
      borderWidth: 2,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      alignItems: 'center',
      paddingBottom: 25,
    },
    modal: {
      marginTop: 100,
      padding: 20,
      backgroundColor: '#fafafa',
      justifyContent: 'center',
      alignItems: 'center',
      shadowColor: 'red',
      shadowOffset: {
        width: 0,
        height: 2,
      }
    },
    close: {
      marginTop: 50,
      color: '#333',
      fontWeight: 'bold',
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
      borderColor: 'black',
      borderWidth: 1,
      borderRadius: 10,
      width: 170,
      height: 40,
      textAlign: 'center',
    },

});