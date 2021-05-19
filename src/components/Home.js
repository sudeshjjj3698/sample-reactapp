import React,{useState,useEffect} from 'react'
import {connect} from 'react-redux'
import {createCourse,fetchCourse,deleteCourse} from '../redux/course/courseActions'
import {Link} from 'react-router-dom'

function Home(props) {
    const [name, setName] = useState('')

    useEffect(()=>{
        props.getCourses()
    },[])

    const addCourse=(e)=>{
        props.addCourse({name})
        setName('')
        e.preventDefault()
    }
    const delete_course=(id)=>{
        props.destroyCourse(id)
    }
    //console.log('in compo',props.courses)
    return (
        <div className="container">
            <div className="row">
                {props.data?.success && <p className="text-success">{props.data.message}</p>}
                {props.data?.success==false && <p className="text-danger">{props.data.message}</p>}
            <h2>Create Course</h2>
            <form className="row g-1" onSubmit={addCourse}>
                <div className="col-auto">
                    <label htmlFor="name" className="visually-hidden">Course name</label>
                    <input type="text" name="name" value={name} onChange={(e)=>setName(e.target.value)} className="form-control" id="name" placeholder="Course name"/>
                </div>
                <div className="col-auto">
                    <button type="submit" className="btn btn-primary mb-3">Submit</button>
                </div>
                
            </form>
            </div>
            <div className="row mt-3">
                <h3>Course List</h3>
                {props.loading && 'fetching.....'}
            <table className="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {props.courses && props.courses.success && props.courses.message.courses.map((course,index)=>(
                        <tr key={index}>
                        <th scope="row">{index+1}</th>
                        <td>{course.name}</td>
                        <td>
                            <div className="parent d-flex">
                            <Link to={`/subject/${course._id}`}><button className="btn btn-primary" >Add Subjects</button></Link>
                            <button className="btn btn-danger" onClick={()=>delete_course(course._id)}>delete</button>
                            </div>
                        </td>
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
        data:state.course.data,
        courses:state.course.courses,
        loading:state.course.loading
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        addCourse:(data)=>dispatch(createCourse(data)),
        getCourses:()=>dispatch(fetchCourse()),
        destroyCourse:(id)=>dispatch(deleteCourse(id))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Home)
