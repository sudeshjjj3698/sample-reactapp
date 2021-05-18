import {FETCH_SUBJECT,FETCH_SUBJECT_SUCCESS,FETCH_SUBJECT_FAILURE} from './subjectTypes'
const initialState={
    loading:false,
    subjects:[],
    error:""
}

const subjectReducers=(state=initialState,action)=>{
    switch(action.type){
        case FETCH_SUBJECT:
            return{
                ...state,
                loading:true
            }
        case FETCH_SUBJECT_SUCCESS:
            return{
                ...state,
                loading:false,
                subjects:action.payload
            }
        case FETCH_SUBJECT_FAILURE:
            return{
                ...state,
                loading:false,
                error:action.payload
            }
        default:return state;
    }
}

export default subjectReducers;
