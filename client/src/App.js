import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import { Provider } from 'react-redux';
import store from './store';

import PrivateRoute from './components/common/PrivateRoute';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-componnets/CreateProfile';
import EditProfile from './components/edit-componnets/EditProfile';
import AddExperience from './components/add-credentials/MyRentals';
import AddEducation from './components/add-credentials/AddApartmentPage1';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import Posts from './components/posts/Posts';
import Post from './components/post/Post';
import NotFound from './components/not-found/NotFound';
import MapContainer from './components/googleMaps/GoogleMap';
import Apartment from './components/googleMaps/Apartments';
import Requestes from './components/requsrt/Requsts';
import RequstsById from './components/requsrt/RequstsById';
import AddApartment from './components/add-credentials/AddApartment';
import EditApartment from './components/edit-componnets/EditApartment';

import AddApartmentPage2 from './components/add-credentials/AddApartmentPage2';
import AddApartmentPage3 from './components/add-credentials/AddApartmentPage3';
import AddApartmentShow from './components/add-credentials/AddApartmentShow';
import ApartmentView from './components/apartment/ApartmentView';
import CreateRequst from './components/create-componnets/CreateRequst';

import './App.css';

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token - didnt set it as time expired in the server
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Clear current Profile
    store.dispatch(clearCurrentProfile());
    // Redirect to login
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Navbar />
            <Route exact path="/" component={Landing} />
            <Switch>
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
            </Switch>
            <div className="container">
              <Route exact path="/req" component={Requestes} />
              <Route exact path="/my-requsts" component={RequstsById} />
              <Route exact path="/app" component={Apartment} />
              <Route exact path="/search" component={MapContainer} />
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Route exact path="/profiles" component={Profiles} />
              <Route exact path="/profile/:handle" component={Profile} />

              <Switch>
                <PrivateRoute
                  exact
                  path="/create-profile"
                  component={CreateProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/edit-profile"
                  component={EditProfile}
                />
              </Switch>
              <Switch>
                <PrivateRoute
                  exact
                  path="/add-myRantal"
                  component={AddExperience}
                />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/feed" component={Posts} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/post/:id" component={Post} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/add-apartment" component={AddApartment} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-apartment-page2" component={AddApartmentPage2} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-apartment-page3" component={AddApartmentPage3} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/add-apartment-publish" component={AddApartmentShow} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/apartment/:apartment_id" component={(ApartmentView)} />
              </Switch>

              <Switch>
                <PrivateRoute exact path="/add-requst" component={CreateRequst} />
              </Switch>
              


              <Switch>
                <PrivateRoute  path="/edit-apartment/:id" component= {EditApartment} />
              </Switch>

              <Route exact path="/not-found" component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
