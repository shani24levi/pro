import React, { Component } from 'react';
import {login} from './UserFunctions';
//import { Button, FormGroup, FormControl } from "react-bootstrap";
import './myStyle.css';

//import axios from 'axios'

class Login extends Component{
    constructor(props){
        super(props)
        this.state={
            email:"",
            password: ""
        }
        this.hendlerChange= this.hendlerChange.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
    }

    hendlerChange = (e) =>{
        this.setState({
            emai:e.target.value,
            password:e.target.value
            //[e.target.name]: e.target.value
        });
    }

    onSubmit(e){
        e.preventDefault();
        const user={
            email1: this.state.email,
            password: this.state.password
        }


        login(user).then(res=>{
            console.log(res);

            if(res){
             this.props.history.push('/profile');
            }
        })
    }


    render(){
        return(
            <div className="container">
                <div className="row">
                    <div className="col-md-6 mt-5 mx-auto">
                        <form noValidate onSubmit={this.onSubmit}>
                            <h1 className="h3 mb-3 font-weight-normal">Pleas Sing In</h1>    
                            <div className="form-group">
                                <label htmlFor="email">Email Address</label>
                                <input type="email"
                                className="form-control"
                                name="eamil"
                                placeholder="Enter Email"
                                value={this.state.email1}
                                onChange={this.hendlerChange} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="Password">Password</label>
                                <input type="Password"
                                className="form-control"
                                name="Password"
                                placeholder="Enter Password"
                                value={this.state.Password}
                                onChange={this.onChange} />
                                <button type="button" className="btn btn-lg btn-block orangBut"> Sign in</button>

                            </div>
                        </form> 
                    </div>
                </div>
            </div>
        )
    }
}

export default Login

