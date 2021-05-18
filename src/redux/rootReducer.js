import {combineReducers} from "redux"
import courseReducer from "./course/courseReducers";
import userReducer from './user/userReducers'

const rootReducer=combineReducers({
    user:userReducer,
    course:courseReducer
})

export default rootReducer;