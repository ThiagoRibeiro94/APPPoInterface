import React from 'react'
import {View,Text,StyleSheet,Picker,Button,Alert} from 'react-native'
import Linha from '../components/Linha.js'
import MostradorVars from '../components/MostradorVars'
import {connect} from 'react-redux'
import {colocarValor,salvarVd} from '../actions'
import {AdMobBanner} from 'expo-ads-admob'


class VDPage extends React.Component {

    SalvarVariavel(modelo){
        console.log('chamou a função')
        if(modelo.var === ""){
            console.log('caiu no if')
            Alert.alert(
                'Aviso',
                'Você não pode salvar uma variável sem nome !!!'
            )       
        }else{
            console.log('caiu no else')
            const {dispatchSalvarVd} = this.props
            dispatchSalvarVd(modelo)
        }
    }


    IrParaFoPage(){
        const {listaVars, navigation} = this.props
        if(listaVars.length === 0){
            Alert.alert(
                'Aviso',
                'Você tem que salvar pelo menos uma variável de decisão!!!'
            )
        }else{
            navigation.navigate('FOPage')
        }
    }
    
    render(){
        const {modelo,dispatchColocarValor} = this.props
        return (
            <View style={styles.container}>
                <View style={styles.linhaMostrarVarCriadas}>
                    <Text style={styles.texto}>Variáveis de Decisão:</Text>
                    <MostradorVars  />
                </View>
                <View style={styles.cardSalvarVar}>
                    <Linha nome={'Nome da variável'} field={'var'} tipo_teclado = {'default'} ValorDefault = {""}/>
                    <Linha nome={'Limite inferior'} field={'lowBound'} tipo_teclado = {'numeric'} ValorDefault = {"0"}/>
                    <Linha nome={'Limite superior'} field={'upBound'} tipo_teclado = {'numeric'} ValorDefault = {""}/>
                    <View style={styles.caixaDoPicker}>
                        <Text style ={styles.texto}>Tipo Variável:</Text>
                        <Picker 
                            style = {styles.Picker}
                            itemStyle = {styles.texto}
                            selectedValue = {modelo.tipo}
                            onValueChange = {(itemValue) => dispatchColocarValor("tipo",itemValue) }>
                            <Picker.Item label='Continua' value='Continuous'/>
                            <Picker.Item label='Inteira' value='Integer'/>               
                        </Picker>
                    </View>
                    <Button color='#123D1A' title = 'Salvar' onPress= {()=>this.SalvarVariavel(modelo)}/>
                </View>
                <View style={styles.botaoFuncaoObjetivo}>
                    <Button color='#123D1A' title='Continuar' onPress={()=>this.IrParaFoPage()} />
                </View>
                <AdMobBanner
                    bannerSize="banner"
                    adUnitID="ca-app-pub-4141291741681792/1833283278"
                    servePersonalizedAds
                    onDidFailToReceiveAdWithError={console.log('deu ruim nessa merda')} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#c8efc2',
        flex:1
    },
    linhaMostrarVarCriadas: {
        flexDirection:'row',
        elevation:1,
        margin:10,
        borderRadius:5,
        backgroundColor:'white'
    },
    cardSalvarVar:{
        backgroundColor:'white',
        borderRadius:10,
        marginLeft:10,
        marginRight:10,
        marginBottom:10
    },
    botaoFuncaoObjetivo:{
        marginLeft:10,
        marginRight:10,
    },
    texto:{
        fontSize:20,
        fontFamily:'sans-serif-medium',
        paddingLeft:5
    },
    Picker:{
        width:'50%',
        height:20

    },
    caixaDoPicker:{
        flexDirection:'row',
        marginBottom:5
    }
})

const mapStateToProps = state => {
    return {modelo: state.vars, listaVars: state.lista_vars_decisao}
}

const mapDispatchToProps = {
    dispatchColocarValor: colocarValor,
    dispatchSalvarVd:salvarVd,

}

export default connect(mapStateToProps,mapDispatchToProps)(VDPage)