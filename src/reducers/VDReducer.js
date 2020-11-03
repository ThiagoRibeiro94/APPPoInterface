import {COLOCAR_VALOR,SALVAR_VD,EDITAR_VAR} from '../actions'

const INITIAL_STATE = {
    var:"",
    lowBound:'0',
    upBound:"",
    tipo:"Continuous"
}

export default function VDReducer(state = INITIAL_STATE,action){
    switch(action.type){
        case COLOCAR_VALOR:
            let newState = {...state}
            newState[action.field] = action.value
            return newState
        case EDITAR_VAR:
            return action.vdEdit
        case SALVAR_VD:
            return INITIAL_STATE
        default:
            return INITIAL_STATE
    }
}