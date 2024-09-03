import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput, SafeAreaView } from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      
      <Text style={styles.text}>Novo Pedido</Text>

      <TextInput keyboardType="numeric" placeholder="Numero da mesa" placeholderTextColor={"#fff7"} style={styles.input}/>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton} >Abrir Mesa</Text>
      </TouchableOpacity>
      
    </SafeAreaView>
  );

  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#1D1D2E",
      alignItems: "center",
      justifyContent: "center",
    },
    input: {
      width: "90%",
      height: 60,
      fontSize: 20,
      backgroundColor: "#101026",
      paddingHorizontal: 10,
      color: "#fff",
      borderRadius: 8,
      borderWidth: 0.7,
      borderColor: "#8A8A8A",
      textAlign: 'center'
    },
    button: {
      width: "90%",
      height: 40,
      backgroundColor: "#3FFFA3",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 'bold',
      borderRadius: 8,
      marginTop: 20,
    },
    textButton:{
      fontWeight: 'bold',
    }, 
    text:{
      fontSize: 45,
      marginBottom: 25,
      color: "#fff",
      paddingHorizontal: 10,
      fontWeight: 'bold'
      
      
    }
  })