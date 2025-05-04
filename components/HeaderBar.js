import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function HeaderBar() {
    return (
        <View style={style.header}>
            <Text style={style.header}>ห้องสมุด</Text>
        </View>
    )
}

const style = StyleSheet.create(
    {
        header: {
            width: '100%',
            backgroundColor: "#1447e6",
            textAlign:'center',
            paddingTop:15,
            paddingBottom:10,
            borderBottomLeftRadius:20,
            borderBottomRightRadius:20,
            color:'#fff',
            fontSize:24
        }, 
        textHeader:{
            color:"#fff",
        }
    }
)
