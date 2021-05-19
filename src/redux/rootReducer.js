import {combineReducers} from "redux"
import courseReducer from "./course/courseReducers";
import subjectReducers from "./subject/subjectReducers";
import userReducer from './user/userReducers'

const rootReducer=combineReducers({
    user:userReducer,
    course:courseReducer,
    subject:subjectReducers
})

export default rootReducer;