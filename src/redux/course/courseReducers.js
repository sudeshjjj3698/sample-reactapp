import {DELETE_COURSE,CREATE_COURSE,CREATE_COURSE_SUCCESS,CREATE_COURSE_FAILURE,FETCH_COURSE,FETCH_COURSE_SUCCESS,FETCH_COURSE_FAILURE} from './courseTypes'
const initialState={
    loading:true,
    error:'',
    data:{},
    courses:[]
}

const courseReducer=(state=initialState,action)=>{
    switch(action.type){
        case CREATE_COURSE:
            return{
                ...state,
                loading:true
            }
        case CREATE_COURSE_SUCCESS:
            return{
                ...state,
                loading:false,
                data:action.payload
            }
        case CREATE_COURSE_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        case FETCH_COURSE:
            return{
                ...state,
                loading:true
            }
        case FETCH_COURSE_SUCCESS:
            return{
                ...state,
                loading:false,
                courses:action.payload,
                error:''
            }
        case FETCH_COURSE_FAILURE:
            return{
                ...state,
                loading:false,
                courses:[],
                error:action.payload
            }
        case DELETE_COURSE:
            return{
                ...state
            }
    default:return state
    }

}

export default courseReducer;