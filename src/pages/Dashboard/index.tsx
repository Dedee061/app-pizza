import { View, Text, Button, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      
      <Text>Abrir Mesa</Text>

      <TextInput  placeholder="Numero da mesa" placeholderTextColor={"#fff7"} style={styles.input}/>

      <TouchableOpacity style={styles.button}>
        <Text>Abrir Mesa</Text>
      </TouchableOpacity>
      
    </View>
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
      width: "95%",
      height: 60,
      fontSize: 20,
      backgroundColor: "#101026",
      marginBottom: 10,
      paddingHorizontal: 10,
      color: "#fff",
      borderRadius: 8,
      borderWidth: 0.7,
      borderColor: "#8A8A8A",
    },
    button: {
      width: "95%",
      height: 40,
      backgroundColor: "#3FFFA3",
      justifyContent: "center",
      alignItems: "center",
      fontWeight: 'bold',
      borderRadius: 8,
      marginTop: 20,
    },
  })