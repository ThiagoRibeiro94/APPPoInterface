import React from 'react'
import {View,Text, FlatList, StyleSheet} from 'react-native'
import {AdMobBanner} from 'expo-ads-admob'


const RespostaPage = props => {

    const {resposta} = props.navigation.state.params
    const chavesVar = Object.keys(resposta.vars_otimas)
    const varOtimas = resposta.vars_otimas
    let respostaPTBr = ''
    console.log(resposta.status)

    switch(resposta.status){
        case 'Unbounded':
            respostaPTBr = 'Ilimitada'
            break
        case 'Optimal':
            respostaPTBr = 'Ótima'
            break
        case 'Undefined':
            break
        case 'Infeasible':
            break
        default:
            respostaPTBr = 'Erro'
    }
    return (
        <View style = {styles.caixa}>
            <View style = {styles.cardTipoSolucao}>
                <Text style={styles.texto}>Essa é uma solução: {respostaPTBr}</Text>
            </View>
            <View style={styles.cardTipoSolucao}>
                <Text style={styles.texto}>Função Objetivo ótima: {resposta.fo_otima}</Text>
            </View>
            <View style={styles.VDSolucao}>
                <Text style={styles.textoTitulo}>Valor ótimo das variáveis de decisão</Text>
                <FlatList 
                    data= {chavesVar}
                    renderItem = {({item}) => <Text style={styles.texto}> {item} = {varOtimas[item]}</Text>}
                    keyExtractor = {(item,index) => `${item=varOtimas[item]}+${index}`}/>
            </View>
            <AdMobBanner
                    bannerSize="banner"
                    adUnitID="ca-app-pub-4141291741681792/1833283278"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={console.log('deu ruim nessa merda')} />
        </View>
    )
}

const styles = StyleSheet.create({
    caixa:{
        backgroundColor:'#c8efc2',
        flex:1
    },
    cardTipoSolucao:{
        backgroundColor:'white',
        margin:10,
        borderRadius:5,
        elevation:1
    },
    texto:{
        fontSize:20,
        paddingLeft:5,
        paddingTop:5,
        paddingBottom:5
    },
    textoTitulo:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    VDSolucao:{
        backgroundColor:'white',
        margin:10,
        borderRadius:5,
        elevation:1,
        height:200
    }
})


export default RespostaPage