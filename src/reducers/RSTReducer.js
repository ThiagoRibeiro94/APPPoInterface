import {SALVAR_VD,COLOCAR_VALOR_REST,MUDAR_PICKER_REST,LIMPAR_REST,EDITAR_REST} from '../actions'

const INITIAL_STATE = {
    sinal537:'<=',
    rhf61376:''
}

let INITIAL_STATE_COMPLETO = {
    sinal537:'<=',
    rhf61376:''
}

export default function RSTReducer(state=INITIAL_STATE,action){
    switch(action.type){
        case SALVAR_VD:
            INITIAL_STATE_COMPLETO[action.vd.var] = '0'
            return INITIAL_STATE_COMPLETO
        
        case COLOCAR_VALOR_REST:
            const novoState = {...state}
            if (action.value===''){
                novoState[action.field]='0'
            }else{
                novoState[action.field] = action.value  
            }
            return novoState
        case MUDAR_PICKER_REST:
            const mprState = {...state}
            mprState['sinal537'] = action.text
            return mprState

        case LIMPAR_REST:
            return INITIAL_STATE_COMPLETO
        case EDITAR_REST:
            return action.restEditar
        default:
            return state
    }
}