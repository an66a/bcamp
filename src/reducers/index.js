import { combineReducers } from 'redux'
import data from './data'
import navbar from './navbar'
import member from './member'

export default combineReducers({
    data,
    navbar,
    member
})