import * as React from 'react'

import {View, StyleSheet, TextInput, Text, Keyboard, Image, TouchableOpacity, Button, Alert} from 'react-native'
import { TouchableNativeFeedback } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Icon } from '../constants'
import {COLORS, SIZES} from '../constants/Theme'
import IMAGES from '../constants/Images'
import {eye} from '../constants/Icons'
export default function Login(){
    const [inputID, setInputID] = React.useState('')
    const [inputPassword, setInputPassword] = React.useState('')
    const [showPassword, setShowPassword] = React.useState(true)


    
    const handleLogin = (async function () {
        const UEH_API = require('../modules/UEH_API')
        const API = new UEH_API();

        const login = await API.fetchHiddenParam()

    }) 
    return(
        <TouchableNativeFeedback onPress={Keyboard.dismiss}>

    <View style={styles.container}>
        <Text style={{fontSize: SIZES.h1, fontWeight: 'bold', textAlign: 'left', width: SIZES.width -100}}>Welcome back!</Text>
        <Text style={{color: COLORS.darkGray, fontSize: SIZES.h3, fontWeight: '400', textAlign: 'left', width: SIZES.width -100}}>Login to continue</Text>
        <Image source={IMAGES.UEH_LOGO} style={{width: 200, height: 200, marginVertical: 30 }} />
        <View style={styles.inputContainer}>
            <Text style={styles.absoluteLabel}>Mã số sinh viên</Text>
            <TextInput  value={inputID} keyboardType='number-pad' onChangeText={text => setInputID(text)} style={styles.inputForm}></TextInput>
        </View>

        <View style={styles.inputContainer}>

            <Text style={styles.absoluteLabel}>Mật khẩu</Text>
            <TextInput secureTextEntry={showPassword}  value={inputPassword} onChangeText={text => setInputPassword(text)} style={styles.inputForm}></TextInput>
            <TouchableOpacity onPress={e => setShowPassword(!showPassword)} style={{position: 'absolute', right:0, top: 10}}>
                <Image style={{width: 32, height: 32}} source={eye} />
            </TouchableOpacity>
            </View>

        <TouchableOpacity style={styles.buttonStyle} onPress={handleLogin}>
            <Text style={{color: COLORS.white, fontSize: SIZES.font}}>Đăng Nhập</Text>
        </TouchableOpacity>
    </View>
        </TouchableNativeFeedback>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 100,
        flex: 1,
        alignItems: 'center',
        padding: 20,
        backgroundColor: COLORS.white
    },
    inputContainer:{
        marginVertical: 10,
        width: SIZES.width -100,
        padding: SIZES.padding * 1.5,
        paddingLeft: 0,
        borderBottomWidth: 0.5,
        height: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start'
    },
    inputForm: {
        width: '100%',
        borderBottomColor: COLORS.darkGray,
        height: 50
    },
    absoluteLabel: {
        position: 'absolute',
        top:SIZES.padding * 1.5,
        left: 0,
        color: COLORS.darkGray,
        transform :[{translateY: -25}]

    },
    buttonStyle: {
        marginTop: 20,
        backgroundColor: COLORS.primary,
        width: SIZES.width -100,
        height: 60,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    } 
})

