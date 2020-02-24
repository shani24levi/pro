import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Link } from 'react-router-dom';
import { getCurrentApartment, createApartment } from '../../actions/apartmentsActions';
import './style.css'

class AddApartmentShow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mainImg: '',
      picturs: '',
      desciption: '',
      status: '',
      ///who is reterning ?
      error: {}
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    this.props.getCurrentApartment();
    //this.props.createApartment(apartmentData);

  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.apartment.apartment) {
      const apartment = nextProps.apartment.apartment;

      // Set component fields state
      this.setState({
        mainImg: apartment.mainImg,
        desciption: apartment.desciption,
        picturs: apartment.picturs,
        status: apartment.status
      });
    }
  }
  onSubmit(e) {
    e.preventDefault();


    const data = this.props.location.state;
    delete data.errors;
    this.props.createApartment(data, this.props.history)

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }



  render() {
    const { apartment } = this.props.apartment || [];;
    const { errors } = this.state;
    const data = this.props.location.state;
    console.log('eee', data);



    console.log('AddApartmentShow', this.props)

    return (
      <div className="create-aprtent-show">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/add-apartment" className="btn btn-light">
                <ArrowBackIosIcon />{' '}
              </Link>
              <h1 className="display-4 text-center">Rental Apartment</h1>

              <div className="item col-xs-4 col-lg-4">
                <div className="thumbnail card">
                  <div className="img-event">
                    <img className="group list-group-image img-fluid" src={data.mainImg} alt="" />
                  </div>
                  <div className="caption card-body">
                    <h4 className="group card-title inner list-group-item-heading">
                      {data.address}</h4>
                    <h6 className="group card-title inner list-group-item-heading">
                      {data.area}</h6>
                      
                    <p className="group inner list-group-item-text">
                      {data.desciption} </p>
                    <div className="row">
                      <div className="col-xs-12 col-md-6">
                        <p className="lead">
                          {data.price}</p>
                      </div>
                   
                    </div>
                  </div>
                </div>
              </div>


              <div className="nextButt" style={{ marginTop: "12%" }}>
                <input
                  type="submit"
                  value="Publish Apartment"
                  className="btn btn-danger wrn-btn"
                  onClick={this.onSubmit}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

AddApartmentShow.propTypes = {
  apartment: PropTypes.object.isRequired,
  getCurrentApartment: PropTypes.func.isRequired,
  //createApartment:PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apartment: state.apartment,
  errors: state.errors
});

export default connect(mapStateToProps, { getCurrentApartment, createApartment })(AddApartmentShow);
