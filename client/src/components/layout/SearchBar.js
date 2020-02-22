import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { searchApartment } from '../../actions/apartmentsActions';
import './style.css'

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: '',
      city: '',
      status: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }


  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const searchData = {
      address: this.state.address,
      status: this.state.status,
      city: this.state.city,
    };

    this.props.searchApartment(searchData, this.props.history);
    if (this.props.onSearchApartment) this.props.onSearchApartment();
  
  }


  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
    // Select options for status
    const options = [
      { label: ' Select Price Rang', value: 0 },
      { label: 'priceLow', value: '2000-3000' },
      { label: 'peiceMiddel', value: '3000-4000' },
      { label: 'priceHeigh', value: '4000-5000' },
      { label: 'priceMore', value: '6000+' }
    ];

    return (
      <div className="search-sec">
        <div className="container">
          <form onSubmit={this.onSubmit} >
            <div className="row">
              <div className="col-lg-12">
                <div className="row">
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <TextFieldGroup
                      placeholder="Address"
                      name="address"
                      value={this.state.address}
                      onChange={this.onChange}
                      error={errors.address}
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <TextFieldGroup
                      placeholder="City"
                      name="city"
                      value={this.state.city}
                      onChange={this.onChange}
                      error={errors.city}
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    <SelectListGroup
                      placeholder="Status"
                      name="status"
                      value={this.state.status}
                      onChange={this.onChange}
                      options={options}
                      error={errors.status}
                      className="form-control search-slt"
                    />
                  </div>
                  <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                    {/* <Link to={{ pathname: '/search', state: this.state }}>
                      <input
                        type="button"
                        value="Search"
                        className="btn btn-danger wrn-btn"
                      />
                    </Link> */}
                    
                        {/* <Link to={{ pathname: '/search', state: this.state }}> */}
                      <input
                        type="submit"
                        value="Search"
                        className="btn btn-danger wrn-btn"
                        
                      />
                    {/* </Link>  */}
                    
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchApartment: PropTypes.func.isRequired,
  apartment: PropTypes.object.isRequired,
  onSearchApartment: PropTypes.func,
};

const mapStateToProps = state => ({
  apartment: state.apartment,
});

export default connect(mapStateToProps, { searchApartment })(
  withRouter(SearchBar)
);