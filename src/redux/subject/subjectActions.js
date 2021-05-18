import {FETCH_SUBJECT,FETCH_SUBJECT_SUCCESS,FETCH_SUBJECT_FAILURE} from './subjectTypes'
import API from '../../api'

export const fetch_subject=()=>{
    return{
        action:FETCH_SUBJECT
    }
}

const fetch_subject_success=(data)=>{
    return{
        action:FETCH_SUBJECT_SUCCESS,
        payload:data
    }
}

const fetch_subject_failure=(data)=>{
    return{
        action:FETCH_SUBJECT_FAILURE,
        payload:data
    }
}

export const fetchSubjects=(course_id)=>{
    return (dispatch)=>{
        API.get(`subject/list?id=${course_id}`)
        .then(response=>{
            let responseData=response.data
            console.log(responseData)
        }).catch(error=>{
            let errormsg=error.message
            console.log(errormsg)
        })
    }
}