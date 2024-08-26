import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from "react-native";
import React from "react";

export default function SignIn() {
  return(

   <View style={styles.container}>
    
    <View style={styles.InputContainer}>
      <Image source={require('../../assets/Logo.png')} style={styles.logo}/>
      <TextInput placeholder="Digite seu email" style={styles.input} placeholderTextColor={'#fff7'}/>
      <TextInput placeholder="Digite sua senha" style={styles.input}  placeholderTextColor={'#fff7'}/>
      
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>

    </View>
  </View>
)
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D2E",
    alignItems: "center",
    justifyContent: "center",
    
  },
  logo:{
    marginBottom: 38,

  }, 

InputContainer: {
  width: '95%',
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 34,
  paddingHorizontal: 10
} ,
input: {
  width: '95%',
  height: 40,
  backgroundColor: '#101026',
  marginBottom: 10,
  paddingHorizontal: 10,
  color: '#fff',
  borderRadius: 8,
  borderWidth: 0.7,
  borderColor: '#8A8A8A'
},
button:{
  width: '95%',
  height: 40,
  backgroundColor: '#3FFFA3',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: 8,
  marginTop: 20
},
buttonText:{
    fontSize: 18,
    fontWeight: 'bold',
    color: '#101026',
}

});
