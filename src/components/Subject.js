import React,{useState,useEffect} from 'react'
import {useParams} from 'react-router'
import API from '../api'
import {connect} from 'react-redux'
import {fetchSubjects,deleteSubject} from '../redux/subject/subjectActions'
import {Link} from 'react-router-dom'

function Subject(props) {
    const [error,setError]=useState('')
    const [success,setSuccess]=useState('')
    const [name, setName] = useState('')
    const [course,setCourse]=useState('');
    const [courses,setCourses]=useState([]);
    const param=useParams()
    //console.log('param',param.course_id)
    useEffect(() => {
        API.get('course/list').then(response=>{
            let data=response.data.message.courses;
            setCourses(data)
        }).catch(error=>{
            console.log(error)
        })
    }, [])
    useEffect(() => {
        setCourse(param.course_id);
    }, [param.course_id])

    useEffect(() => {
        props.getSubjects(param.course_id)
     }, [param.course_id])
    const addSubject=(e)=>{
        API.post('subject/create',{name:name,course:course})
        .then(response=>{
            let response_data=response.data
            if(response_data.success)
            {
                props.getSubjects(param.course_id)
                setSuccess(response_data.message)
                setError('')
                setName('')
            }else
            {
                setSuccess('')
                setError(response_data.message)
            }
        }).catch(error=>{
            let errorMsg=error.message
            setSuccess('')
            setError(errorMsg)
        })
        e.preventDefault()
    }

    const removeSubject=(subject_id)=>{
        props.destroySubject(subject_id,param.course_id)
    }
    return (
        <div className="container">
            <div className="row">
            <h2>Create Subject</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form className="row g-1" onSubmit={addSubject}>
                <div className="col-auto">
                <label htmlFor="name" className="">Course</label>
                <select disabled className="form-select ml-5" value={course} onChange={(e)=>setCourse(e.target.value)} aria-label="Default select example">
                    <option value="">select course</option>
                    {courses && courses.map((course,index)=>(
                        <option value={course._id} key={index}>{course.name}</option>
                    ))}
                </select>
                </div>
                <div className="col-auto">
                    <label htmlFor="name" className="">Subject Name</label>
                    <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="name" placeholder="Subject name"/>
                </div>
               
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3 mt-4">Submit</button>
                </div>
            </form>
            </div>
            <div className="row">
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.subjects && props.subjects.map((subject,index)=>(
                         <tr key={index}>
                            <th scope="col">{index+1}</th>
                            <th scope="col">{subject.name}</th>
                            <th scope="col">
                                <button className="btn btn-danger" onClick={()=>removeSubject(subject._id)}>delete</button>
                                <Link to={`/chapter/${subject._id}`}><button className="btn btn-primary" >Chapters</button></Link>
                            </th>
                         </tr>
                    ))}
                </tbody>
            </table>
            </div>
        </div>
    )
}

const mapStateToProps=state=>{
    return{
        subjects:state.subject.subjects
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        getSubjects:(course_id)=>dispatch(fetchSubjects(course_id)),
        destroySubject:(subject_id,course_id)=>dispatch(deleteSubject(subject_id,course_id))
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Subject)
