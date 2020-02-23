import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import { addRequst } from '../../actions/requsteActions';

class RequetForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
      purpose: '',
      sending: '',
      resiving: '',
      apartmnt: '',
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillReceiveProps(newProps) {
    if (newProps.errors) {
      this.setState({ errors: newProps.errors });
    }
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props.auth;
    const { apartment } = this.props.apartment;

    const newRequst = {
      text: this.state.text,
      first_name: user.first_name,
      avatar: user.avatar,
      purpose: this.state.purpose,
      sending: user._id,
      resiving: this.state.resiving,
      apartment: this.state.apartment,
    };

    this.props.addRequst(newRequst);
    this.setState({ text: '' , purpose: '' });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors } = this.state;

    return (
      <div className="post-form mb-3">
        <div className="card card-info">
          <div className="card-header bg-info text-white">Requst Filde</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <TextAreaFieldGroup
                  placeholder="Create a requst"
                  name="text"
                  value={this.state.text}
                  onChange={this.onChange}
                  error={errors.text}
                />
              </div>
              <button type="submit" className="btn btn-dark">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

RequetForm.propTypes = {
  addRequst: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(mapStateToProps, { addRequst })(RequetForm);
