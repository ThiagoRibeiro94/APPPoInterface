import {combineReducers} from 'redux'
import VDReducer from './VDReducer'
import LVDReducer from './LVDReducer'
import MINMAXReducer from './MINMAXReducer'
import FOReducer from './FOReducer'
import RSTReducer from './RSTReducer'
import LRSTReducer from './LRSTReducer'

export default combineReducers({
    vars:VDReducer,
    lista_vars_decisao:LVDReducer,
    tipo_problema:MINMAXReducer,
    fo:FOReducer,
    restricao:RSTReducer,
    listaRest:LRSTReducer
})