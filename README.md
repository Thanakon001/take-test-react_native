import React from 'react'
import { View, TextInput, StyleSheet, Button, Alert, Text, ScrollView } from 'react-native'
import * as SQLite from 'expo-sqlite';

export default function BodyApp() {
    const [keyword, setKeyword] = React.useState("")
    const [content, setContent] = React.useState("")
    const [books, setBooks] = React.useState([])

    const setup = async () => {
        let db = await SQLite.openDatabaseAsync('db_library')
        db.execAsync('PRAGMA journal_mode = WAL;')
        db.execAsync(`
            CREATE TABLE IF NOT EXISTS tb_book(
                b_id TEXT PRIMARY KEY NOT NULL,
                b_name TEXT NOT NULL,
                b_writer TEXT NOT NULL,
                b_category TEXT NOT NULL,
                b_price REAL
            )
        `)
    }

    const setData = async () => {
        let db = await SQLite.openDatabaseAsync('db_library')
        let allRow

        if (content === 'all') {
            allRow = await db.getAllAsync(`
                SELECT * FROM tb_book WHERE b_id LIKE '%${keyword}%'
                b_name LIKE '%${keyword}%'
                b_writer LIKE '%${keyword}%'
            `)
        } else {
            allRow = await db.getAllAsync(`
                SELECT * FROM tb_book WHERE ${content} LIKE '%${keyword}%'
            `)
        }


        if (allRow.length > 0) {
            setBooks(allRow)
        } else {
            await db.execAsync(
                `INSERT INTO tb_book (b_id, b_name, b_writer, b_category, b_price) VALUES
                ('B00001', 'คู่มือดารสอบรับราชการ', 'สมศักดิ์ ตั้งใจ', '1', 325),
                ('B00002', 'แฮร์รี่ พอตเตอร์', 'J.K Rowling', '2', 359),
                ('B00003', 'เย็บ ปัก ถักร้อย', 'สะอาด อิ่มสุข', '3', 249),
                ('B00004', 'เจ้าชายน้อย', 'อ็องตวน เดอ แซ็ง', '2', 355),
                ('B00005', 'การเขียนโปรแกรมคอมพิวเตอร์', 'กิ่งแก้ว กลิ่นหอม', '1', 329);`
            )
            Alert.alert('เพิ่มข้อมูลจำลองเสร็จสิ้น')
        }
    }

    React.useEffect(() => { setup(), setData() }, [content])

    return (
        <View>
            {/* กล่องกรอกข้อมูล */}
            <View style={style.form}>
                <TextInput style={style.inputForm} value={keyword} onChangeText={setKeyword} />
                <Button title='ค้นหา' color='#8e44ad' onPress={() => Alert.alert(keyword)} />
            </View>

            {/* กล่องแท็ปเมนูให้เลือก */}
            <View style={style.tabs}>
                <Button title='ทั้งหมด' color='#8e44ad' onPress={() => setContent('all')} />
                <Button title='รหัสหนังสือ' color='#8e44ad' onPress={() => setContent('b_id')} />
                <Button title='ชื่อหนังสือ' color='#8e44ad' onPress={() => setContent('b_name')} />
                <Button title='นักเขียน' color='#8e44ad' onPress={() => setContent('b_writer')} />
            </View>

            <View>
                <ScrollView>
                    {/* กล่อง item */}
                    {books && books?.map((item) => (
                        <View style={style.item} key={item.b_id}>
                            <Text>รหัสหนังสือ : {item.b_id}</Text>
                            <Text>ชื่อหนังสือ : {item.b_name}</Text>
                            <Text>นักเขียน : {item.b_writer}</Text>
                            <Text>หมวดหมู่ : {item.b_category}</Text>
                            <Text>ราคา : {item.b_price}</Text>
                        </View>
                    ))}
                </ScrollView>
            </View>
        </View>
    )
}

const style = StyleSheet.create(
    {
        inputForm: {
            borderStyle: 'solid',
            borderWidth: 0.3,
            borderColor: '#333',
            width: 250,
            height: 40,
            borderRadius: 4
        },
        form: {
            display: 'flex',
            flexDirection: 'row',
            gap: 10,
            marginTop: 15
        },

        tabs: {
            display: 'flex',
            flexDirection: 'row',
            borderBottomWidth: 2,
            borderBottomColor: '#8e44ad',
            marginTop: 15,
            paddingBottom: 5,
            gap: 5
        },

        item: {
            margin: 5,
            padding: 5,
            borderWidth: 0.5,
            borderColor: '#8e44ad',
            borderRadius: 4
        }
    }
)
