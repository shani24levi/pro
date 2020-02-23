import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from '../common/Spinner';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { Link } from 'react-router-dom';
import  {getCurrentApartment} from '../../actions/apartmentsActions'; 


class AddApartmentPage2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
          displayOpenHouseInputs: false,
          price: '',
          apartmentNum: '',
          parcking: '',
          neebrhood: '',
          saftyChack: '',
          rooms: '',
          pats: '',  
          status: '',
    
          displayRequstsInputs: false,
          invated: '', //aray of requsts
    
          errors: {}
        };
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        this.props.getCurrentApartment();
      }

    // componentDidMount() {
    //    if (this.props.state) {
    //      console.log('1', this.props.state)
    //   }
    //   if (this.props.location.state) {
    //     console.log('2' ,this.props.location.state)
    //  }
    //    else {
    //     console.log(' 3 no this.props.page1Form found')
    //   }
    // }

    componentWillReceiveProps(nextProps) {
        if (nextProps.errors) {
          this.setState({ errors: nextProps.errors });
        }
    
        if (nextProps.apartment.apartment) {
          const apartment = nextProps.apartment.apartment;
    
          // Set component fields state
          this.setState({
            _id: apartment._id,
            price: apartment.price,
            apartmentNum:apartment.apartmentNum,
            parcking: apartment.parcking,
            neebrhood: apartment.neebrhood,
            saftyChack:apartment.saftyChack,
            rooms: apartment.rooms,
            pats: apartment.pats,  
            status: apartment.status
          });
        }
      }
      onSubmit(e) {
        e.preventDefault();
    
        const profileData = {
            _id: this.state._id,
            price: this.state.price,
            apartmentNum: this.state.apartmentNum,
            parcking: this.state.parcking,
            neebrhood: this.state.neebrhood,
            saftyChack:this.state.saftyChack,
            rooms: this.state.rooms,
            pats: this.state.pats,  
            status: this.state.status
        };
    }
    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

  render() {
    const { apartment } =  this.props.apartment || [];;
    const { errors } = this.state;

    const optionsPats = [
        { label: 'Pats In Apartment', value: 0 },
        { label: 'notAllow', value: 'notAllow' },
        { label: 'allow', value: 'allow' },
        { label: 'onlyCats', value: 'onlyCats' },
        { label: 'smallPats', value: 'smallPats' }
    ];
    const optionsRoms = [
        { label: 'Number of Rooms', value: 0 },
        { label: '1', value: '1' },
        { label: '2', value: '2' },
        { label: '3', value: '3' },
        { label: '4', value: '4' },
        { label: '5+', value: '5+' }
    ];

    return (
      <div className="create-aprtent-page2">
            <div className="container">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <Link to="/add-apartment" className="btn btn-light">
                             <ArrowBackIosIcon/>{' '} 
                         </Link>  
                        <h1 className="display-4 text-center">Rental Apartment</h1>
                        <form onSubmit={this.onSubmit}>
                            <InputGroup
                            placeholder="ApartmentNum"
                            name="apartmentNum"
                            value={this.state.apartmentNum}
                            onChange={this.onChange}
                            error={errors.apartmentNum}
                            />
                            <InputGroup
                            placeholder="Price"
                            name="price"
                            value={this.state.price}
                            onChange={this.onChange}
                            error={errors.price}
                            />
                            <InputGroup
                            placeholder="Neebrhood"
                            name="neebrhood"
                            value={this.state.neebrhood}
                            onChange={this.onChange}
                            error={errors.neebrhood}
                            />

                            <SelectListGroup
                            placeholder="Pats"
                            name="pats"
                            value={this.state.pats}
                            onChange={this.onChange}
                            options={optionsPats}
                            error={errors.pats}
                            /> 

                            <SelectListGroup
                            placeholder="Rooms"
                            name="rooms"
                            value={this.state.rooms}
                            onChange={this.onChange}
                            options={optionsRoms}
                            error={errors.rooms}
                            />
                            <InputGroup
                            placeholder="saftyChack"
                            name="saftyChack"
                            value={this.state.saftyChack}
                            onChange={this.onChange}
                            error={errors.saftyChack}
                            />
                            <InputGroup
                            placeholder="parcking"
                            name="parcking"
                            value={this.state.parcking}
                            onChange={this.onChange}
                            error={errors.parcking}
                            />

                            <div className="nextButt" style={{marginTop: "12%" }}>
                                <Link to={{ pathname: '/add-apartment-page3', state: this.state }}>
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

AddApartmentPage2.propTypes = {
  apartment: PropTypes.object.isRequired,
  getCurrentApartment: PropTypes.func.isRequired,
  apartment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apartment: state.apartment,
  errors: state.errors
});

export default connect(mapStateToProps, {getCurrentApartment})(AddApartmentPage2);
