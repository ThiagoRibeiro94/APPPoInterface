import {MUDAR_PICKER_FO} from '../actions'


export default function MINMAXReducer(state = 'Min',action){
    switch(action.type){
        case MUDAR_PICKER_FO:
            return action.text
        default:
            return state
    }
}