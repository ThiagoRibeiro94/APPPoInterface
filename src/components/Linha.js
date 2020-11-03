import React from 'react'
import {Text,View,StyleSheet,TextInput} from 'react-native'
import {connect} from 'react-redux'
import {colocarValor} from '../actions'

const Linha = props => {
    const {nome,field,varDecisao,dispatchColocarValor,tipo_teclado,ValorDefault} = props
    return(
        <View style={styles.container}>
            <Text style={styles.texto}>{nome}:</Text>
            <View style={styles.caixaTextInput}>
                <TextInput
                    style={styles.textoInputado}
                    value={varDecisao[field]==='0'?'':varDecisao[field]}
                    placeholder={ValorDefault}
                    onChangeText={value => dispatchColocarValor(field,value)}
                    keyboardType={tipo_teclado}
                    underlineColorAndroid='#123D1A'
                    autoCapitalize='none'/>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        alignItems:"stretch"
    },
    texto:{
        fontSize:20,
        fontFamily:'sans-serif-medium',
        paddingLeft:5,
    },
    textoInputado:{
        width:'100%',
        fontSize:20,
        fontFamily:'sans-serif-medium',
        paddingLeft:5,
        paddingBottom:10
    },
    caixaTextInput:{
        flexGrow:1
    }
})

const mapStateToProps = state => {
    return {varDecisao: state.vars}
}

const mapDispatchToProps = {
    dispatchColocarValor: colocarValor
}


export default connect(mapStateToProps,mapDispatchToProps)(Linha)

