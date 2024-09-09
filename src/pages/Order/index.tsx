import { View, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React from "react";

import { useRoute, RouteProp } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

type RouterDetailsParams = {
  Order: {
    number: number | string;
    order_id: string;
  };
};

type OrderRouteProps = RouteProp<RouterDetailsParams, "Order">;

export default function Order() {
  const route = useRoute<OrderRouteProps>();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Mesa {route.params.number}</Text>
        <TouchableOpacity>
          <Feather name="trash-2" size={28} color="#ff3f4b" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.input}>
          <Text style={{color: '#fff'}}>Pizzas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
      <Text style={{color: '#fff'}}>Pizzas de calabresa</Text>
      </TouchableOpacity>

      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>
          Quantidade
        </Text>
            <TextInput style={[styles.input, {width: '60%', textAlign:'center'}]} placeholder="1" value="1" placeholderTextColor={'#fff7'} keyboardType="numeric"/>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1D1D2E",
    paddingEnd: "4%",
    paddingVertical: "6%",
    paddingStart: "4%",
  },
  header: {
    flexDirection: "row",
    marginBottom: 12,
    alignItems: "center",
    marginTop: 24,
  },
  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    marginRight: 14,
  },
  input:{
    backgroundColor: '#101026',
    borderRadius: 5,
    width: '100%',
    height:40,
    marginBottom: 12,
    color: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 8,
    fontSize:20
    

  },
  qtdContainer:{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
  },
  qtdText:{
    fontSize: 20,
    fontWeight:'bold',
    color: '#fff'
  },
});
