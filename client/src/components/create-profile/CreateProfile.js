import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import TextFieldGroup from '../common/TextFieldGroup';
import TextAreaFieldGroup from '../common/TextAreaFieldGroup';
import InputGroup from '../common/InputGroup';
import SelectListGroup from '../common/SelectListGroup';
import { createProfile } from '../../actions/profileActions';

class CreateProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      displaySocialInputs: false,
      displayAboutMeInputs: false,
      handle: '',
      company: '',
      website: '',
      location: '',
      status: '',
      skills: '',
      githubusername: '',
      bio: '',
      twitter: '',
      facebook: '',
      linkedin: '',
      youtube: '',
      instagram: '',
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

    const profileData = {
      handle: this.state.handle,
      location: this.state.location,
      status: this.state.status,
      skills: this.state.skills,
      githubusername: this.state.githubusername,
      disciption: this.state.disciption,
      twitter: this.state.twitter,
      facebook: this.state.facebook,
      youtube: this.state.youtube,
    };

    this.props.createProfile(profileData, this.props.history);
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  render() {
    const { errors, displaySocialInputs, displayAboutMeInputs } = this.state;

    let socialInputs ,aboutMeInputs;

    if (displaySocialInputs) {
      socialInputs = (
        <div>
          <InputGroup
            placeholder="Twitter Profile URL"
            name="twitter"
            icon="fab fa-twitter"
            value={this.state.twitter}
            onChange={this.onChange}
            error={errors.twitter}
          />

          <InputGroup
            placeholder="Facebook Page URL"
            name="facebook"
            icon="fab fa-facebook"
            value={this.state.facebook}
            onChange={this.onChange}
            error={errors.facebook}
          />

          <InputGroup
            placeholder="YouTube Channel URL"
            name="youtube"
            icon="fab fa-youtube"
            value={this.state.youtube}
            onChange={this.onChange}
            error={errors.youtube}
          />
        </div>
      );
    }

    if (displayAboutMeInputs) {
      aboutMeInputs = (
        <div>
            <TextFieldGroup
              placeholder="City or State of living"
              name="live"
              value={this.state.live}
              onChange={this.onChange}
              error={errors.live}
              info="Current living state "
            />
            <TextFieldGroup
              placeholder="Hometown"
              name="from"
              value={this.state.from}
              onChange={this.onChange}
              error={errors.from}
            />
            <TextFieldGroup
              placeholder="Age"
              name="age"
              value={this.state.age}
              onChange={this.onChange}
              error={errors.age}
            />
            <TextFieldGroup
              placeholder="Current job"
              name="job"
              value={this.state.job}
              onChange={this.onChange}
              error={errors.job}
            />
            <TextFieldGroup
              placeholder="Time at work"
              name="jobTime"
              value={this.state.jobTime}
              onChange={this.onChange}
              error={errors.jobTime}
            />
            <TextFieldGroup
              placeholder="Average Wage"
              name="money"
              value={this.state.money}
              onChange={this.onChange}
              error={errors.money}
            />
            <TextFieldGroup
              placeholder="Education"
              name="education"
              value={this.state.education}
              onChange={this.onChange}
              error={errors.education}
            />
            <TextFieldGroup
              placeholder="Relationship"
              name="relationship"
              value={this.state.relationship}
              onChange={this.onChange}
              error={errors.relationship}
            />
            <TextFieldGroup
              placeholder="Kids"
              name="kids"
              value={this.state.kids}
              onChange={this.onChange}
              error={errors.kids}
            />
        </div>
      );
    }



    // Select options for status
    const options = [
      { label: '* Select Professional Status', value: 0 },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor or Teacher', value: 'Instructor or Teacher' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' }
    ];

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <h1 className="display-4 text-center">Create Your Profile</h1>
              <p className="lead text-center">
                Let's get some information to make your profile 
              </p>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="* Profile Handle"
                  name="handle"
                  value={this.state.handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="A unique handle for your profile URL. Your full name, company name, nickname"
                />
                <SelectListGroup
                  placeholder="Status"
                  name="status"
                  value={this.state.status}
                  onChange={this.onChange}
                  options={options}
                  error={errors.status}
                />
                <TextFieldGroup
                  placeholder="Loction"
                  name="loction"
                  value={this.state.loction}
                  onChange={this.onChange}
                  error={errors.loction}
                  info="your current loction state"
                />
 
                <TextFieldGroup
                  placeholder="* Skills"
                  name="skills"
                  value={this.state.skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="Please use comma separated values (eg.
                    HTML,CSS,JavaScript,PHP"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={this.state.githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="If you want your latest repos and a Github link, include your username"
                />
                <TextAreaFieldGroup
                  placeholder="disciption"
                  name="disciption"
                  value={this.state.disciption}
                  onChange={this.onChange}
                  error={errors.disciption}
                  info="Tell us a little about yourself"
                />

                <div className="mb-3">
                <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displayAboutMeInputs: !prevState.displayAboutMeInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add more details about yourself
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {aboutMeInputs}

                <div className="mb-3">
                  <button
                    type="button"
                    onClick={() => {
                      this.setState(prevState => ({
                        displaySocialInputs: !prevState.displaySocialInputs
                      }));
                    }}
                    className="btn btn-light"
                  >
                    Add Social Network Links
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

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  profile: state.profile,
  errors: state.errors
});

export default connect(mapStateToProps, { createProfile })(
  withRouter(CreateProfile)
);
