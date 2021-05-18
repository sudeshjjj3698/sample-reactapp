import {CREATE_COURSE,CREATE_COURSE_SUCCESS,CREATE_COURSE_FAILURE, FETCH_COURSE,FETCH_COURSE_SUCCESS,FETCH_COURSE_FAILURE} from './courseTypes'
import API from '../../api'


export const create_course=()=>{
    return{
        type:CREATE_COURSE
    }
}

const create_course_success=(data)=>{
    return{
        type:CREATE_COURSE_SUCCESS,
        payload:data
    }
}

const create_course_failure=(data)=>{
    return{
        type:CREATE_COURSE_FAILURE,
        payload:data
    }
}

export const fetch_courses=()=>{
    return{
        type:FETCH_COURSE
    }
}

const fetch_courses_success=(data)=>{
    return{
        type:FETCH_COURSE_SUCCESS,
        payload:data
    }
}

const fetch_courses_failure=(data)=>{
    return{
        type:FETCH_COURSE_FAILURE,
        payload:data
    }
}

export const deleteCourse=(id)=>{
    return (dispatch)=>{
        API.delete(`course/delete?id=${id}`).then(response=>{
            console.log(response)
            dispatch(fetchCourse())
        }).catch(error=>{
            console.log(error)
        })
    }
}
export const createCourse=(data)=>{
    return (dispatch)=>{
        dispatch(create_course())
        API.post('course/create',{...data}).then(response=>{
            let responseData=response.data;
            dispatch(create_course_success(responseData))
            dispatch(fetchCourse())
            //console.log(responseData)
        }).catch(error=>{
            let errorMsg=error.message;
            dispatch(create_course_failure(errorMsg))
            //console.log(errorMsg)
        })
    }
}

export const fetchCourse=()=>{
    return (dispatch)=>{
        dispatch(fetch_courses())
        API.get('course/list').then(response=>{
            let responseData=response.data;
            dispatch(fetch_courses_success(responseData))
            //console.log(responseData)
        }).catch(error=>{
            let errorMsg=error.message;
            dispatch(fetch_courses_failure(errorMsg))
            //console.log(errorMsg)
        })
    }
}