import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {createUser,clear_user_state} from '../redux/user/userActions'
import {Redirect} from 'react-router'

function Register(props) {
    const [formdata, setFormdata] = useState({
        name:'',
        email:'',
        mobilenumber:'',
        pin:''
    })
    if(localStorage.token)
    {
        return <Redirect to="/" />
    }
    const changeHandler=(e)=>{
        let name=e.target.name
        let value=e.target.value
        setFormdata({
            ...formdata,
            [name]:value
        })
    }

    const register=(e)=>{
        props.registerUser(formdata)
        e.preventDefault();
    }

    if(props.user.user.success)
    {
        props.clearState()
        return <Redirect to="/login" />
    }
    return (
        <div className="row">
            <h3 className="text-center mt-4">Register</h3>
            {props.user.loading && <p className="text-center">Processing........</p>}
            {props.user.error && <p className="text-center"> {props.user.error}</p>}
            {props.user.user.success==false && <p className="text-center">{props.user.user.message}</p>}
            {props.user.user.success && <p className="text-center">{props.user.user.message}</p>}
            <form className="p-2 col-md-4 offset-4" onSubmit={register}>
                <div className="mb-3">
                    <label htmlFor="mobilenumber" className="form-label">Mobile</label>
                    <input type="text" className="form-control" name="mobilenumber" id="mobilenumber" onChange={changeHandler} value={formdata.mobilenumber} placeholder="Mobile Number"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" id="name" onChange={changeHandler} value={formdata.name} placeholder="Name"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input type="text" className="form-control" name="email" id="email" onChange={changeHandler} value={formdata.email} placeholder="Email"/>
                </div>
                <div className="mb-3">
                    <label htmlFor="pin" className="form-label">Pin</label>
                    <input type="password" className="form-control" name="pin" id="pin" onChange={changeHandler} value={formdata.pin} placeholder="Pin"/>
                </div>
                <div className="form-group row">
                <div className="col-md-3">
                <button type="submit" className="btn btn-primary">Register</button>
                </div>
                <div className="col-md-4">
                <Link className="btn btn-primary" to="/login">Login</Link>
                </div>
                </div>
            </form>
        </div>
    )
}

const mapStateToProps=state=>{
    console.log(state.user)
    return {
        user:state.user,

    }
}
const mapDispatchToProps=(dispatch,ownProps)=>{
    return{
        registerUser:(formdata)=>dispatch(createUser(formdata)),
        clearState:()=>dispatch(clear_user_state())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Register)
