import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import {Feather} from '@expo/vector-icons'

interface ItemProsp {
    data: {
        id: string;
        product_id: string;
        name: string;
        amount: string | number;
    };
    deleteItem: (item_id: string) => void;
}

export default function ItemList({data, deleteItem}: ItemProsp) {

  function handlerDeleteItem() {
    deleteItem(data.id)
  }

  return (
    <View style={style.container}>
      <Text style={style.item}>{data.amount} - {data.name}</Text>
      <TouchableOpacity onPress={handlerDeleteItem}>
        <Feather name="trash-2" color="#ff3f4b" size={25}/>
      </TouchableOpacity>
    </View>
  );
}

const style = StyleSheet.create({
    container:{
      backgroundColor: '#101026',
      flex: 1,
      alignItems: 'center',
      justifyContent: 'space-between',
      flexDirection: 'row',
      marginBottom: 12,
      paddingVertical: 12,
      paddingHorizontal: 12,
      borderRadius: 8,
      borderWidth: 0.6,
      borderColor: '#8a8a8a'
    },
    item:{
        color: '#fff',
        
    }
})
