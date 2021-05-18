import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {connect} from 'react-redux'
import {loginUser,clear_user_state}  from '../redux/user/userActions'
import {Redirect} from 'react-router'

function Login(props) {
    
    const [formdata, setFormdata] = useState({
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
    const login=(e)=>{
        props.loginUser(formdata)
        e.preventDefault();
    }
    if(props.user.token!="")
    {
       // props.clearState()
        return <Redirect to="/" />
    }
    return (
        <div className="row">
            <h3 className="text-center mt-4">Login</h3>
            {props.user.loading && <p className="text-center">Processing........</p>}
            {props.user.error && <p className="text-center"> {props.user.error}</p>}
            {props.user.success==false && <p className="text-center">{props.user.message}</p>}
            {props.user.success && <p className="text-center">{props.user.message}</p>}
            <form className="p-4 col-md-4 offset-4" onSubmit={login}>
                <div className="mb-3">
                    <label for="mobile" className="form-label">Mobile</label>
                    <input type="text" className="form-control" onChange={changeHandler} value={formdata.mobilenumber} name="mobilenumber" id="mobilenumber" placeholder="Mobile Number"/>
                </div>
                <div className="mb-3">
                    <label for="pin" className="form-label">Pin</label>
                    <input type="password" className="form-control" onChange={changeHandler} name="pin" id="pin" value={formdata.pin} placeholder="Pin"/>
                </div>
                <div className="form-group row">
                    <div className="col-md-3">
                        <button type="submit" className="btn btn-primary">Sign in</button>
                    </div>
                    <div className="col-md-7 mt-2">
                        <Link className="" to="/register">New around here? Sign up</Link>
                    </div>
                </div>
            </form>
            
        </div>
    )
}
const mapStateToProps=state=>{
    //console.log('mapstatetoprops',state.user)
    return {
        user:state.user

    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        loginUser:(formdata)=>dispatch(loginUser(formdata)),
        clearState:()=>dispatch(clear_user_state())
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Login)
