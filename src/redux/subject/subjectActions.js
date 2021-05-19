import {FETCH_SUBJECT,FETCH_SUBJECT_SUCCESS,FETCH_SUBJECT_FAILURE} from './subjectTypes'
import API from '../../api'

export const fetch_subject=()=>{
    return{
        type:FETCH_SUBJECT
    }
}

const fetch_subject_success=(data)=>{
    return{
        type:FETCH_SUBJECT_SUCCESS,
        payload:data
    }
}

const fetch_subject_failure=(data)=>{
    return{
        type:FETCH_SUBJECT_FAILURE,
        payload:data
    }
}

export const fetchSubjects=(course_id)=>{
    return (dispatch)=>{
        dispatch(fetch_subject())
        API.get(`subject/list?id=${course_id}`)
        .then(response=>{
            let responseData=response.data
            if(responseData.success)
            {
                dispatch(fetch_subject_success(responseData.message.Subjects))
            }else
            {
                dispatch(fetch_subject_failure(responseData.message))
            }
        }).catch(error=>{
            let errormsg=error.message
            dispatch(fetch_subject_failure(errormsg))
        })
    }
}

export const deleteSubject=(subject_id,course_id)=>{
    return (dispatch)=>{
        API.delete(`subject/delete?id=${subject_id}&course=${course_id}`)
        .then(response=>{
            let responseData=response.data
            dispatch(fetchSubjects(course_id))
        }).catch(error=>{
            let errorMsg=error.message
        })
    }
}