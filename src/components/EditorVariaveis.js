import React from 'react'
import {FlatList,Text} from 'react-native'
import CampoVariavel from './CampoVariavel'


const EditorVariaveis = props => {

    const {dados,funcao} = props
    let chaves = Object.keys(dados)
    chaves = chaves.filter(procurado => procurado!=='sinal537' && procurado!=='rhf61376')

    return (
        <FlatList 
            data = {chaves}
            renderItem = {({item}) => <CampoVariavel 
                                                    variavel = {item} 
                                                    dados={dados}
                                                    funcao = {funcao}/>}
            keyExtractor = {item => item}
            ItemSeparatorComponent = {() => <Text>+</Text>}
            horizontal={true}
        />
        )
}



export default EditorVariaveis
