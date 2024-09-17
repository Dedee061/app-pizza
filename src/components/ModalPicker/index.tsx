import React from 'react'
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { categoryProps } from '../../pages/Order'


interface ModalPickerProps {
    options: categoryProps[];
    handlerCloseModal: () => void;
    selectedItemm: (item: categoryProps) => void
}
const {width: WIDTH, height: HEIGHT} = Dimensions.get('window')
 
export default function ModalPicker({handlerCloseModal,options,selectedItemm}:ModalPickerProps) {

    function onPressItem(item: categoryProps) {
        selectedItemm(item)
        handlerCloseModal()
    }

    const option = options.map((item, index) => (
        <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)}>
            <Text style={styles.item}>{item?.name}</Text>
        </TouchableOpacity>
    ))
 
  return (
    <TouchableOpacity  style={styles.container} onPress={handlerCloseModal}>
        <View style={styles.content}>
                <ScrollView showsVerticalScrollIndicator={false}>
                        {option}
                </ScrollView>
        </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent:'center',
        alignItems: 'center'
    },
    content:{
        width: WIDTH -1,
        height: HEIGHT / 2,
        backgroundColor: '#101026',
        borderRadius: 10,
        padding: 20,
        borderColor: '#171727'
    },
    option:{
        alignItems: 'flex-start',
        borderTopWidth: 0.8,
        borderTopColor: '#373758'
    },
    item:{
        margin:20,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#ffffff'
    }
})
