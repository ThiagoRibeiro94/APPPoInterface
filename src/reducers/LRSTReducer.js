import {SALVAR_REST,EXCLUIR_REST,EDITAR_REST} from '../actions'

export default function LRSTReducer(state=[],action){
    switch(action.type){
        case SALVAR_REST:
            const pedacoState = action.restSaved
            const novoState = [...state,pedacoState]
            return novoState
        case EDITAR_REST:
            stateSemEditada = state.filter(procurado => procurado !== action.restEditar)
            return stateSemEditada
        case EXCLUIR_REST:
            stateSemExcluido = state.filter(procurado => procurado !== action.restExcluir)
            return stateSemExcluido
        default:
            return state

    }
}

