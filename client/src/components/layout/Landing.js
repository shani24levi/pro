import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import'../../App.css'
import {Button , ButtonToolbar} from 'react-bootstrap';
import SearchBar from './SearchBar';


class Landing extends Component {
  constructor(props){
    super(props);
    this.state= { addModalShow:false}
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/dashboard');
    }
  }

  render() {
    let addModalClose =()=> this.setState({addModalShow:false});
    return (
      <div className="landing">
        <div className="dark-overlay landing-inner text-light">
          <div className="container">
            <div className="row">
              <div className="col-md-12 text-center">
                <h1 className="display-3 mb-4">Find Your New Home</h1>
                <p className="lead">
                  {' '}
                  Create a WelcomeHome profile, share posts and get help
                  from other users for shearching your home
                </p>
                <Link to="/register" className="btn btn-lg btn-info mr-2 orangBut">
                  Sign Up
                </Link>
                <Link to="/login" className="btn btn-lg btn-light">
                  Login
                </Link>
                
                <SearchBar/>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Landing.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(Landing);
