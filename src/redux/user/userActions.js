import API from '../../api';
import {REGISTER_USER,REGISTER_USER_SUCCESS,REGISTER_USER_FAILURE,CLEAR_USER_STATE,
    LOGIN_USER,LOGIN_USER_SUCCESS,LOGIN_USER_FAILURE} from './userTypes'
export const register_user=()=>{
    return{
        type:REGISTER_USER
    }
}

const register_user_success=(user)=>{
    return{
        type:REGISTER_USER_SUCCESS,
        payload:user
    }
}

const register_user_failure=(error)=>{
    return{
        type:REGISTER_USER_FAILURE,
        payload:error
    }
}

export const login_user=()=>{
    return{
        type:LOGIN_USER
    }
}

const login_user_success=(token)=>{
    return{
        type:LOGIN_USER_SUCCESS,
        payload:token
    }
}

const login_user_failure=(error)=>{
    return{
        type:LOGIN_USER_FAILURE,
        payload:error
    }
}

export const clear_user_state=()=>{
    return {
        type:CLEAR_USER_STATE
    }
}

export const createUser=(userData)=>{
    //console.log('userData',userData)
    return (dispatch)=>{
        dispatch(register_user())
        API.post("user/create",
            {...userData}
        ).then(respone=>{
            let responseData=respone.data
            dispatch(register_user_success(responseData))
            //console.log(respone)
        }).catch(error=>{
            let errorMessage=error.message
            dispatch(register_user_failure(errorMessage))
           // console.log(error)
        })
    }
}

export const loginUser=(loginData)=>{
    //console.log('userData',userData)
    return (dispatch)=>{
        dispatch(login_user())
        API.post("user/signin",
            {...loginData}
        ).then(respone=>{
            let responseData=respone.data
            //console.log('login response',responseData);
            if(responseData.success==true)
            {
                localStorage.token=responseData.message
                dispatch(login_user_success(responseData.message))
            }
            else{
                //console.log('success response',responseData.message)
                dispatch(login_user_failure(responseData.message))
            }
        }).catch(error=>{
            let errorMessage=error.message
            dispatch(login_user_failure(errorMessage))
            //console.log(error)
        })
    }
}