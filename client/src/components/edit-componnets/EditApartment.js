import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { editApartment , getCurrentApartment } from '../../actions/apartmentsActions';
import isEmpty from '../../validation/is-empty';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

class EditApartment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      displayOpenHouseInputs: false,
      city: '',
      address: '',
      price: '',
      apartmentNum: '',
      parcking: '',
      neebrhood: '',
      saftyChack: '',
      mainImg: '',
      desciption: '',
      rooms: '',
      pats: '',  
      openANDpublic: '',
      open: '',
      public: '',
      dateOpenHuose: '',
      houre: '',
      status: '',

      displayRequstsInputs: false,
      invated: '', //aray of requsts

      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentDidMount() {
    // console.log('this.props.searchForm',this.props.apartment.state)
    // if (this.props.searchForm) {
    //   // load by search
    //   this.props.editApartment(this.props.searchForm) //id?
    // }
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
        city: apartment.city,
        address: apartment.address,
        price: apartment.price,
        apartmentNum:apartment.apartmentNum,
        parcking: apartment.parcking,
        neebrhood: apartment.neebrhood,
        saftyChack:apartment.saftyChack,
        mainImg: apartment.mainImg,
        desciption: apartment.desciption,
        rooms: apartment.rooms,
        pats: apartment.pats,  
        openANDpublic: apartment.openANDpublic,
        open: apartment.open,
        public: apartment.public,
        dateOpenHuose: apartment.dateOpenHuose,
        houre: apartment.houre,
        status: apartment.status
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const profileData = {
        city: this.state.city,
        address: this.state.address,
        price: this.state.price,
        apartmentNum: this.state.apartmentNum,
        parcking: this.state.parcking,
        neebrhood: this.state.neebrhood,
        saftyChack:this.state.saftyChack,
        mainImg: this.state.mainImg,
        desciption: this.state.desciption,
        rooms: this.state.rooms,
        pats: this.state.pats,  
        openANDpublic: this.state.openANDpublic,
        open: this.state.open,
        public: this.state.public,
        dateOpenHuose: this.state.dateOpenHuose,
        houre: this.state.houre,
        status: this.state.status
    };

    this.props.editApartment(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    
    const { apartment } =  this.props.apartment || [];;
    const { errors, displayOpenHouseInputs ,displayRequstsInputs } = this.state;

    let socialInputs;

        // Select options
        const options = [
            { label: 'Type', value: 0 },
            { label: 'Close List', value: 'invates' },
            { label: 'Public', value: 'public' }
          ];
          const options2 = [
              { label: 'Public', value: 0 },
              { label: 'true', value: 'true' },
              { label: 'false', value: 'false' }
          ];
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




    if (displayOpenHouseInputs) {
      socialInputs = (
        <div>
            
          <SelectListGroup
              placeholder="Invates Oniy OR Public"
              name="open"
              icon="fas fa-home"
              value={this.state.open}
              onChange={this.onChange}
              options={options}
              error={errors.open}
            />
            {/* no need to set openANDpublic its will be define as chosen in open filed */}
          {apartment.open == 'invates' ? apartment.openANDpublic==false : apartment.openANDpublic==true }
          {apartment.open == 'invates' ? displayRequstsInputs==true :displayRequstsInputs==false }

          <SelectListGroup
              placeholder="Public Or Closed list"
              name="public"
              icon="fas fa-users"
              value={this.state.public}
              onChange={this.onChange}
              options={options2}
              error={errors.public}
            />

            <h6>From Date</h6>
            <TextFieldGroup
              name="dateOpenHuose"
              type="dateOpenHuose"
              value={this.state.dateOpenHuose}
              onChange={this.onChange}
              error={errors.dateOpenHuose}
          />

          <InputGroup
            placeholder="houre"
            name="houre"
            icon="far fa-clock"
            value={this.state.houre}
            onChange={this.onChange}
            error={errors.houre}
          />
        </div>

      );
    }

    if (displayRequstsInputs) {
        let usersRequst = (
            <div className= "requst-invates">
                <h5>hi for now</h5>
            </div>
        );
      }


    return (
      <div className="edit-apartment">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-light">
              <ArrowBackIosIcon/>{' '} Back
              </Link>
              <h1 className="display-4 text-center">Edit Apartment</h1>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Address"
                  name="address"
                  value={this.state.address}
                  onChange={this.onChange}
                  error={errors.address}
                />
                <TextFieldGroup
                  placeholder="city"
                  name="city"
                  value={this.state.city}
                  onChange={this.onChange}
                  error={errors.city}
                />
                <TextFieldGroup
                  placeholder="apartmentNum"
                  name="apartmentNum"
                  value={this.state.apartmentNum}
                  onChange={this.onChange}
                  error={errors.apartmentNum}
                />
                <TextFieldGroup
                  placeholder="price"
                  name="price"
                  value={this.state.price}
                  onChange={this.onChange}
                  error={errors.price}
                />
                <TextAreaFieldGroup
                  placeholder="neebrhood"
                  name="neebrhood"
                  value={this.state.neebrhood}
                  onChange={this.onChange}
                  error={errors.neebrhood}
                />

                <TextAreaFieldGroup
                  placeholder="desciption"
                  name="desciption"
                  value={this.state.desciption}
                  onChange={this.onChange}
                  error={errors.desciption}
                />  

                <SelectListGroup
                  placeholder="pats"
                  name="pats"
                  value={this.state.pats}
                  onChange={this.onChange}
                  options={optionsPats}
                  error={errors.pats}
                /> 

                <SelectListGroup
                  placeholder="rooms"
                  name="rooms"
                  value={this.state.rooms}
                  onChange={this.onChange}
                  options={optionsRoms}
                  error={errors.rooms}
                />

                <TextAreaFieldGroup
                  placeholder="loftSize"
                  name="loftSize"
                  value={this.state.loftSize}
                  onChange={this.onChange}
                  error={errors.loftSize}
                />  
                <TextAreaFieldGroup
                  placeholder="Chang Main Poto"
                  name="mainImg"
                  value={this.state.mainImg}
                  onChange={this.onChange}
                  error={errors.mainImg}
                />  

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displayOpenHouseInputs: !prevState.displayOpenHouseInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Open House
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {socialInputs}
                <input
                  type="submit"
                  value="Submit"
                  className="btn btn-info btn-block mt-4"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

EditApartment.propTypes = {
  editApartment: PropTypes.func.isRequired,
  getCurrentApartment: PropTypes.func.isRequired,
  apartment: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apartment: state.apartment,
  errors: state.errors
});

export default connect(mapStateToProps, { editApartment, getCurrentApartment })(
  withRouter(EditApartment)
);
