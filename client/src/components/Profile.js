import React, { Component } from 'react'
import jwt_docode from 'jwt-decode'

class Profile extends Component{
    constructor(){
        super()
        this.state={
            first_name: '',
            last_name: '',
            email:'',
            password: ''
        }
        this.onChang= this.onChang.bind(this);
        this.onSubmit= this.onSubmit.bind(this);
    }

    componentDidMount(){
        const token = localStorage.usertoken
        const decode = jwt_docode(token)
        this.setState({
            first_namr: decode.first_name,
            last_name: decode.last_name,
            email: decode.email,
        })
    }

    render(){
        return(
            <div className="container">
                <div className="jumbotron mt-5">
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">PROFILE</h1>
                    </div>
                    <table className="table col-md-6 mz-auto">
                        <tbody>
                            <tr>
                                <td>First Name</td>
                                <td>{this.state.first_name}</td>
                            </tr>
                            <tr>
                                <td>Last Name</td>
                                <td>{this.state.last_name}</td>
                            </tr>
                            <tr>
                                <td>Email</td>
                                <td>{this.state.email}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </div>

        )
    }

}

export default Profile