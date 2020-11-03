import React from 'react'
import {View,FlatList,Text,Alert} from 'react-native'
import {connect} from 'react-redux'
import Botao from './Botao'
import {editarVar,excluirVar} from '../actions'




class MostradorVars extends React.Component {

    ExcluirItem(item){
        const {dispatchExcluir} = this.props
        Alert.alert(
            'Aviso',
            'Realmente deseja excluir?',
            [
                {
                    text : 'Não',
                },
                {
                    text: 'Sim',
                    onPress:() => dispatchExcluir(item)
                }
            ]
        )

    }

    render(){
        const {dadosVD,dispatchEditarVar} = this.props
        return (
            <View>
                <FlatList 
                    data={dadosVD}
                    renderItem = {({item}) => <Botao label={item.var} item = {item} funcao ={()=>dispatchEditarVar(item)} funcaoLongPress={()=>this.ExcluirItem(item)}/>}
                    keyExtractor = {item => item.var}
                    horizontal={true}
                    ItemSeparatorComponent={()=><Text>  </Text>}/>
            </View>
        )
    }
}

const MapStateToProps = state =>{
    return {dadosVD: state.lista_vars_decisao}
}

const MapDispatchToProps = {
    dispatchEditarVar: editarVar,
    dispatchExcluir: excluirVar
}

export default connect(MapStateToProps,MapDispatchToProps)(MostradorVars)
