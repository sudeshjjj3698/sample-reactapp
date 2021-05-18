import {REGISTER_USER,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE,CLEAR_USER_STATE,LOGIN_USER,LOGIN_USER_SUCCESS,LOGIN_USER_FAILURE} from './userTypes'
const initialState={
    loading:false,
    user:{},
    userlogin:{},
    error:"",
    token:""
}

const userReducer=(state=initialState,action)=>{
    switch(action.type){
        case REGISTER_USER:
            return{
                ...state,
                loading:true
            }
        case REGISTER_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                user:action.payload
            }
        case REGISTER_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case CLEAR_USER_STATE:
            return {
                ...initialState
            }
        case LOGIN_USER:
            return{
                ...state,
                loading:true
            }
        case LOGIN_USER_SUCCESS:
            return{
                ...state,
                loading:false,
                token:action.payload,
                error:''
            }
        case LOGIN_USER_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload,
                token:''
            }
        case CLEAR_USER_STATE:
            return {
                ...initialState
            }
        default:
            return state
    }
}

export default userReducer