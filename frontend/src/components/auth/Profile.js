import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import { FormGroup, FormControl, Button, ControlLabel } from 'react-bootstrap';
import axios from 'axios';
import '../static/css/profile.css'

class Profile extends Component {
  constructor() {
    super()
    this.state = {
      profiles: {
        "github": '',
        "interest": '',
        "investment": ''
      }
    }
  }

  onSubmit = formProps => {
    this.props.profile(formProps, () => {
      this.props.history.push('/');
    });
  };

  componentDidMount() {
    axios.get('http://localhost:8000/user/profile',
      { headers: { "authorization": `${localStorage.getItem('jwttoken')}` } })
      .then(response => this.setState(
        {
          github: response.data.github,
          interest: response.data.interest,
          investment: response.data.investment
        }
      ))
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="overall-profile">
        <div id="profilebgoverlay">
          <div className="col-md-6 col-md-offset-3 profile">
            <form onSubmit={handleSubmit(this.onSubmit)}>
              <FormGroup>
                <Field name="github" component="FormControl" componentClass="select">
                  <ControlLabel className="control-label">Your Github</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder={this.state.github}
                  />
                </Field>
              </FormGroup>
              <FormGroup>
              <Field name="interest" component="FormControl" componentClass="select">
                <ControlLabel className="control-label">Your Interest</ControlLabel>
                <FormControl
                  type="text"
                  placeholder={this.state.interest}
                />
              </Field>
            </FormGroup>
            <FormGroup>
                <Field name="investment" component="FormControl" componentClass="select">
                  <ControlLabel className="control-label">Your Investment</ControlLabel>
                  <FormControl
                    type="text"
                    placeholder={this.state.investment}
                  />
                </Field>
              </FormGroup>
            <div>{this.props.errorMessage}</div>
            <Button bsStyle="warning" type="submit" bsSize="large" block>Update Profile!</Button>
          </form>
        </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { errorMessage: state.auth.errorMessage };
}

export default compose(
  connect(mapStateToProps, actions),
  reduxForm({ form: 'profile' })
)(Profile);
