import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import { Nav, NavItem, NavDropdown, Glyphicon } from "react-bootstrap";



class Navbar extends Component{
    logOut(e){
        e.preventDefault()
        localStorage.removeItem('usertoken')
        this.props.history.push('/');
    }

    render(){
        const loginRegLink =(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/login" className="nav-link">
                        Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link">
                        Register
                    </Link>
                </li>
            </ul>
        )

        
        const userLink =(
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link to="/profile" className="nav-link">
                        User
                    </Link>
                </li>
                <li className="nav-item">
                    <p>out -a </p>
                </li>
            </ul>
        )

        return(
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    //data-toggle="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded ="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <Link to="/" className="nav-link">
                                Home
                            </Link>
                        </li>
                    </ul>
                    {localStorage.usertoken ? userLink: loginRegLink }
                </div>
            </nav>

        )
    }
}

export default Navbar
