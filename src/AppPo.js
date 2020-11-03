import React from 'react'
import Router from './Router'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import rootReducer from './reducers'

store = createStore(rootReducer)

const appPo = props => {
    return (
        <Provider store={store}>
            <Router />
        </Provider>
    )
}

export default appPo