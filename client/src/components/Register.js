import React, { Component } from 'react'

import {register} from './UserFunctions';

class Register extends Component{
    constructor(){
        super()
        this.state={
            first_name: '',
            last_name: '',
            password: '',
            email:''

        }
        this.onChang= this.onChang.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
    }

    onChang(e){
        this.setState({
            first_Name: e.target.value,
            last_Name :e.target.value,
            emaiL:e.target.value,
            password:e.target.value
            //[e.target.name]: e.target.value
        })
    }

    onSubmit(e){
        e.preventDefault();
        const user={
            first_name: this.state.first_name,
            last_name: this.state.last_name,
            email: this.state.email,
            password: this.state.password
        }

        register(user).then(res=>{
            this.props.history.push('/login');
        })
    }


    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Register</h1>    
                            <div className="form-group">
                                <label htmlFor="first_name">First Name</label>
                                <input type="first_name"
                                className="form-control"
                                name="first_name"
                                placeholder="Enter First Name"
                                value={this.state.first_Name}
                                onChange={this.onChang} />
                            </div>                    
                            <div className="form-group">
                                <label htmlFor="last_name">Last Name</label>
                                <input type="last_name"
                                className="form-control"
                                name="last_name"
                                placeholder="Enter Last Name"
                                value={this.state.last_Name}
                                onChangeCapture={this.onChang} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                className="form-control"
                                name="eamil"
                                placeholder="Enter Email"
                                value={this.state.emaiL}
                                onChange={this.onChang} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input type="Password"
                                className="form-control"
                                placeholder="Enter Password"
                                name="Password"
                                value={this.state.Password}
                                onChange={this.onChang} />

                                <button type="button" className="btn btn-lg btn-block orangBut"> Register </button>
                              
                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Register
