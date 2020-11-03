import {SALVAR_VD, EXCLUIR_VAR} from '../actions'
import {Alert} from 'react-native'


export default function VDReducer(state = [],action){
    switch(action.type){
        case SALVAR_VD:


        let novoState = []
        if (state.length == 0){
            newState = [...state,action.vd]
            novoState = newState
        }else{
            let newState = state.map(antigo => {
                if(antigo.var === action.vd.var){
                    Alert.alert(
                        'Aviso',
                        'Você está salvando duas variáveis com o mesmo nome. Ao fazer isso, você apenas está atualizando os dados da primeira variável salva!!!'
                    )
                    return action.vd
                }else{
                    return antigo
                }
            })
            novoState = newState
        }

        if (novoState.indexOf(action.vd) == -1){
            novoState.push(action.vd)
            return novoState
        }else{
            return novoState
        }

        case EXCLUIR_VAR:
            return state.filter(procurado => action.vdExcluir!==procurado)
        default:
            return state
    }
}

