import React from 'react'
import {View,Text,Picker,TextInput,StyleSheet,Button, ActivityIndicator,Alert} from 'react-native'
import {connect} from 'react-redux'
import {
    mudarPickerFo,
    colocarValorFo,
    colocarValorRest,
    mudarPickerRest,
    salvarRest,
    limparRest
    } from '../actions'
import MostradorModelo from '../components/MostradorModelo'
import EditorVariaveis from '../components/EditorVariaveis'
import axios from 'axios'


class FOPage extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            forcado:true,
            loading:false
        }
    }

    limparRestricao(){
        const {dispatchLimparRest} = this.props
        dispatchLimparRest()
    }


    salvarRestricao(restricao){
        const {dispatchSalvarRest} = this.props

        if(restricao.rhf61376 === ''){
            Alert.alert(
                'Aviso',
                'Toda restrição tem que ter um valor após os sinal de comparação!!!'
            )
        } else {
        dispatchSalvarRest(restricao)
        this.limparRestricao()
        }
    }

    transformarRestricao(obj){
        let chavesRest = Object.keys(obj)
        let lhs = chavesRest.filter(procurado => procurado!=='sinal537' && procurado!=='rhf61376')
        const compararIndex = (lhs.length) - 1
        lhs = lhs.map((vd,index) => `${obj[vd]}*${vd} ${index ===compararIndex?"":"+"}`)
        lhs = lhs.toString()
        restricao = `${lhs}${obj['sinal537']}${obj['rhf61376']}`
        restricao = restricao.replace(/,/g,'')
        restricao = restricao.replace(/\s/g, '')
        return restricao
    }

    transformaFO(obj){
        let stringFo = ''
        let contador = 0 
        for (field in obj){
            if(contador===0){
                stringFo =`${obj[field]}*${field}`
            }else{
                stringFo = stringFo + `+ ${obj[field]}*${field}`
            }
            contador +=1
        }
        stringFo = stringFo.replace(/\s/g, '')
        return stringFo
    }

    TransformaVariavelDecisao(obj){
        let novoObjeto = obj
        novoObjeto['lowBound'] = Number(novoObjeto['lowBound'])

        if(novoObjeto['upBound']===""){
            novoObjeto['upBound'] = ''
        }else{
            novoObjeto['upBound'] = Number(novoObjeto['upBound'])
        }
        return novoObjeto

    }


    solucaoModelo(tipoProblema,listarestricao,variaveis,funcaoObjetivo){

        const {navigation} = this.props
        this.setState({loading:true})
        let enviarApi = {
            tipo_problema: '', 
            fo: '', 
            restricao:[], 
            vars: []
        }
        listarestricao = listarestricao.map(proc => {
            return this.transformarRestricao(proc)
        })

        variaveis = variaveis.map(proc => {
            return this.TransformaVariavelDecisao(proc)
        })

        enviarApi['tipo_problema'] = tipoProblema
        enviarApi['restricao'] = listarestricao
        enviarApi['fo'] = this.transformaFO(funcaoObjetivo)
        enviarApi['vars'] = variaveis
        enviarApiString = JSON.stringify(enviarApi)



        axios.post(`https://app-po-api-ganhar-dinheiro.herokuapp.com/resultado/${enviarApiString}`)
            .then((response)=> {
                this.setState({loading:false})
                navigation.navigate("RespostaPage",{resposta:response.data})
            })
            .catch (error => {
                this.setState({loading:false})
                console.log(error)
            })
    }


    render(){
        const{
                tipoProblema,
                dispatchMudarPickerFo,
                fo,
                rest,
                listaRest,
                dispatchColocarValorFo,
                dispatchColocarValorRest,
                dispatchMudarPickerRest,
                lista_vars
            } = this.props

        return (
            <View style={styles.caixa}>
                <View style = {styles.fo}>
                    <Text style = {styles.textoTitulo}> Editar Função Objetivo</Text>
                    <Picker
                        selectedValue = {tipoProblema}
                        onValueChange = {(itemValue) => dispatchMudarPickerFo(itemValue)}>
                        <Picker.Item label='Maximizar' value='Max'/>
                        <Picker.Item label='Minimizar' value='Min'/>
                    </Picker>
                    <EditorVariaveis dados = {fo} funcao = {(field,value)=>dispatchColocarValorFo(field,value)} />
                </View>
                <View style= {styles.rest} >
                    <Text style = {styles.textoTitulo}> Editar Restrições</Text>
                    <View style= {styles.restricao}>
                        <View style={styles.restEditor}>
                            <EditorVariaveis dados={rest} funcao={(field,value) =>dispatchColocarValorRest(field,value)}/>
                        </View>
                        <Picker
                            style = {styles.restPicker}
                            selectedValue = {rest.sinal537}
                            onValueChange = {(itemValue) =>dispatchMudarPickerRest(itemValue)}>
                            <Picker.Item label='>=' value='>='/>
                            <Picker.Item label='<=' value='<='/>
                            <Picker.Item label='=' value='=='/>
                        </Picker>
                        <TextInput 
                            style = {styles.restTextInput}
                            value={rest.rhf61376==="0"?"":rest.rhf61376} 
                            keyboardType='numeric' 
                            onChangeText={value => dispatchColocarValorRest('rhf61376',value)}
                            underlineColorAndroid='#00008b'
                            />
                    </View>
                    <Button color = '#123D1A' title='Salvar restrição' onPress={()=>{
                                this.salvarRestricao(rest)
                            }}/>
                </View>
                <MostradorModelo/>
                <View style={styles.BtnSolucao}>
                    {this.state.loading
                    ?<ActivityIndicator />
                    :<Button color = '#123D1A' title='ir para solução' onPress={()=>this.solucaoModelo(tipoProblema,listaRest,lista_vars,fo)}/>
                    
                    }
                </View>
            
            </View>
        )}
}

const styles = StyleSheet.create({
    restricao: {
        flexDirection:'row',
    },
    restEditor:{
        flex:4
    },
    restPicker:{
        flex:2
    },
    restTextInput:{
        flex:1,
        fontSize:20
    },
    fo:{
        margin:10,
        borderRadius:5,
        backgroundColor:'white'
    },
    rest:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        borderRadius:5,
        backgroundColor:'white'
    },
    textoTitulo:{
        fontSize:20,
        fontWeight:'bold',
        textAlign:'center'
    },
    caixa:{
        backgroundColor:'#c8efc2',
        flex:1
    },
    BtnSolucao:{
        marginLeft:10,
        marginRight:10,
    }
})


const mapStateToProps = state => {
    return {
        tipoProblema: state.tipo_problema,
        fo: state.fo,
        rest:state.restricao,
        listaRest:state.listaRest,
        lista_vars: state.lista_vars_decisao
    }
}

const mapDispatchToProps = {
    dispatchMudarPickerFo: mudarPickerFo,
    dispatchColocarValorFo:colocarValorFo,
    dispatchColocarValorRest:colocarValorRest,
    dispatchMudarPickerRest:mudarPickerRest,
    dispatchSalvarRest:salvarRest,
    dispatchLimparRest:limparRest
}

export default connect(mapStateToProps,mapDispatchToProps)(FOPage)

