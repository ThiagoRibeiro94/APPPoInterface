import {SALVAR_VD,COLOCAR_VALOR_FO,EXCLUIR_VAR} from '../actions'


export default function FOReducer(state = {},action){
    switch(action.type){
        case SALVAR_VD:
            const newState = {...state,[action.vd.var]:'0'}
            return newState 

        case COLOCAR_VALOR_FO:
            const novoState = {...state}
            if (action.value===''){
                novoState[action.field]='0'
            }else{
                novoState[action.field] = action.value  
            }
            return novoState
        
        case EXCLUIR_VAR:
            let ExcluirState = state
            let campo = action.vdExcluir.var
            delete ExcluirState[campo]
            return ExcluirState

        default:
            return state
    }
}