import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputGroup from '../common/InputGroup';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { Link } from 'react-router-dom';
import  {getCurrentApartment} from '../../actions/apartmentsActions'; 


class AddApartmentPage3 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mainImg: '',
            picturs: '',
            desciption: '',
            status: '',
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentApartment();
      }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    
        if (nextProps.apartment.apartment) {
          const apartment = nextProps.apartment.apartment;
    
          // Set component fields state
          this.setState({
            _id: apartment._id,
            mainImg: apartment.mainImg,
            desciption: apartment.desciption,
            picturs: apartment.picturs,
            status: apartment.status
          });
        }
      }
      onSubmit(e) {
        e.preventDefault();
    
        const apartmenteData = {
            _id: this.state._id,
            mainImg: this.state.mainImg,
            desciption: this.state.desciption,
            picturs: this.state.picturs,
            status: this.state.status
        };
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

  render() {
    const { apartment } =  this.props.apartment || [];;
    const { errors } = this.state;


    // Select options
    const options = [
        { label: 'Apartment Stutse', value: 0 },
        { label: 'available', value: 'available' },
        { label: 'ocupied', value: 'ocupied' }
    ];

    return (
      <div className="create-aprtent-page3">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/add-apartment" className="btn btn-light">
                             <ArrowBackIosIcon/>{' '} 
                         </Link>  
                        <h1 className="display-4 text-center">Rental Apartment</h1>
                        <form onSubmit={this.onSubmit}>
                            <InputGroup
                            placeholder="mainImg"
                            name="mainImg"
                            value={this.state.mainImg}
                            onChange={this.onChange}
                            error={errors.mainImg}
                            />

                            {/* //an array of srtings  */}

                            {/* <InputGroup
                            placeholder="picturs"
                            name="picturs"
                            value={this.state.picturs}
                            onChange={this.onChange}
                            error={errors.picturs}
                            /> */}
                            <TextFieldGroup
                            placeholder="Desciption"
                            name="desciption"
                            value={this.state.desciption}
                            onChange={this.onChange}
                            error={errors.desciption}
                            />

                            <SelectListGroup
                            placeholder="status"
                            name="status"
                            value={this.state.status}
                            onChange={this.onChange}
                            options={options}
                            error={errors.status}
                            /> 

    

                            <div className="nextButt" style={{marginTop: "12%" }}>
                                <Link to={{ pathname: '/add-apartment-publish', state: this.state }}>
                                    <input
                                        type="button"
                                        value="Next"
                                        className="btn btn-danger wrn-btn"
                                    />
                                </Link>
                            </div>
                        </form>
                    </div>
                </div> 
            </div>
      </div>
    );
  }
}

AddApartmentPage3.propTypes = {
  apartment: PropTypes.object.isRequired,
  getCurrentApartment: PropTypes.func.isRequired,
  apartment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apartment: state.apartment,
  errors: state.errors
});

export default connect(mapStateToProps,{ getCurrentApartment })(AddApartmentPage3);
