import React from 'react'
import {TouchableOpacity,Text, StyleSheet} from 'react-native'


const Botao = props => {

    const {label,funcao,funcaoLongPress} = props
    return (
        <TouchableOpacity onPress={funcao} onLongPress={funcaoLongPress}>
            <Text style={styles.StyloBtn}>{label}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    StyloBtn:{
        fontSize:20,
        marginLeft:5,
        fontWeight:'bold',
        color:'#123D1A'
    }
})

export default Botao