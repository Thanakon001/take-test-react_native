import React from 'react'
import { View, TextInput, StyleSheet, Button, Alert, Text } from 'react-native'

export default function BodyApp() {
    const [keyword, setKeyword] = React.useState("")
    return (
        <View style={style.form}>
            <TextInput style={style.inputForm} value={keyword} onChangeText={setKeyword} />
            <Button title='ค้นหา' color='#f54900' onPress={() => Alert.alert(keyword)} />
        </View>
    )
}

const style = StyleSheet.create(
    {
        inputForm: {
            borderStyle: 'solid',
            borderWidth: 1,
            borderColor: '#333',
            width: 250,
            height: 40,
            borderRadius: 4
        },
        form: {
            display: 'flex',
            gap: 10,
            marginTop: 15
        }
    }
)
