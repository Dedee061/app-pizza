import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
} from "react-native";
import React, { useContext, useState } from "react";

import { AuthContext } from "../../contexts/AuthContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { StackPramsLst } from "../../routes/app.routes";
import { api } from "../../service/api";


export default function Dashboard() {
  const navigation = useNavigation<NativeStackNavigationProp<StackPramsLst>>()
  const { signOut } = useContext(AuthContext);
  const [number, setNumber] = useState('');
  
  

  async function OpenOrder(){
    if(number === '' || number === null) {
      return;
    }
    const response = await api.post('/order', {
      table: Number(number),
      
    })
    
    // console.log(response.data)

    navigation.navigate('Order', {number: number, order_id: response.data.id});
    setNumber('')
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.text}>Novo Pedido</Text>

      <TextInput
        keyboardType="numeric"
        placeholder="Numero da mesa"
        placeholderTextColor={"#fff7"}
        style={styles.input}
        value={number}
        onChangeText={setNumber}
      />
    

      <TouchableOpacity style={styles.button} onPress={OpenOrder}>
        <Text style={styles.textButton}>Abrir Mesa</Text>
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
    textAlign: "center",
    
  },
  button: {
    width: "90%",
    height: 40,
    backgroundColor: "#3FFFA3",
    justifyContent: "center",
    alignItems: "center",
    fontWeight: "bold",
    borderRadius: 8,
    marginTop: 20,
  },
  textButton: {
    fontWeight: "bold",
  },
  text: {
    fontSize: 45,
    marginBottom: 25,
    color: "#fff",
    paddingHorizontal: 10,
    fontWeight: "bold",
  },
});
