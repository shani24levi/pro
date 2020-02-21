import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import'../../App.css'
import TextFieldGroup from '../common/TextFieldGroup';
import SelectListGroup from '../common/SelectListGroup';
import { searchApartment } from '../../actions/apartmentsActions';


class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
          address: '',
          city: '',
          status: '',
          //errors: {}
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

    const shearchData = {
      address: this.state.address,
      status: this.state.status,
      city: this.state.city,
    };

    this.props.searchApartment(shearchData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;
       // Select options for status
       const options = [
        { label: '* Select Professional Status', value: 0 },
        { label: 'price', value: '2000-3000' },
        { label: 'peice', value: '3000-4000' },
        { label: 'price', value: '4000-5000' },
        { label: 'price', value: '6000+' }
      ];

    return (
    <div className="search-sec">
            <form onSubmit={this.onSubmit}>
                <div className="row">
                    <div className="col-lg-12">
                        <div className="row">
                            <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                <TextFieldGroup
                                  placeholder="Address"
                                  name="loction"
                                  value={this.state.address}
                                  onChange={this.onChange}
                                  error={errors.address}
                                />                                    
                                </div>
                                <div className="col-lg-3 col-md-3 col-sm-12 p-0">
                                <TextFieldGroup
                                    placeholder="City"
                                  name="loction"
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
                                <input
                                    type="button"
                                    value="Search"
                                    className="btn btn-danger wrn-btn" 
                                />
                            </div>
                        </div>
                    </div>
                </form>
              </div>
    );
  }
}

SearchBar.propTypes = {
  search: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  search: state.search
});

export default connect(mapStateToProps, { searchApartment })(
  withRouter(SearchBar)
);