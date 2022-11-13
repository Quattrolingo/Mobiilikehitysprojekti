import { StyleSheet } from "react-native";


export default StyleSheet.create({
    dictContainer: {
      flex: 1,
      width: "100%",
      backgroundColor: 'orange',   
      alignItems: 'center',
      
    },
    headline: {
      marginTop: 20,
      fontSize: 40,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      backgroundColor: "darkorange",
    },
    DictText: {
      fontFamily: 'monospace',
      fontSize: 15,
      fontWeight: 'bold',
      padding: 15,
      marginHorizontal: 10,
      textAlign: 'center',
    },
    random: {
      marginTop: 50,
      fontSize: 20,
      fontWeight: 'bold',
      fontFamily: 'monospace',
      textDecorationLine: "underline",
    },
    BtnContainer: {
      width: "60%",
      height: "10%",
      backgroundColor: 'black',
      alignItems: "center",
      justifyContent: "space-around",
    },


    container: {
      marginTop: 20,
      backgroundColor: 'orange',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    mainContainer: {
      flex: 1,
      justifyContent: 'space-between',
      padding: 20,
      margin: 10,
    },
    rndContainer: {
      flex: 0.35,
      backgroundColor: 'beige',
      borderWidth: 5,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      alignItems: 'center',
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
     
    }

});