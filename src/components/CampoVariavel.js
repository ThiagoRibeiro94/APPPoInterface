import React from 'react'
import {Text,View,TextInput,StyleSheet} from 'react-native'


const CampoVariavel = props => {
    const {variavel,dados,funcao} =props
    return (
        <View style = {styles.caixaCampoVariavel}>
            <TextInput 
                style = {styles.textoVDTI}
                value={dados[variavel]==='0'?'':dados[variavel]}
                onChangeText={(value)=>funcao(variavel,value)}
                keyboardType='numeric' 
                underlineColorAndroid='#00008b'/>
            <Text style ={styles.textoVD}>*</Text>
            <Text style ={styles.textoVD}>{variavel}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    caixaCampoVariavel:{
        flexDirection:'row'
    },
    textoVD:{
        fontSize:20,
        paddingBottom:5
    },
    textoVDTI:{
        fontSize:20,
        paddingBottom:20,
        marginLeft:10
    }
})


export default CampoVariavel