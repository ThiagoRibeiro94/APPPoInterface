import React from 'react'
import {FlatList,Text,View,StyleSheet} from 'react-native'
import {connect} from 'react-redux'
import { excluirRest,editarRest } from '../actions'
import Botao from '../components/Botao'

const MostradorModelo = props => {

        const {fo,tipoProblema,listaRest,dispatchExcluirRest,dispatchEditarRest} = props
        const chaves = Object.keys(fo)
        const valores = Object.values(fo)
        return (
            <View style={styles.caixaModelo}>
                    <View style={styles.flatFO}>
                        <Text style ={styles.textos}>{tipoProblema} </Text>
                        <FlatList 
                        data={chaves}
                        renderItem = {({item,index}) => <Text style ={styles.textos}>{valores[index]}*{item}</Text> }
                        keyExtractor = {item => item}
                        horizontal={true}
                        ItemSeparatorComponent={()=><Text> + </Text>}/>
                    </View>
                    <View style={styles.flatRest}>
                        <Text style={styles.textos}>Sujeito as restrições:</Text>
                        <FlatList 
                            data={listaRest}
                            renderItem = {({item}) => {
                                let chavesRest = Object.keys(item)
                                let lhs = chavesRest.filter(procurado => procurado!=='sinal537' && procurado!=='rhf61376')
                                const compararIndex = (lhs.length) - 1
                                lhs = lhs.map((vd,index) => `${item[vd]}*${vd} ${index ===compararIndex?"":"+"}`)
                                lhs = lhs.toString()
                                restricao = `${lhs} ${item['sinal537']} ${item['rhf61376']}`
                                restricao = restricao.replace(/,/g,'')
                                return(<Botao 
                                            label={restricao} 
                                            item = {item} 
                                            funcao ={()=>dispatchEditarRest(item)} 
                                            funcaoLongPress={()=>dispatchExcluirRest(item)}/>)
                            }}
                            keyExtractor = {(item,index) => `${item['rhf61376']}${index}`}/>
                    </View>
            </View>
        )
    }

const styles = StyleSheet.create({
    caixaModelo:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        borderRadius:5,
        backgroundColor:'white',
        elevation:1
    },
    flatFO:{
        margin:10,
        flexDirection:'row'
    },
    flatRest:{
        marginLeft:10,
        marginRight:10,
        marginBottom:10,
        height:200
    },
    textos:{
        fontSize:20
    }
})

const mapStateToProps = state => {
    return {fo: state.fo,tipoProblema:state.tipo_problema, listaRest: state.listaRest}
}

const mapDispatchToProps = {
    dispatchExcluirRest:excluirRest,
    dispatchEditarRest:editarRest
}

export default connect(mapStateToProps,mapDispatchToProps)(MostradorModelo)