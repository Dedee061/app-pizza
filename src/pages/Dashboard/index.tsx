import { View, Text, Button, StyleSheet } from "react-native";
import React, { useContext } from "react";

import { AuthContext } from "../../contexts/AuthContext";

export default function Dashboard() {
  const { signOut } = useContext(AuthContext);
  return (
    <View style={styles.container}>
      
      <Text>Tela Dashboard</Text>
    </View>
  );

  }

  const styles = StyleSheet.create({
    container:{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1D1D2E'
    }
  })