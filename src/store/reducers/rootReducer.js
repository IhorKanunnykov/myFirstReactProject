import { combineReducers, createStore } from 'redux'
import quizReducer from './quiz'
import createReduser from './create'

export default combineReducers({
    quiz: quizReducer,
    create: createReduser
})