import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import globalReducer from './reducers/global.reducer'

const rootReducer = combineReducers({
    global: globalReducer
})


const store = createStore(rootReducer, applyMiddleware(thunk))

export default store;