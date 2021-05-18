import React,{useState,useEffect} from 'react'
import API from '../api'

function Subject() {
    const [error,setError]=useState('')
    const [success,setSuccess]=useState('')
    const [name, setName] = useState('')
    const [course,setCourse]=useState('');
    const [courses,setCourses]=useState([]);
    useEffect(() => {
        API.get('course/list').then(response=>{
            let data=response.data.message.courses;
            setCourses(data)
        }).catch(error=>{
            console.log(error)
        })
    }, [])
    const addSubject=(e)=>{
        API.post('subject/create',{name:name,course:course})
        .then(response=>{
            let response_data=response.data
            if(response_data.success)
            {
                setSuccess(response_data.message)
                setError('')
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
    return (
        <div className="container">
            <div className="row">
            <h2>Create Subject</h2>
            {error && <p className="text-danger">{error}</p>}
            {success && <p className="text-success">{success}</p>}
            <form className="row g-1" onSubmit={addSubject}>
                <div className="col-auto">
                    <label htmlFor="name" className="">Subject Name</label>
                    <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="name" placeholder="Subject name"/>
                </div>
                <div className="col-auto">
                <label htmlFor="name" className="">Course</label>
                <select className="form-select ml-5" value={course} onChange={(e)=>setCourse(e.target.value)} aria-label="Default select example">
                    <option value="">select course</option>
                    {courses && courses.map((course,index)=>(
                        <option value={course._id} key={index}>{course.name}</option>
                    ))}
                </select>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3 mt-4">Submit</button>
                </div>
            </form>
            </div>
        </div>
    )
}

export default Subject
